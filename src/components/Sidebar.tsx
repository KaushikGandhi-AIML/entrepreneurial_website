import React from 'react';
import { MessageCircle, TrendingUp, DollarSign, Rocket } from 'lucide-react';

interface SidebarProps {
  user?: {
    name: string;
    role: string;
    avatar: string;
  };
  onOpenChatbot: () => void;
  onOpenBusinessIdeas: () => void;

  onOpenMarketTrends?: () => void;
}

const Sidebar = ({ user, onOpenChatbot, onOpenBusinessIdeas, onOpenMarketTrends }: SidebarProps) => {
  if (!user) return null;

  return (
    <div className="hidden lg:block w-80 space-y-6">
      {/* User Profile Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.avatar}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
          <p className="text-gray-600 text-sm">{user.role}</p>
        </div>
        
        <div className="mt-6 space-y-3">
          <SidebarItem 
            icon={MessageCircle} 
            label="AI Chatbot" 
            onClick={onOpenChatbot}
          />
          <SidebarItem 
            icon={Rocket} 
            label="Business Idea Generator" 
            onClick={onOpenBusinessIdeas}
          />

          <SidebarItem icon={TrendingUp} label="Market Trends" onClick={onOpenMarketTrends} />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-left group"
    >
      <Icon className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors duration-200" />
      <span className="text-gray-700 group-hover:text-gray-900 font-medium">{label}</span>
    </button>
  );
};

export default Sidebar;