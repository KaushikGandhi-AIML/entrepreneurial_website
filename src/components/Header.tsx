import React, { useState } from 'react';
import { Search, Home, Lightbulb, TrendingUp, DollarSign, User, Menu, X, LogOut, MessageCircle } from 'lucide-react';

interface HeaderProps {
  user?: {
    name: string;
    role: string;
    avatar: string;
  };
  onLogout?: () => void;
  onOpenChatbot?: () => void;
  onOpenBusinessIdeas?: () => void;

}

const Header = ({ user, onLogout, onOpenChatbot, onOpenBusinessIdeas }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              TechConnect
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for startups, trends, news..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavItem icon={Home} label="Home" active onClick={() => {}} />
            <NavItem icon={MessageCircle} label="AI Chat" onClick={onOpenChatbot} />
            <NavItem icon={Lightbulb} label="Ideas" onClick={onOpenBusinessIdeas} />
            <NavItem icon={TrendingUp} label="Trends" onClick={() => {}} />

            
            {/* User Profile Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 touch-target"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.avatar}
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{user.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{user.role}</p>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 touch-target"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-target"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <MobileNavItem icon={Home} label="Home" active onClick={() => {}} />
              <MobileNavItem icon={MessageCircle} label="AI Chat" onClick={onOpenChatbot} />
              <MobileNavItem icon={Lightbulb} label="Ideas" onClick={onOpenBusinessIdeas} />
              <MobileNavItem icon={TrendingUp} label="Trends" onClick={() => {}} />

              <MobileNavItem icon={User} label="Profile" />
              {user && onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 text-red-600 touch-target"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const NavItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 touch-target ${active ? 'text-purple-600' : 'text-gray-600'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const MobileNavItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 touch-target ${active ? 'text-purple-600 bg-purple-50' : 'text-gray-600'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default Header;