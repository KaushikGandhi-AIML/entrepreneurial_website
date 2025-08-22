import React, { useEffect, useState } from 'react';
import { ExternalLink, MapPin, Clock, ThumbsUp, Share2, Bookmark, RefreshCw, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

interface NewsArticle {
  title: string;
  summary: string;
  link: string;
  published: string;
  source: string;
  category: string;
  priority: number;
}

interface Article extends NewsArticle {
  id: string;
  image: string;
  excerpt: string;
  content: string;
  time: string;
  likes?: number;
  isLiked?: boolean;
}

const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'AI' | 'Startups' | 'Technology' | 'Business'>('All');

  // Check API status on component mount
  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch('http://localhost:8005/api/health');
      if (response.ok) {
        setApiStatus('online');
        fetchNews(); // Fetch news if API is online
      } else {
        setApiStatus('offline');
        setError('News service is offline');
        setLoading(false);
      }
    } catch (error) {
      setApiStatus('offline');
      setError('Cannot connect to news service. Please ensure the FastAPI server is running on port 8005.');
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8005/api/news');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const newsData: NewsArticle[] = await response.json();
      
      // Transform news data to match Article interface
      const transformedArticles: Article[] = newsData.map((article, index) => ({
        id: `article-${index}`,
        title: article.title,
        summary: article.summary,
        link: article.link,
        published: article.published,
        source: article.source,
        category: article.category,
        image: article.image || getCategoryImage(article.category), // Use API image or fallback
        excerpt: article.summary,
        content: article.summary,
        time: article.published,
        likes: Math.floor(Math.random() * 100) + 10, // Random likes for demo
        isLiked: false
      }));

      setArticles(transformedArticles);
      setApiStatus('online');
    } catch (e: any) {
      if (e.message.includes('Failed to fetch') || e.message.includes('Connection refused')) {
        setError('Cannot connect to news service. Please ensure the FastAPI server is running on port 8005.');
        setApiStatus('offline');
      } else {
        setError(e?.message || 'Failed to load news');
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshNews = async () => {
    setRefreshing(true);
    try {
      // Force refresh the news cache
      await fetch('http://localhost:8005/api/news/refresh', { method: 'POST' });
      await fetchNews(); // Fetch fresh news
    } catch (error) {
      console.error('Failed to refresh news:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getCategoryImage = (category: string): string => {
    // Generate category-based placeholder images
    const categoryImages = {
      'AI': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      'Startups': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      'Technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      'Business': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
      'General': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop'
    };
    
    return categoryImages[category as keyof typeof categoryImages] || categoryImages['General'];
  };

  const retryApiConnection = async () => {
    setApiStatus('checking');
    await checkApiStatus();
  };

  return (
    <div className="flex-1 max-w-none lg:max-w-2xl space-y-6">
      {/* Featured Bengaluru Tech News Section */}
      {articles.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🔥</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-900">Featured: Bengaluru Tech News</h2>
              <p className="text-sm text-blue-700">Latest updates from India's Silicon Valley</p>
            </div>
          </div>
          
          {/* Featured Article */}
          {articles.find(article => article.source === 'Bengaluru Tech News') && (
            <div className="bg-white rounded-xl border border-blue-200 p-4 shadow-sm">
              <div className="flex items-start space-x-4">
                <img 
                  src={articles.find(article => article.source === 'Bengaluru Tech News')?.image} 
                  alt="Featured Bengaluru Tech News"
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop';
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-xs text-blue-600 mb-2">
                    <span className="font-medium">Bengaluru Tech News</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{articles.find(article => article.source === 'Bengaluru Tech News')?.published}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                    {articles.find(article => article.source === 'Bengaluru Tech News')?.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {articles.find(article => article.source === 'Bengaluru Tech News')?.excerpt}
                  </p>
                  <a 
                    href={articles.find(article => article.source === 'Bengaluru Tech News')?.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">📰</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Latest Tech News</h2>
                <div className="text-xs text-gray-500">Live from RSS feeds via FastAPI</div>
              </div>
            </div>
            
            {/* API Status and Refresh */}
            <div className="flex items-center space-x-2">
              {apiStatus === 'online' && (
                <button
                  onClick={refreshNews}
                  disabled={refreshing}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Refresh news"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              )}
              
              {/* API Status Indicator */}
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                apiStatus === 'online' 
                  ? 'bg-green-100 text-green-700' 
                  : apiStatus === 'offline'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {apiStatus === 'online' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                {apiStatus === 'offline' && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                {apiStatus === 'checking' && <Loader2 className="w-3 h-3 inline mr-1 animate-spin" />}
                {apiStatus === 'online' ? 'Online' : apiStatus === 'offline' ? 'Offline' : 'Checking'}
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {['All', 'AI', 'Startups', 'Technology', 'Business'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* API Status Banner */}
        {apiStatus === 'offline' && (
          <div className="mx-4 mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">News service is offline</span>
            </div>
            <button 
              onClick={retryApiConnection}
              className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-red-700 text-sm font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="p-6 text-center text-gray-500">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
            Loading latest news...
          </div>
        )}
        
        {error && apiStatus === 'offline' && (
          <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg mx-4 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{error}</span>
            </div>
            <div className="mt-2 text-xs text-red-500">
              Start the news service with: <code className="bg-red-100 px-2 py-1 rounded">python news_service.py api</code>
            </div>
          </div>
        )}
        
        {!loading && !error && apiStatus === 'online' && (
          <div className="divide-y divide-gray-200">
            {articles
              .filter(article => activeCategory === 'All' || article.category === activeCategory)
              .map((item) => (
                <NewsItem 
                  key={item.id} 
                  item={item} 
                  onLike={(id) => {
                    setArticles(prev => prev.map(article => 
                      article.id === id 
                        ? { ...article, isLiked: !article.isLiked, likes: article.isLiked ? article.likes - 1 : article.likes + 1 }
                        : article
                    ));
                  }}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const NewsItem = ({ item, onLike }: { item: Article; onLike: (id: string) => void }) => {
  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 48) return '1d ago';
      return date.toLocaleDateString();
    } catch {
      return 'Recently';
    }
  };

  return (
    <article className="p-4 sm:p-6 hover:bg-gray-50/50 transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {item.source.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-200 cursor-pointer">
              {item.source}
            </h4>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-500">{formatTime(item.time)}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{item.category}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200 leading-tight cursor-pointer">
          {item.title}
        </h3>
        </a>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
          {item.excerpt}
        </p>
      </div>

      {/* Image - LinkedIn style layout */}
      <div className="mb-4 -mx-4 sm:-mx-6">
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
            loading="lazy"
            onError={(e) => {
              // Fallback to a default image if the category image fails to load
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3 px-1">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <ThumbsUp className="w-2.5 h-2.5 text-white fill-current" />
            </div>
            <span>{item.likes}</span>
          </span>
        </div>
        <button className="hover:text-purple-600 transition-colors duration-200 flex items-center space-x-1 touch-target">
          <ExternalLink className="w-3 h-3" />
          <span className="hidden sm:inline">Read full article</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1 sm:space-x-4 flex-1">
          <button 
            onClick={() => onLike(item.id)}
            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group touch-target flex-1 justify-center sm:justify-start"
          >
            <ThumbsUp className={`w-4 h-4 transition-colors duration-200 ${
              item.isLiked 
                ? 'text-blue-600 fill-current' 
                : 'text-gray-500 group-hover:text-blue-600'
            }`} />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200 hidden sm:inline">
              {item.isLiked ? 'Liked' : 'Like'}
            </span>
            <span className="text-xs text-gray-500 sm:hidden">
              {item.likes}
            </span>
          </button>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: item.title,
                  text: item.excerpt,
                  url: item.link
                });
              } else {
                navigator.clipboard.writeText(item.link);
                alert('Link copied to clipboard!');
              }
            }}
            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group touch-target flex-1 justify-center sm:justify-start"
          >
            <Share2 className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors duration-200" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-200 hidden sm:inline">
              Share
            </span>
          </button>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 touch-target">
          <Bookmark className="w-4 h-4 text-gray-500 hover:text-purple-600 transition-colors duration-200" />
        </button>
      </div>
    </article>
  );
};

export default NewsFeed;