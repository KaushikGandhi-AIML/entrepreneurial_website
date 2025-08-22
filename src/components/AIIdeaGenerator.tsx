import React, { useState, useEffect } from 'react';
import { Lightbulb, Target, DollarSign, TrendingUp, Loader2, ArrowRight, ArrowLeft, Home, RefreshCw, X, ArrowUpRight, Shield, Users, Zap, Globe, FileText } from 'lucide-react';

interface IdeaCard {
  title: string;
  description: string;
  market: string;
  investment: string;
  competition: string;
  technology: string;
  revenue: string;
  experience: string;
  environmental: string;
  regulatory: string;
}

interface DetailedIdea {
  businessIdea: string;
  mvp: string;
  marketFit: string;
  promotion: string;
  businessModel: string;
  pricingScheme: string;
  operationalRequirements: string;
  securityCompliance: string;
  environmentalImpact: string;
  regulatoryRequirements: string;
}

interface AIIdeaGeneratorProps {
  onClose: () => void;
}

const AIIdeaGenerator: React.FC<AIIdeaGeneratorProps> = ({ onClose }) => {
  // Step management
  const [currentStep, setCurrentStep] = useState<'input' | 'generating' | 'results' | 'detailed'>('input');
  const [currentSection, setCurrentSection] = useState<'business' | 'market' | 'experience'>('business');
  
  // Form data
  const [businessModel, setBusinessModel] = useState('');
  const [revenueModel, setRevenueModel] = useState('');
  const [technology, setTechnology] = useState('');
  const [industry, setIndustry] = useState('');
  const [competition, setCompetition] = useState('');
  const [investment, setInvestment] = useState('');
  const [experience, setExperience] = useState('');
  const [impact, setImpact] = useState('');
  const [regulation, setRegulation] = useState('');
  
  // Results and UI state
  const [ideas, setIdeas] = useState<IdeaCard[] | null>(null);
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0);
  const [expandedIdeas, setExpandedIdeas] = useState<Set<number>>(new Set());
  const [generationProgress, setGenerationProgress] = useState(0);
  const [detailedIdeas, setDetailedIdeas] = useState<DetailedIdea[] | null>(null);
  
  // Options for dropdowns
  const BUSINESS_MODELS = ['SaaS', 'Marketplace', 'E-commerce', 'Mobile App', 'AI Service', 'Consulting', 'Franchise', 'Subscription'];
  const REVENUE_MODELS = ['Subscription', 'Transaction Fee', 'Commission', 'Licensing', 'Advertising', 'Freemium', 'One-time Sale', 'Usage-based'];
  const TECHNOLOGIES = ['AI/ML', 'Blockchain', 'IoT', 'Cloud Computing', 'Mobile', 'Web', 'AR/VR', 'Robotics', '5G', 'Cybersecurity'];
  const INDUSTRIES = ['Healthcare', 'Finance', 'Education', 'E-commerce', 'Transportation', 'Real Estate', 'Entertainment', 'Food & Beverage', 'Fashion', 'Technology'];
  const COMPETITION_LEVELS = ['Low', 'Moderate', 'High', 'Very High'];
  const INVESTMENT_LEVELS = ['$10,000', '$50,000', '$100,000', '$250,000', '$500,000', '$1M+'];
  const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const IMPACT_LEVELS = ['Low', 'Medium', 'High', 'Very High'];
  const REGULATION_LEVELS = ['Low', 'Moderate', 'High', 'Very High'];

  // Business plan sections similar to Streamlit
  const BUSINESS_SECTIONS = [
    { icon: Lightbulb, title: '💡 Business Idea', key: 'businessIdea', description: 'Describe the core product/service and who it helps' },
    { icon: Zap, title: '🚀 MVP (Minimum Viable Product)', key: 'mvp', description: 'Specify the smallest feature set that delivers value' },
    { icon: Target, title: '🎯 Market Fit', key: 'marketFit', description: 'Explain target customer segments, needs, and differentiation' },
    { icon: TrendingUp, title: '📣 Promotion', key: 'promotion', description: 'Outline go-to-market and growth tactics' },
    { icon: DollarSign, title: '💰 Business Model', key: 'businessModel', description: 'Explain how the business captures value and revenue streams' },
    { icon: FileText, title: '💳 Pricing Scheme', key: 'pricingScheme', description: 'Propose simple, clear pricing with tiers or usage' },
    { icon: Users, title: '📈 Operational Requirements', key: 'operationalRequirements', description: 'Summarize team, tools, infrastructure, and processes' },
    { icon: Shield, title: '🔓 Security & Compliance', key: 'securityCompliance', description: 'State data protection, security controls, and compliance' },
    { icon: Globe, title: '💮 Environmental Impact', key: 'environmentalImpact', description: 'Discuss sustainability and ways to minimize negative impact' },
    { icon: ArrowUpRight, title: '🏃‍♀️ Regulatory Requirements', key: 'regulatoryRequirements', description: 'Call out licenses, certifications, or approvals needed' }
  ];

  // Check if all fields are filled
  const allFieldsFilled = businessModel && revenueModel && technology && industry && competition && investment && experience && impact && regulation;

  // Navigation functions
  const nextIdea = () => {
    if (ideas && currentIdeaIndex < ideas.length - 1) {
      setCurrentIdeaIndex(currentIdeaIndex + 1);
    }
  };

  const prevIdea = () => {
    if (currentIdeaIndex > 0) {
      setCurrentIdeaIndex(currentIdeaIndex - 1);
    }
  };

  const toggleIdeaExpansion = (index: number) => {
    const newExpanded = new Set(expandedIdeas);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedIdeas(newExpanded);
  };

  const openDetailedView = (index: number) => {
    setCurrentIdeaIndex(index);
    setCurrentStep('detailed');
  };

  const backToResults = () => {
    setCurrentStep('results');
  };

  // Auto-advance to next section when current section is complete
  const checkAndAdvanceSection = () => {
    if (currentSection === 'business' && businessModel && revenueModel && technology) {
      setCurrentSection('market');
    } else if (currentSection === 'market' && industry && competition && investment) {
      setCurrentSection('experience');
    }
  };

  // Enhanced selection handlers with auto-advance
  const handleBusinessModelSelect = (model: string) => {
    setBusinessModel(model);
    setTimeout(checkAndAdvanceSection, 500); // Small delay for better UX
  };

  const handleRevenueModelSelect = (model: string) => {
    setRevenueModel(model);
    setTimeout(checkAndAdvanceSection, 500);
  };

  const handleTechnologySelect = (tech: string) => {
    setTechnology(tech);
    setTimeout(checkAndAdvanceSection, 500);
  };

  const handleIndustrySelect = (ind: string) => {
    setIndustry(ind);
    setTimeout(checkAndAdvanceSection, 500);
  };

  const handleCompetitionSelect = (level: string) => {
    setCompetition(level);
    setTimeout(checkAndAdvanceSection, 500);
  };

  const handleInvestmentSelect = (level: string) => {
    setInvestment(level);
    setTimeout(checkAndAdvanceSection, 500);
  };

  const handleExperienceSelect = (level: string) => {
    setExperience(level);
    setTimeout(checkAndAdvanceSection, 500);
  };

  const handleImpactSelect = (level: string) => {
    setImpact(level);
    setTimeout(checkAndAdvanceSection, 500);
  };

  const handleRegulationSelect = (level: string) => {
    setRegulation(level);
    setTimeout(checkAndAdvanceSection, 500);
  };

  // Generate ideas function
  const handleGenerate = async () => {
    if (!allFieldsFilled) return;
    
    setCurrentStep('generating');
    setGenerationProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simulate API call delay
    setTimeout(() => {
      clearInterval(interval);
      setGenerationProgress(100);
      
      // Create mock ideas based on inputs
      const mockIdeas: IdeaCard[] = [
        {
          title: `${technology}-Powered ${industry} Solution`,
          description: `A revolutionary ${technology}-powered platform for the ${industry} sector that leverages ${businessModel} business model to deliver exceptional value.`,
        market: industry,
        investment: investment,
        competition: competition,
        technology: technology,
        revenue: revenueModel,
        experience: experience,
          environmental: impact,
          regulatory: regulation
        },
        {
          title: `Smart ${industry} ${businessModel}`,
          description: `An intelligent ${businessModel} solution that transforms the ${industry} landscape using cutting-edge ${technology} technology.`,
        market: industry,
        investment: investment,
        competition: competition,
        technology: technology,
        revenue: revenueModel,
        experience: experience,
          environmental: impact,
          regulatory: regulation
        },
        {
          title: `${industry} Innovation Hub`,
          description: `A comprehensive ${businessModel} platform that revolutionizes ${industry} operations through advanced ${technology} integration.`,
        market: industry,
        investment: investment,
        competition: competition,
        technology: technology,
        revenue: revenueModel,
        experience: experience,
          environmental: impact,
          regulatory: regulation
        }
      ];
      
      // Create detailed business plan sections for each idea
      const mockDetailedIdeas: DetailedIdea[] = [
        {
          businessIdea: `A revolutionary ${technology}-powered platform for the ${industry} sector that leverages ${businessModel} business model to deliver exceptional value. This solution addresses critical pain points in the ${industry} market by providing innovative tools and services that streamline operations and enhance productivity.`,
          mvp: `The minimum viable product will include core ${technology} functionality, basic user management, essential ${industry}-specific features, and a simple payment integration. This MVP will focus on delivering immediate value while gathering user feedback for future iterations.`,
          marketFit: `Target customers include ${industry} professionals, small to medium businesses in the ${industry} sector, and organizations looking to modernize their operations. The solution differentiates itself through advanced ${technology} integration and a user-friendly ${businessModel} approach.`,
          promotion: `Go-to-market strategy includes content marketing through industry blogs, partnerships with ${industry} influencers, targeted social media campaigns, and participation in ${industry} conferences and trade shows. Growth tactics focus on referral programs and strategic partnerships.`,
          businessModel: `Revenue is generated through ${revenueModel} with additional income from premium features, consulting services, and enterprise licensing. The ${businessModel} structure allows for scalable growth and recurring revenue streams.`,
          pricingScheme: `Pricing includes a freemium tier for basic users, professional tier at $49/month for advanced features, and enterprise tier with custom pricing for large organizations. Usage-based pricing applies to high-volume users.`,
          operationalRequirements: `Team requirements include ${experience} level developers, ${industry} domain experts, customer support specialists, and business development professionals. Infrastructure needs include cloud hosting, development tools, and analytics platforms.`,
          securityCompliance: `Data protection measures include end-to-end encryption, regular security audits, GDPR compliance for European users, and industry-specific security certifications. Regular penetration testing and vulnerability assessments are conducted.`,
          environmentalImpact: `The platform promotes sustainability by reducing paper usage, optimizing resource allocation, and enabling remote work. Carbon footprint is minimized through efficient cloud infrastructure and green hosting options.`,
          regulatoryRequirements: `Required licenses include business registration, data protection compliance, industry-specific certifications, and potentially financial services licenses depending on payment processing features.`
        },
        {
          businessIdea: `An intelligent ${businessModel} solution that transforms the ${industry} landscape using cutting-edge ${technology} technology. This platform revolutionizes how ${industry} professionals work by automating complex processes and providing data-driven insights.`,
          mvp: `The MVP will feature core ${technology} algorithms, basic automation tools, essential ${industry} workflows, and a simple dashboard for users to monitor their operations and performance metrics.`,
          marketFit: `Primary customers are ${industry} professionals and organizations seeking digital transformation. The solution stands out through its intelligent automation capabilities and deep ${industry} expertise built into the platform.`,
          promotion: `Marketing strategy focuses on demonstrating ROI through case studies, free trials for qualified prospects, industry webinar series, and strategic partnerships with ${industry} associations and technology providers.`,
          businessModel: `Revenue model combines ${revenueModel} with value-based pricing for enterprise customers. Additional revenue streams include professional services, training programs, and custom integrations.`,
          pricingScheme: `Pricing structure includes starter plan at $29/month, professional plan at $99/month, and enterprise plan with custom pricing. Volume discounts and annual contracts provide additional savings.`,
          operationalRequirements: `Operational team includes ${experience} level ${technology} specialists, ${industry} consultants, product managers, and customer success managers. Technology stack requires modern cloud infrastructure and AI/ML platforms.`,
          securityCompliance: `Security measures include multi-factor authentication, role-based access controls, regular security updates, and compliance with industry standards like SOC 2, ISO 27001, and relevant ${industry} regulations.`,
          environmentalImpact: `Environmental benefits include reduced travel through virtual collaboration, optimized resource usage through intelligent algorithms, and support for remote work environments that reduce commuting emissions.`,
          regulatoryRequirements: `Regulatory compliance includes data protection laws, industry-specific regulations, potentially financial services licenses, and regular audits to maintain compliance status.`
        },
        {
          businessIdea: `A comprehensive ${businessModel} platform that revolutionizes ${industry} operations through advanced ${technology} integration. This solution provides end-to-end management capabilities that streamline workflows and enhance decision-making processes.`,
          mvp: `The MVP will include core platform functionality, essential ${industry} modules, basic reporting and analytics, user management system, and integration capabilities with existing ${industry} tools and systems.`,
          marketFit: `Target market includes ${industry} organizations of all sizes, from startups to enterprise companies. The platform differentiates through comprehensive feature coverage, ease of integration, and exceptional user experience.`,
          promotion: `Go-to-market approach includes thought leadership content, industry partnerships, customer success stories, and targeted advertising campaigns. Growth is driven by word-of-mouth referrals and strategic alliances.`,
          businessModel: `Revenue is generated through ${revenueModel} with additional income from implementation services, custom development, training programs, and ongoing support contracts. The platform model ensures recurring revenue.`,
          pricingScheme: `Pricing includes basic plan at $19/month, standard plan at $79/month, and premium plan at $199/month. Enterprise customers receive custom pricing with dedicated support and advanced features.`,
          operationalRequirements: `Operational needs include experienced development team, ${industry} experts, customer support staff, sales and marketing professionals, and quality assurance specialists. Infrastructure requires scalable cloud platform.`,
          securityCompliance: `Security framework includes advanced threat detection, regular security assessments, compliance with international standards, and continuous monitoring of system vulnerabilities and potential threats.`,
          environmentalImpact: `Environmental initiatives include carbon-neutral hosting, energy-efficient algorithms, support for sustainable business practices, and tools to help customers measure and reduce their environmental footprint.`,
          regulatoryRequirements: `Compliance requirements include industry-specific regulations, data protection laws, potentially financial services licenses, and regular compliance audits to ensure ongoing adherence to all applicable laws.`
        }
      ];
      
      setIdeas(mockIdeas);
      setDetailedIdeas(mockDetailedIdeas);
      setCurrentIdeaIndex(0);
      setCurrentStep('results');
    }, 3000);
  };

  // Reset function
  const resetToInput = () => {
    setCurrentStep('input');
    setCurrentSection('business');
    setIdeas(null);
    setDetailedIdeas(null);
    setCurrentIdeaIndex(0);
    setExpandedIdeas(new Set());
    setGenerationProgress(0);
  };

  // Go back to business ideas hub
  const goBack = () => {
    onClose();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl grid place-items-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Idea Generator</h1>
                <p className="text-sm text-gray-600">Powered by Advanced AI</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {currentStep !== 'input' && (
                <button
                  onClick={resetToInput}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all text-gray-700"
                >
                  <Home className="w-4 h-4" />
                  Back to Start
                </button>
              )}
              
              <button
                onClick={goBack}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all text-gray-700"
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">


        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${currentStep === 'input' ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full grid place-items-center text-sm font-bold ${
                currentStep === 'input' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className="hidden sm:inline">Input</span>
            </div>
            
            <ArrowRight className="w-5 h-5 text-gray-300" />
            
            <div className={`flex items-center gap-2 ${currentStep === 'generating' ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full grid place-items-center text-sm font-bold ${
                currentStep === 'generating' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className="hidden sm:inline">Generating</span>
            </div>
            
            <ArrowRight className="w-5 h-5 text-gray-300" />
            
            <div className={`flex items-center gap-2 ${currentStep === 'results' ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full grid place-items-center text-sm font-bold ${
                currentStep === 'results' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <span className="hidden sm:inline">Results</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 'input' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Generate Your Next Big Idea</h2>
              <p className="text-xl text-slate-300">Select your preferences section by section to create personalized business opportunities</p>
            </div>
            
            {/* Section Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2 bg-gray-100 rounded-xl p-2 border border-gray-200">
                <button
                  onClick={() => setCurrentSection('business')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    currentSection === 'business'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Business Strategy
                  {businessModel && revenueModel && technology && (
                    <span className="ml-2 text-green-500">✓</span>
                  )}
                </button>
                <button
                  onClick={() => setCurrentSection('market')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    currentSection === 'market'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Market & Industry
                  {industry && competition && investment && (
                    <span className="ml-2 text-green-500">✓</span>
                  )}
                </button>
                <button
                  onClick={() => setCurrentSection('experience')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    currentSection === 'experience'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Experience & Impact
                  {experience && impact && regulation && (
                    <span className="ml-2 text-green-500">✓</span>
                  )}
                </button>
              </div>
            </div>

            {/* Section Completion Status */}
            <div className="text-center mb-6">
              {currentSection === 'business' && businessModel && revenueModel && technology && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg border border-green-200">
                  <span className="text-green-600">✓</span>
                  <span>Business Strategy Complete! Moving to Market & Industry...</span>
                </div>
              )}
              {currentSection === 'market' && industry && competition && investment && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg border border-green-200">
                  <span className="text-green-600">✓</span>
                  <span>Market & Industry Complete! Moving to Experience & Impact...</span>
                </div>
              )}
              {currentSection === 'experience' && experience && impact && regulation && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg border border-green-200">
                  <span className="text-green-600">✓</span>
                  <span>All Sections Complete! Ready to generate ideas!</span>
                </div>
              )}
            </div>

            {/* Business Strategy Section */}
            {currentSection === 'business' && (
          <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2 text-gray-800">Business Strategy</h3>
                  <p className="text-gray-600">Choose your business approach and revenue model</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Business Model */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-center mb-6 text-gray-800">Business Model</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {BUSINESS_MODELS.map(model => (
                        <button
                          key={model}
                          onClick={() => handleBusinessModelSelect(model)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            businessModel === model
                              ? 'border-purple-500 bg-purple-100 text-purple-700 shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm'
                          }`}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Revenue Model */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-center mb-6 text-gray-800">Revenue Model</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {REVENUE_MODELS.map(model => (
                        <button
                          key={model}
                          onClick={() => handleRevenueModelSelect(model)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            revenueModel === model
                              ? 'border-purple-500 bg-purple-100 text-purple-700 shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm'
                          }`}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technology Selection */}
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-center mb-6 text-gray-800">Technology Stack</h4>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {TECHNOLOGIES.map(tech => (
                          <button
                        key={tech}
                        onClick={() => handleTechnologySelect(tech)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          technology === tech
                            ? 'border-purple-500 bg-purple-100 text-purple-700 shadow-md'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm'
                        }`}
                      >
                        {tech}
                          </button>
                        ))}
                  </div>
                </div>

                {/* Next Section Button */}
                {businessModel && revenueModel && technology && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setCurrentSection('market')}
                      className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                      Continue to Market & Industry →
                    </button>
                  </div>
                )}
                      </div>
                    )}

            {/* Market & Industry Section */}
            {currentSection === 'market' && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2 text-gray-800">Market & Industry</h3>
                  <p className="text-gray-600">Define your target market and competitive landscape</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Industry */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-center mb-6 text-gray-800">Target Industry</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {INDUSTRIES.map(ind => (
                        <button
                          key={ind}
                          onClick={() => handleIndustrySelect(ind)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            industry === ind
                              ? 'border-purple-500 bg-purple-100 text-purple-700 shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Competition Level */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-center mb-6 text-gray-800">Competition Level</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {COMPETITION_LEVELS.map(level => (
                        <button
                          key={level}
                          onClick={() => handleCompetitionSelect(level)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            competition === level
                              ? 'border-purple-500 bg-purple-100 text-purple-700 shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Investment Level */}
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-center mb-6 text-gray-800">Investment Required</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {INVESTMENT_LEVELS.map(level => (
                      <button
                        key={level}
                        onClick={() => handleInvestmentSelect(level)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          investment === level
                            ? 'border-purple-500 bg-purple-100 text-purple-700 shadow-md'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Next Section Button */}
                {industry && competition && investment && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setCurrentSection('experience')}
                      className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                      Continue to Experience & Impact →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Experience & Impact Section */}
            {currentSection === 'experience' && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2 text-gray-800">Experience & Impact</h3>
                  <p className="text-gray-600">Set your experience level and impact preferences</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Experience Level */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-center mb-6 text-gray-800">Experience Level</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {EXPERIENCE_LEVELS.map(level => (
                        <button
                          key={level}
                          onClick={() => handleExperienceSelect(level)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            experience === level
                              ? 'border-purple-500 bg-purple-100 text-purple-700 shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Environmental Impact */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-center mb-6 text-gray-800">Environmental Impact</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {IMPACT_LEVELS.map(level => (
                        <button
                          key={level}
                          onClick={() => handleImpactSelect(level)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            impact === level
                              ? 'border-purple-500 bg-purple-100 text-purple-700 shadow-md'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Regulatory Considerations */}
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-center mb-6 text-gray-800">Regulatory Considerations</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {REGULATION_LEVELS.map(level => (
                      <button
                        key={level}
                        onClick={() => handleRegulationSelect(level)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          regulation === level
                            ? 'border-purple-500 bg-purple-100 text-purple-700 shadow-md'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Progress and Generate Button */}
            <div className="mt-12 text-center">
              {/* Progress Bar */}
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((Object.values({ businessModel, revenueModel, technology, industry, competition, investment, experience, impact, regulation }).filter(Boolean).length / 9) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(Object.values({ businessModel, revenueModel, technology, industry, competition, investment, experience, impact, regulation }).filter(Boolean).length / 9) * 100}%` }}
                  ></div>
                </div>
                      </div>

              {/* Field Status Debug */}
              <div className="max-w-2xl mx-auto mb-6 p-4 bg-gray-50 rounded-lg border">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Field Completion Status:</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className={`p-2 rounded ${businessModel ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Business Model: {businessModel ? '✓' : '✗'}
                  </div>
                  <div className={`p-2 rounded ${revenueModel ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Revenue Model: {revenueModel ? '✓' : '✗'}
                  </div>
                  <div className={`p-2 rounded ${technology ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Technology: {technology ? '✓' : '✗'}
                  </div>
                  <div className={`p-2 rounded ${industry ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Industry: {industry ? '✓' : '✗'}
                  </div>
                  <div className={`p-2 rounded ${competition ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Competition: {competition ? '✓' : '✗'}
                  </div>
                  <div className={`p-2 rounded ${investment ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Investment: {investment ? '✓' : '✗'}
                  </div>
                  <div className={`p-2 rounded ${experience ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Experience: {experience ? '✓' : '✗'}
                          </div>
                  <div className={`p-2 rounded ${impact ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Impact: {impact ? '✓' : '✗'}
                          </div>
                  <div className={`p-2 rounded ${regulation ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Regulation: {regulation ? '✓' : '✗'}
                          </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  You need to complete all 9 fields to generate ideas. Currently have {Object.values({ businessModel, revenueModel, technology, industry, competition, investment, experience, impact, regulation }).filter(Boolean).length}/9
                </p>
                        </div>
                        
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!allFieldsFilled}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                  allFieldsFilled
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {allFieldsFilled ? (
                  <span className="flex items-center justify-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Generate Ideas
                  </span>
                ) : (
                  'Complete all sections to generate ideas'
                )}
                          </button>
              
              {allFieldsFilled && (
                <p className="text-center text-sm text-gray-600 mt-3">
                  Ready to create amazing business opportunities! 🚀
                </p>
              )}
                  </div>
              </div>
            )}
            
        {/* Generating Step */}
        {currentStep === 'generating' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative">
              {/* Animated Loading Circle */}
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full grid place-items-center mx-auto mb-8 animate-pulse">
                <Loader2 className="w-16 h-16 text-white animate-spin" />
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-3 mb-8">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${generationProgress}%` }}
                ></div>
              </div>
              
              {/* Step Messages */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white mb-4">🚀 Generating Your Business Ideas</h3>
                <div className="space-y-2">
                  {generationProgress >= 20 && (
                    <p className="text-green-300">✅ Analyzing market trends...</p>
                  )}
                  {generationProgress >= 40 && (
                    <p className="text-green-300">✅ Evaluating competition...</p>
                  )}
                  {generationProgress >= 60 && (
                    <p className="text-green-300">✅ Assessing technology fit...</p>
                  )}
                  {generationProgress >= 80 && (
                    <p className="text-green-300">✅ Generating business concepts...</p>
                  )}
                  {generationProgress >= 100 && (
                    <p className="text-green-300">✅ Finalizing ideas...</p>
                  )}
                </div>
                <p className="text-slate-300 mt-6">Our AI is crafting innovative business opportunities just for you...</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Step */}
        {currentStep === 'results' && ideas && (
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">💡 Your AI-Generated Business Ideas</h2>
              <p className="text-xl text-gray-600">Based on {industry} industry with {technology} technology</p>
            </div>

            {/* Progress Indicator */}
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                <span className="text-lg font-semibold text-gray-800">
                  Idea {currentIdeaIndex + 1} of {ideas.length}
                </span>
                <br />
                <span className="text-sm text-gray-600">
                  {ideas[currentIdeaIndex]?.title}
                </span>
              </div>
            </div>

            {/* Single Idea Display */}
            <div className="max-w-4xl mx-auto">
              <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl grid place-items-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {ideas[currentIdeaIndex]?.title}
                  </h3>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {ideas[currentIdeaIndex]?.description}
                  </p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Market</div>
                    <div className="text-lg font-semibold text-gray-800">{ideas[currentIdeaIndex]?.market}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Investment</div>
                    <div className="text-lg font-semibold text-gray-800">{ideas[currentIdeaIndex]?.investment}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Competition</div>
                    <div className="text-lg font-semibold text-gray-800">{ideas[currentIdeaIndex]?.competition}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center space-y-4">
                  <button
                    onClick={() => openDetailedView(currentIdeaIndex)}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold transition-all shadow-lg hover:shadow-xl text-lg"
                  >
                    📋 View Full Business Plan
                    <ArrowUpRight className="w-5 h-5 ml-2 inline" />
                  </button>
                  
                  <div className="text-sm text-gray-500">
                    Get comprehensive details including MVP, market fit, pricing, operations, and more
                  </div>
                </div>
          </div>
        </div>
        
            {/* Navigation Controls */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={prevIdea}
                disabled={currentIdeaIndex === 0}
                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:opacity-50 text-gray-700 font-semibold transition-all flex items-center gap-2 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Idea
              </button>
              
                <button
                onClick={nextIdea}
                disabled={currentIdeaIndex === ideas.length - 1}
                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:opacity-50 text-gray-700 font-semibold transition-all flex items-center gap-2 shadow-sm"
              >
                Next Idea
                <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={resetToInput}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <RefreshCw className="w-4 h-4" />
                Generate New Ideas
              </button>
              <button
                onClick={resetToInput}
                className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-semibold transition-all flex items-center gap-2 shadow-sm"
              >
                <Home className="w-4 h-4" />
                Back to Inputs
              </button>
            </div>
          </div>
        )}

        {/* Detailed Business Plan View */}
        {currentStep === 'detailed' && detailedIdeas && ideas && (
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={backToResults}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-4xl font-bold text-gray-800">📋 Complete Business Plan</h2>
              </div>
              <p className="text-xl text-gray-600">
                {ideas[currentIdeaIndex]?.title} - Comprehensive Strategy & Implementation
              </p>
            </div>

            {/* Business Plan Sections */}
            <div className="space-y-8">
              {BUSINESS_SECTIONS.map((section, index) => {
                const IconComponent = section.icon;
                const content = detailedIdeas[currentIdeaIndex][section.key as keyof DetailedIdea];
                
                return (
                  <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                    {/* Section Header */}
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-6 h-6 text-white" />
                        <h3 className="text-xl font-bold text-white">{section.title}</h3>
                      </div>
                      <p className="text-purple-100 text-sm mt-1">{section.description}</p>
                    </div>
                    
                    {/* Section Content */}
                    <div className="p-6">
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed text-base">
                          {content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mt-12">
              <button
                onClick={backToResults}
                className="px-8 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-semibold transition-all flex items-center gap-2 shadow-sm text-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Results
              </button>
              
              <button
                onClick={resetToInput}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl text-lg"
              >
                <RefreshCw className="w-5 h-5" />
                Generate New Ideas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIIdeaGenerator;