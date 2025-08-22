import React, { useState, useEffect } from 'react';
import { GraduationCap, Briefcase, ArrowLeft, Sparkles, Users, TrendingUp, Brain, Star, ArrowRight } from 'lucide-react';

interface AIChatbotHubProps {
  onClose: () => void;
  onOpenStudent: () => void;
  onOpenProfessional: () => void;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

const AIChatbotHub: React.FC<AIChatbotHubProps> = ({ onClose, onOpenStudent, onOpenProfessional, user }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const tools = [
    {
      id: 'career',
      title: 'Career Chatbot',
      description: 'Enter your details and generate an interactive career roadmap with personalized guidance.',
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      features: [
        'Student-focused guidance',
        'Education path & next steps',
        'Skills & certifications',
        'Entry → Senior roles'
      ],
      onClick: onOpenStudent,
      badge: 'For Students'
    },
    {
      id: 'professional',
      title: 'Professional Chatbot',
      description: 'Get personalized career guidance for your professional journey with AI-powered insights.',
      icon: Briefcase,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200',
      features: [
        'Strengths & growth areas',
        'Next role & leadership path',
        'Technical & soft skills plan',
        'Certifications to target'
      ],
      onClick: onOpenProfessional,
      badge: 'For Professionals'
    }
  ];

  const stats = [
    { label: 'Roadmaps Generated', value: '4,200+', icon: Brain, color: 'bg-purple-500' },
    { label: 'Active Users', value: '3,100+', icon: Users, color: 'bg-blue-500' },
    { label: 'Avg. Satisfaction', value: '96%', icon: TrendingUp, color: 'bg-emerald-500' },
    { label: 'Domains Covered', value: '25+', icon: GraduationCap, color: 'bg-indigo-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 touch-target"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:block">Back to Dashboard</span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AI Chatbot Hub</h1>
                  <p className="text-sm text-gray-600">Student and Professional career advisors</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                {/* Use image avatar if URL, else initials bubble */}
                {user.avatar?.startsWith('http') ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.avatar || user.name?.[0] || 'U'}
                  </div>
                )}
                <span className="hidden sm:block text-sm">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Career Guidance</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Choose Your Path
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> with Confidence</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generate personalized roadmaps and professional growth plans. Pick a chatbot below to begin.
          </p>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tools Section */}
        <div className={`mb-12 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Pick a Chatbot</h3>
            <p className="text-gray-600 text-lg">Student or Professional – both powered by the same AI engine</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolCard = ({ tool, index, isVisible }: { tool: any, index: number, isVisible: boolean }) => {
  return (
    <div
      className={`bg-white/90 backdrop-blur-md rounded-3xl border border-gray-200 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${400 + index * 200}ms` }}
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${tool.bgColor} p-8 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <tool.icon className="w-8 h-8 text-white" />
            </div>
            <span className="px-3 py-1 bg-white/80 text-gray-700 text-xs font-medium rounded-full">
              {tool.badge}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">{tool.title}</h3>
          <p className="text-gray-700 leading-relaxed">{tool.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
          <div className="space-y-3">
            {tool.features.map((feature: string, featureIndex: number) => (
              <div key={featureIndex} className="flex items-center space-x-3">
                <div className={`w-2 h-2 bg-gradient-to-r ${tool.color} rounded-full`}></div>
                <span className="text-gray-600 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={tool.onClick}
          className={`w-full bg-gradient-to-r ${tool.color} text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105 touch-target`}
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default AIChatbotHub;
