import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Users, Lightbulb, Target, BarChart3, Rocket, Star, Play, CheckCircle, Globe, Zap, Award, MessageCircle } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const LandingPage = ({ onGetStarted, onLogin }: LandingPageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Career Guidance',
      description: 'Get personalized career advice powered by advanced AI algorithms'
    },
    {
      icon: Lightbulb,
      title: 'Business Idea Generator',
      description: 'Generate innovative business ideas tailored to your skills and market trends'
    },
    {
      icon: Target,
      title: 'Idea Validation',
      description: 'Validate your business concepts with comprehensive assessment tools'
    },
    {
      icon: TrendingUp,
      title: 'Market Analysis',
      description: 'Access real-time market data and industry insights'
    },
    {
      icon: Users,
      title: 'Networking Hub',
      description: 'Connect with like-minded entrepreneurs and industry experts'
    },

  ];

  const stats = [
    { number: '10,000+', label: 'Active Entrepreneurs' },
    { number: '5,000+', label: 'Business Ideas Generated' },
    { number: '2,500+', label: 'Successful Validations' },

  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Founder, HealthTech Startup',
      content: 'TechConnect\'s AI guidance helped me pivot my idea and scale my startup successfully.',
      avatar: 'SC',
      rating: 5
    },
    {
      name: 'Raj Patel',
      role: 'CEO, EdTech Solutions',
      content: 'The business idea generator gave me insights I never considered. Now we\'re scaling rapidly.',
      avatar: 'RP',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Founder, Fintech Startup',
      content: 'From idea validation to market launch - TechConnect was instrumental in our journey.',
      avatar: 'MR',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for exploring ideas',
      features: [
        'Basic AI career guidance',
        '5 business ideas per month',
        'Community access',
        'Basic validation tools'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '₹999/month',
      description: 'For serious entrepreneurs',
      features: [
        'Advanced AI guidance',
        'Unlimited business ideas',
        'Premium validation tools',

        'Priority support',
        'Market analysis reports'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations',
      features: [
        'Custom AI training',
        'Team collaboration tools',
        'Advanced analytics',
        'Dedicated support',
        'Custom integrations',
        'White-label options'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-yellow-400/20 rounded-full blur-2xl animate-bounce-gentle delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-bounce-gentle delay-700"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <TrendingUp className="absolute top-20 left-20 w-8 h-8 text-white/20 animate-float" />
        <Users className="absolute top-40 right-32 w-6 h-6 text-white/20 animate-float delay-300" />
        <Lightbulb className="absolute bottom-32 left-16 w-7 h-7 text-white/20 animate-float delay-500" />
        <Sparkles className="absolute bottom-20 right-20 w-5 h-5 text-white/20 animate-float delay-700" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                TechConnect
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Reviews</a>
              <button
                onClick={onLogin}
                className="text-white/80 hover:text-white transition-colors"
              >
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8">
              <Rocket className="w-4 h-4" />
              <span>Where Innovation Meets Opportunity</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Ideas</span>
              <br />
              Into Reality
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of entrepreneurs using AI-powered tools to generate, validate, and scale their business ideas. 
              Your next breakthrough is just one click away.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-2 touch-target"
              >
                <span>Try For Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={onLogin}
                className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 touch-target"
              >
                <Play className="w-5 h-5" />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-1000 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our comprehensive suite of AI-powered tools helps you at every stage of your entrepreneurial journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-32 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Trusted by
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Entrepreneurs</span>
            </h2>
            <p className="text-xl text-white/80">See what our community has achieved</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                  {testimonials[currentTestimonial].avatar}
                </div>
                
                <div className="flex items-center justify-center space-x-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl sm:text-2xl text-white mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="text-white/80">
                  <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                  <div className="text-sm">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-purple-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Plan</span>
            </h2>
            <p className="text-xl text-white/80">Start free, scale as you grow</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative ${
                  plan.popular ? 'ring-2 ring-purple-400' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">{plan.price}</div>
                  <p className="text-white/70">{plan.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={onGetStarted}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              Ready to Build the
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Future?</span>
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Join thousands of entrepreneurs who are already using TechConnect to turn their ideas into successful businesses.
            </p>
            
            <button
              onClick={onGetStarted}
              className="group px-12 py-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold text-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-3 mx-auto touch-target"
            >
              <span>Start Your Journey Today</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/5 backdrop-blur-sm border-t border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TechConnect</span>
            </div>
            
            <div className="text-white/60 text-sm">
              © 2025 TechConnect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;