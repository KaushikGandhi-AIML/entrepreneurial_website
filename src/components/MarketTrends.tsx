import React, { useEffect, useMemo, useState } from 'react';
import { 
  ArrowLeft, 
  Filter, 
  Flame, 
  Newspaper, 
  Search, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Zap, 
  Users, 
  Globe, 
  Clock, 
  ExternalLink, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Loader2,
  TrendingDown,
  Activity,
  Lightbulb,
  Rocket,
  Shield,
  Briefcase
} from 'lucide-react';

interface MarketTrendsProps {
  onClose: () => void;
}

type Category = 'All' | 'Technology' | 'AI' | 'Startups' | 'Business' | 'General';

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

interface MarketInsight {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
}

const MarketTrends: React.FC<MarketTrendsProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [refreshing, setRefreshing] = useState(false);

  const categories: Category[] = ['All', 'Technology', 'AI', 'Startups', 'Business', 'General'];

  // Market insights data
  const marketInsights: MarketInsight[] = [
    {
      title: 'AI Market Growth',
      value: '+23.5%',
      change: '+2.3% from last month',
      trend: 'up',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      title: 'Startup Funding',
      value: '$2.8B',
      change: '+15.2% from last quarter',
      trend: 'up',
      icon: Rocket,
      color: 'text-green-600'
    },
    {
      title: 'Tech Adoption',
      value: '78.3%',
      change: '+5.1% from last year',
      trend: 'up',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Market Volatility',
      value: '12.4%',
      change: '-3.2% from last week',
      trend: 'down',
      icon: Activity,
      color: 'text-orange-600'
    }
  ];

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
        likes: Math.floor(Math.random() * 100) + 10,
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
      await fetch('http://localhost:8005/api/news/refresh', { method: 'POST' });
      await fetchNews();
    } catch (error) {
      console.error('Failed to refresh news:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getCategoryImage = (category: string): string => {
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

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const byCategory = activeCategory === 'All' || (a.category || '') === activeCategory;
      const byQuery = (a.title + ' ' + a.excerpt + ' ' + a.source).toLowerCase().includes(query.toLowerCase());
      return byCategory && byQuery;
    });
  }, [articles, activeCategory, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI':
        return <Zap className="w-4 h-4" />;
      case 'Startups':
        return <Rocket className="w-4 h-4" />;
      case 'Technology':
        return <Lightbulb className="w-4 h-4" />;
      case 'Business':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Market Trends</h1>
              <p className="text-xs text-gray-500">AI-powered market insights & tech news</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* API Status Indicator */}
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
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

            {/* Refresh Button */}
            {apiStatus === 'online' && (
              <button
                onClick={refreshNews}
                disabled={refreshing}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title="Refresh news"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            )}

            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news..."
                className="pl-9 pr-3 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* API Status Banner */}
        {apiStatus === 'offline' && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">News service is offline</span>
            </div>
            <button 
              onClick={retryApiConnection}
              className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-red-700 text-sm font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Market Insights Dashboard */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Market Insights</h2>
            <div className="text-sm text-gray-500">Real-time market data</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketInsights.map((insight, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center ${insight.color}`}>
                    <insight.icon className="w-6 h-6" />
                  </div>
                  {getTrendIcon(insight.trend)}
                </div>
                
                <h3 className="text-sm font-medium text-gray-600 mb-1">{insight.title}</h3>
                <div className="text-2xl font-bold text-gray-900 mb-1">{insight.value}</div>
                <div className="text-xs text-gray-500">{insight.change}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Filter */}
        <section className="mb-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-2 px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl border text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-indigo-200'
                }`}
              >
                {getCategoryIcon(cat)}
                {cat}
              </button>
            ))}
          </div>
        </section>

        {loading && (
          <div className="py-16 text-center text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            Loading latest market insights...
          </div>
        )}

        {error && apiStatus === 'offline' && (
          <div className="py-4 mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{error}</span>
            </div>
            <div className="mt-2 text-xs text-red-500">
              Start the news service with: <code className="bg-red-100 px-2 py-1 rounded">python news_service.py api</code>
            </div>
          </div>
        )}

        {/* Featured Article */}
        {featured && !loading && apiStatus === 'online' && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Featured Story</h2>
              <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs">
                <Flame className="w-3.5 h-3.5" />
                <span>Trending</span>
              </div>
            </div>
            
            <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';
                }}
              />
              <div className="p-8">
                <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <Newspaper className="w-4 h-4" />
                    <span className="font-medium">{featured.source}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <time>{new Date(featured.time).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</time>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(featured.category)}
                    <span className="font-medium">{featured.category}</span>
                  </div>
                </div>
                
                <a href={featured.link} target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-indigo-600 transition-colors leading-tight">
                    {featured.title}
                  </h3>
                </a>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-6">{featured.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <a 
                    href={featured.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                  >
                    <span>Read Full Article</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  
                  <div className="text-sm text-gray-500">
                    Priority: {featured.priority}
                  </div>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* News Grid */}
        {!loading && !error && apiStatus === 'online' && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Latest Stories</h2>
              <div className="text-sm text-gray-500">{filtered.length} articles found</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/90 border border-gray-200 text-gray-700 text-xs">
                        {getCategoryIcon(article.category)}
                        <span>{article.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                      <Newspaper className="w-3.5 h-3.5" />
                      <span>{article.source}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <time>{new Date(article.time).toLocaleDateString()}</time>
                    </div>
                    
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="block">
                      <h4 className="font-bold text-gray-900 line-clamp-2 mb-3 hover:text-indigo-600 transition-colors leading-tight">
                        {article.title}
                      </h4>
                    </a>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <a 
                        href={article.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors"
                      >
                        <span>Read More</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      
                      <div className="text-xs text-gray-400">
                        Priority {article.priority}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!loading && !error && apiStatus === 'online' && filtered.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or category filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MarketTrends;


