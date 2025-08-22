import React from 'react';
import { MessageCircle, TrendingUp, DollarSign, Users, Rocket } from 'lucide-react';

interface MobileSidebarsProps {
  user?: {
    name: string;
    role: string;
    avatar: string;
  };
  onOpenChatbot: () => void;
  onOpenBusinessIdeas: () => void;

}

const MobileSidebars = ({ user, onOpenChatbot, onOpenBusinessIdeas }: MobileSidebarsProps) => {
  const trendingTopics = [
    { id: 1, topic: "Remote Work", posts: "15.2k posts", color: "bg-blue-500" },
    { id: 2, topic: "AI Innovation", posts: "12.8k posts", color: "bg-purple-500" },
    { id: 3, topic: "Sustainability", posts: "9.4k posts", color: "bg-green-500" },
    { id: 4, topic: "Fintech", posts: "7.1k posts", color: "bg-yellow-500" },
    { id: 5, topic: "Web3", posts: "5.9k posts", color: "bg-pink-500" }
  ];

  const successfulStartups = [
    { id: 1, name: "OpenAI", valuation: "$80B", logo: "AI", color: "bg-orange-500" },
    { id: 2, name: "Stripe", valuation: "$95B", logo: "ST", color: "bg-green-500" },
    { id: 3, name: "ByteDance", valuation: "$180B", logo: "BY", color: "bg-blue-500" },
    { id: 4, name: "SpaceX", valuation: "$137B", logo: "SX", color: "bg-purple-500" },
    { id: 5, name: "Canva", valuation: "$40B", logo: "CA", color: "bg-pink-500" }
  ];

  if (!user) return null;

  return (
    <div className="lg:hidden space-y-6">
      {/* Mobile User Profile Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user.avatar}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{user.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-1">{user.role}</p>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <MobileSidebarItem 
            icon={MessageCircle} 
            label="AI Chatbot" 
            onClick={onOpenChatbot}
          />
          <MobileSidebarItem 
            icon={Rocket} 
            label="Business Ideas" 
            onClick={onOpenBusinessIdeas}
          />

          <MobileSidebarItem icon={TrendingUp} label="Trends" />
        </div>
      </div>

      {/* Mobile Trending Topics */}
      <div className="xl:hidden bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Trending Topics</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {trendingTopics.slice(0, 4).map((topic, index) => (
            <div key={topic.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer group touch-target">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${topic.color} flex-shrink-0`}>
                #{index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-200 truncate">
                  {topic.topic}
                </p>
                <p className="text-xs text-gray-500">{topic.posts}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Successful Startups */}
      <div className="xl:hidden bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Top Startups</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {successfulStartups.slice(0, 4).map((startup) => (
            <div key={startup.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer group touch-target">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${startup.color} flex-shrink-0`}>
                {startup.logo}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-200 truncate">
                  {startup.name}
                </p>
                <p className="text-xs text-gray-500">{startup.valuation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileSidebarItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-center group touch-target"
    >
      <Icon className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors duration-200" />
      <span className="text-xs text-gray-700 group-hover:text-gray-900 font-medium line-clamp-1">{label}</span>
    </button>
  );
};

export default MobileSidebars;