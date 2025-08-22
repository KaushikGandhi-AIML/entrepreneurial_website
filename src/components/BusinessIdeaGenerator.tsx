import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb, CheckCircle, Sparkles, Brain, Target, TrendingUp, Users, Rocket, Star, ArrowRight, Zap, BarChart3, Award } from 'lucide-react';

interface BusinessIdeaGeneratorProps {
  onClose: () => void;
  onOpenAIGenerator: () => void;
  onOpenValidation: () => void;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

const BusinessIdeaGenerator = ({ onClose, onOpenAIGenerator, onOpenValidation, user }: BusinessIdeaGeneratorProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tools = [
    {
      id: 'ai-generator',
      title: 'AI Idea Generator',
      description: 'Generate personalized business ideas using advanced AI based on your preferences, skills, and market trends.',
      icon: Brain,
      color: 'from-purple-500 to-blue-500',
      bgColor: 'from-purple-50 to-blue-50',
      borderColor: 'border-purple-200',
      features: [
        'Personalized questionnaire',
        'AI-powered idea generation',
        'Market analysis integration',
        'Industry trend matching'
      ],
      onClick: onOpenAIGenerator,
      badge: 'AI Powered'
    },
    {
      id: 'validation',
      title: 'Idea Validation',
      description: 'Validate your business ideas with comprehensive assessment tools and get actionable insights.',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      features: [
        'Multi-criteria assessment',
        'Market opportunity analysis',
        'Risk evaluation',
        'Detailed recommendations'
      ],
      onClick: onOpenValidation,
      badge: 'Assessment'
    }
  ];

  const stats = [
    { label: 'Ideas Generated', value: '10,000+', icon: Lightbulb, color: 'bg-yellow-500' },
    { label: 'Success Rate', value: '78%', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Active Users', value: '5,000+', icon: Users, color: 'bg-blue-500' },
    { label: 'Validated Ideas', value: '2,500+', icon: Award, color: 'bg-purple-500' }
  ];

  const recentSuccessStories = [
    {
      id: 1,
      title: 'HealthTech Startup',
      description: 'AI-generated telemedicine platform idea that secured $2M funding',
      founder: 'Sarah Chen',
              funding: 'Series A',
      avatar: 'SC',
      color: 'bg-green-500'
    },
    {
      id: 2,
      title: 'EdTech Solution',
      description: 'Personalized learning platform validated through our assessment tool',
      founder: 'Mike Rodriguez',
              funding: 'Seed',
      avatar: 'MR',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Fintech Innovation',
      description: 'Micro-investment app that passed validation with 95% score',
      founder: 'Priya Patel',
              funding: 'Pre-Series A',
      avatar: 'PP',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
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
                <span>Back to Dashboard</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Business Idea Generator</h1>
                  <p className="text-sm text-gray-600">AI-powered idea generation and validation</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.avatar}
                </div>
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Business Innovation</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Turn Your Vision Into
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Reality</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Leverage cutting-edge AI to generate innovative business ideas tailored to your skills and market opportunities, 
            then validate them with our comprehensive assessment tools.
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Tool</h3>
            <p className="text-gray-600 text-lg">Select the perfect tool to kickstart your entrepreneurial journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className={`transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h3>
            <p className="text-gray-600 text-lg">Real entrepreneurs who turned AI-generated ideas into successful businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentSuccessStories.map((story, index) => (
              <div
                key={story.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 ${story.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {story.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.founder}</h4>
                    <p className="text-sm text-gray-600">{story.funding}</p>
                  </div>
                </div>
                
                <h5 className="font-bold text-gray-900 mb-2">{story.title}</h5>
                <p className="text-gray-600 text-sm leading-relaxed">{story.description}</p>
                
                <div className="mt-4 flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
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

export default BusinessIdeaGenerator;