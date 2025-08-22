import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, BarChart3, PieChart, Activity, Filter, RefreshCw } from 'lucide-react';

interface NewsArticle {
  title: string;
  summary: string;
  link: string;
  published: string;
  source: string;
  category: string;
  priority: number;
  image: string;
}

const RightSidebar = () => {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');

  // Fetch news data for visualizations
  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8005/api/news');
      if (response.ok) {
        const data = await response.json();
        setNewsData(data);
      }
    } catch (error) {
      console.error('Failed to fetch news data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate category distribution
  const categoryDistribution = newsData.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate source distribution
  const sourceDistribution = newsData.reduce((acc, article) => {
    acc[article.source] = (acc[article.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get top categories
  const topCategories = Object.entries(categoryDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }));

  // Get top sources
  const topSources = Object.entries(sourceDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([source, count]) => ({ source, count }));

  // Generate mock trend data for demonstration
  const generateTrendData = () => {
    const categories = ['AI', 'Startups', 'Technology', 'Business'];
    return categories.map(category => ({
      category,
      data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 5)
    }));
  };

  const trendData = generateTrendData();

  // Color palette for charts
  const colors = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
    'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'
  ];

  return (
    <div className="hidden xl:block w-80 space-y-6">
      {/* News Analytics Dashboard */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">News Analytics</h3>
          </div>
          <button
            onClick={fetchNewsData}
            disabled={loading}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Time Range Filter */}
        <div className="flex space-x-1 mb-4 p-1 bg-gray-100 rounded-lg">
          {(['24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs rounded-md transition-all ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Total Articles Count */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
          <div className="text-2xl font-bold text-blue-900">{newsData.length}</div>
          <div className="text-sm text-blue-700">Total Articles</div>
        </div>
      </div>

      {/* Category Distribution Chart */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <PieChart className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Category Distribution</h3>
        </div>
        
        <div className="space-y-3">
          {topCategories.map((item, index) => (
            <div key={item.category} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`}></div>
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">{item.category}</span>
                  <span className="text-gray-500">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full ${colors[index % colors.length]}`}
                    style={{ width: `${(item.count / Math.max(...topCategories.map(c => c.count))) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics Timeline */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Topic Trends</h3>
        </div>
        
        <div className="space-y-4">
          {trendData.slice(0, 3).map((item, index) => (
            <div key={item.category}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900">{item.category}</span>
                <span className="text-xs text-gray-500">
                  {item.data[item.data.length - 1]} articles
                </span>
              </div>
              <div className="flex items-end space-x-1 h-12">
                {item.data.map((value, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`flex-1 rounded-t ${colors[index % colors.length]} transition-all duration-300 hover:opacity-80`}
                    style={{ height: `${(value / Math.max(...item.data)) * 100}%` }}
                    title={`Day ${dayIndex + 1}: ${value} articles`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top News Sources */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Top Sources</h3>
        </div>
        
        <div className="space-y-3">
          {topSources.map((item, index) => (
            <div key={item.source} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.source}</p>
                <p className="text-xs text-gray-500">{item.count} articles</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Quick Filters</h3>
        </div>
        
        <div className="space-y-2">
          {['All', ...Object.keys(categoryDistribution)].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-2 text-xs text-gray-500">
                  ({categoryDistribution[category] || 0})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;