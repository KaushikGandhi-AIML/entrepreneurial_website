import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, User, GraduationCap, Briefcase, Target, Award, Brain, Sparkles, ChevronRight, MapPin, Home, Download, Share2, RefreshCw } from 'lucide-react';

interface ChatbotProps {
  onClose: () => void;
  userType?: 'student' | 'working';
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

interface UserData {
  userType: 'student' | 'working' | null;
  ug?: string;
  pg?: string;
  achievements?: string;
  domain?: string;
  currentField?: string;
}

interface CareerNode {
  id: string;
  label: string;
  type: 'education' | 'skill' | 'interest' | 'job' | 'current';
  color: string;
}

interface CareerData {
  nodes: CareerNode[];
  connections: { from: string; to: string }[];
}

const ChatbotInterface = ({ onClose, user, userType }: ChatbotProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({ userType: userType || null });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFlowchart, setShowFlowchart] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // If userType is provided, skip the user type selection step
    if (userType) {
      setCurrentStep(1);
    }
  }, [userType]);

  const handleUserTypeSelect = (type: 'student' | 'working') => {
    setUserData({ ...userData, userType: type });
    setTimeout(() => setCurrentStep(1), 300);
  };

  const handleNext = () => {
    if (userData.userType === 'student' && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (userData.userType === 'working' && currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      generateCareerPath();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateCareerPath = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowFlowchart(true);
      animateFlowchart();
    }, 3000);
  };

  const animateFlowchart = () => {
    const steps = userData.userType === 'student' ? 6 : 4;
    let step = 0;
    const interval = setInterval(() => {
      setAnimationStep(step);
      step++;
      if (step > steps) {
        clearInterval(interval);
      }
    }, 800);
  };

  const getCareerData = (): CareerData => {
    if (userData.userType === 'student') {
      return {
        nodes: [
          { id: 'ug', label: userData.ug || 'Undergraduate Degree', type: 'education', color: 'bg-blue-500' },
          { id: 'pg', label: userData.pg || 'Postgraduate Degree', type: 'education', color: 'bg-purple-500' },
          { id: 'achievement', label: userData.achievements || 'Skills & Achievements', type: 'skill', color: 'bg-green-500' },
          { id: 'domain', label: userData.domain || 'Domain Interest', type: 'interest', color: 'bg-orange-500' },
          { id: 'job1', label: 'Entry Level Position', type: 'job', color: 'bg-pink-500' },
          { id: 'job2', label: 'Mid-Level Position', type: 'job', color: 'bg-indigo-500' },
          { id: 'job3', label: 'Senior Position', type: 'job', color: 'bg-red-500' }
        ],
        connections: [
          { from: 'ug', to: 'pg' },
          { from: 'pg', to: 'job1' },
          { from: 'achievement', to: 'job1' },
          { from: 'domain', to: 'job1' },
          { from: 'job1', to: 'job2' },
          { from: 'job2', to: 'job3' }
        ]
      };
    } else {
      return {
        nodes: [
          { id: 'current', label: userData.currentField || 'Current Position', type: 'current', color: 'bg-blue-500' },
          { id: 'next1', label: 'Senior Position', type: 'job', color: 'bg-purple-500' },
          { id: 'next2', label: 'Management Role', type: 'job', color: 'bg-green-500' },
          { id: 'top', label: 'Executive Level', type: 'job', color: 'bg-orange-500' }
        ],
        connections: [
          { from: 'current', to: 'next1' },
          { from: 'next1', to: 'next2' },
          { from: 'next2', to: 'top' }
        ]
      };
    }
  };

  if (showFlowchart) {
    return <FlowchartView userData={userData} onClose={onClose} animationStep={animationStep} careerData={getCareerData()} user={user} />;
  }

  if (isGenerating) {
    return <GeneratingView userData={userData} user={user} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-yellow-400/20 rounded-full blur-2xl animate-bounce delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-bounce delay-700"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI Career Guide</h1>
                <p className="text-purple-200 text-sm">Personalized career path generator</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                  {user.avatar}
                </div>
                <span className="hidden sm:block text-sm">{user.name}</span>
              </div>
              
              <button
                onClick={onClose}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-white touch-target"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to AI Chatbot</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl w-full max-w-4xl">
          {/* Progress Bar */}
          <div className="px-6 py-4 border-b border-white/20">
            {!userType && (
              <>
                <div className="flex items-center space-x-2">
                  {Array.from({
                    length: userData.userType === 'student'
                      ? 5
                      : userData.userType === 'working'
                      ? 3
                      : 1,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        index <= currentStep ? 'bg-purple-400' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-white/80 mt-2">
                  Step {currentStep + 1} of{' '}
                  {userData.userType === 'student'
                    ? 5
                    : userData.userType === 'working'
                    ? 3
                    : 1}
                </p>
              </>
            )}
            {userType && (
              <>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: userType === 'student' ? 4 : 2 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        index < currentStep ? 'bg-purple-400' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-white/80 mt-2">
                  Step {currentStep} of {userType === 'student' ? 4 : 2}
                </p>
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-8 min-h-[500px] flex flex-col">
            {currentStep === 0 && !userType && <UserTypeStep onSelect={handleUserTypeSelect} />}
            {currentStep === 1 && userData.userType === 'student' && (
              <EducationStep
                userData={userData}
                setUserData={setUserData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 2 && userData.userType === 'student' && (
              <AchievementsStep
                userData={userData}
                setUserData={setUserData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 3 && userData.userType === 'student' && (
              <DomainStep
                userData={userData}
                setUserData={setUserData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 1 && userData.userType === 'working' && (
              <WorkingFieldStep
                userData={userData}
                setUserData={setUserData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserTypeStep = ({ onSelect }: { onSelect: (type: 'student' | 'working') => void }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-white mb-2">Welcome to AI Career Guide</h3>
        <p className="text-white/80 text-lg">Let's start by understanding your current status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <button
          onClick={() => onSelect('student')}
          className="group p-8 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl hover:border-blue-400/50 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 touch-target"
        >
          <GraduationCap className="w-16 h-16 text-blue-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
          <h4 className="text-xl font-semibold text-white mb-3">Student</h4>
          <p className="text-white/70">Currently pursuing or completed education</p>
        </button>

        <button
          onClick={() => onSelect('working')}
          className="group p-8 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl hover:border-green-400/50 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 touch-target"
        >
          <Briefcase className="w-16 h-16 text-green-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
          <h4 className="text-xl font-semibold text-white mb-3">Working Professional</h4>
          <p className="text-white/70">Currently working or have work experience</p>
        </button>
      </div>
    </div>
  );
};

const EducationStep = ({ userData, setUserData, onNext, onBack }: any) => {
  return (
    <div className="flex-1 flex flex-col space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Education Background</h3>
        <p className="text-white/80">Tell us about your educational qualifications</p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto w-full">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">
            Undergraduate Degree
          </label>
          <input
            type="text"
            value={userData.ug || ''}
            onChange={(e) => setUserData({ ...userData, ug: e.target.value })}
            placeholder="e.g., B.Tech Computer Science, B.Com, BBA"
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-md touch-target"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">
            Postgraduate Degree (Optional)
          </label>
          <input
            type="text"
            value={userData.pg || ''}
            onChange={(e) => setUserData({ ...userData, pg: e.target.value })}
            placeholder="e.g., M.Tech, MBA, M.Sc, or leave blank if not applicable"
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-md touch-target"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6 max-w-2xl mx-auto w-full">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 text-white/80 hover:text-white transition-colors touch-target"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={onNext}
          disabled={!userData.ug}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg touch-target"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const AchievementsStep = ({ userData, setUserData, onNext, onBack }: any) => {
  return (
    <div className="flex-1 flex flex-col space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Achievements & Skills</h3>
        <p className="text-white/80">Share your notable achievements, certifications, or skills</p>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <label className="block text-sm font-medium text-white/90 mb-3">
          Achievements & Certifications
        </label>
        <textarea
          value={userData.achievements || ''}
          onChange={(e) => setUserData({ ...userData, achievements: e.target.value })}
          placeholder="e.g., AWS Certified, Published Research Paper, Hackathon Winner, Internship at Google, etc."
          rows={6}
          className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none backdrop-blur-md touch-target"
        />
      </div>

      <div className="flex justify-between pt-6 max-w-2xl mx-auto w-full">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 text-white/80 hover:text-white transition-colors touch-target"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={onNext}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg touch-target"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const DomainStep = ({ userData, setUserData, onNext, onBack }: any) => {
  const domains = [
    'Software Development', 'Data Science', 'Artificial Intelligence', 'Cybersecurity',
    'Product Management', 'Digital Marketing', 'Finance', 'Consulting',
    'Healthcare', 'Education', 'Design', 'Research'
  ];

  return (
    <div className="flex-1 flex flex-col space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Domain of Interest</h3>
        <p className="text-white/80">What field are you most interested in pursuing?</p>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setUserData({ ...userData, domain })}
              className={`p-4 text-sm rounded-xl border-2 transition-all duration-200 backdrop-blur-md touch-target ${
                userData.domain === domain
                  ? 'border-purple-400 bg-purple-500/30 text-white'
                  : 'border-white/20 bg-white/10 hover:border-white/40 text-white/80 hover:text-white'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">
            Or specify your own
          </label>
          <input
            type="text"
            value={userData.domain || ''}
            onChange={(e) => setUserData({ ...userData, domain: e.target.value })}
            placeholder="Enter your domain of interest"
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-md touch-target"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6 max-w-4xl mx-auto w-full">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 text-white/80 hover:text-white transition-colors touch-target"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={onNext}
          disabled={!userData.domain}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg touch-target"
        >
          <span>Generate Career Path</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const WorkingFieldStep = ({ userData, setUserData, onNext, onBack }: any) => {
  const fields = [
    'Software Engineering', 'Data Science', 'Product Management', 'Marketing',
    'Sales', 'Finance', 'Operations', 'Human Resources',
    'Design', 'Consulting', 'Healthcare', 'Education'
  ];

  return (
    <div className="flex-1 flex flex-col space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Current Field</h3>
        <p className="text-white/80">What field are you currently working in or have experience with?</p>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {fields.map((field) => (
            <button
              key={field}
              onClick={() => setUserData({ ...userData, currentField: field })}
              className={`p-4 text-sm rounded-xl border-2 transition-all duration-200 backdrop-blur-md touch-target ${
                userData.currentField === field
                  ? 'border-purple-400 bg-purple-500/30 text-white'
                  : 'border-white/20 bg-white/10 hover:border-white/40 text-white/80 hover:text-white'
              }`}
            >
              {field}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">
            Or specify your own
          </label>
          <input
            type="text"
            value={userData.currentField || ''}
            onChange={(e) => setUserData({ ...userData, currentField: e.target.value })}
            placeholder="Enter your current field"
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-md touch-target"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6 max-w-4xl mx-auto w-full">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 text-white/80 hover:text-white transition-colors touch-target"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={onNext}
          disabled={!userData.currentField}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg touch-target"
        >
          <span>Generate Career Path</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const GeneratingView = ({ userData, user }: { userData: UserData, user: any }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl w-full max-w-lg p-12 text-center relative z-10">
        <div className="space-y-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Brain className="w-12 h-12 text-white animate-pulse" />
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">Generating Your Career Path</h3>
            <p className="text-white/80 text-lg">
              AI is analyzing your {userData.userType === 'student' ? 'education and interests' : 'experience'} to create a personalized career roadmap...
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-white/80">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Analyzing your profile...</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
              <span>Mapping career opportunities...</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-500"></div>
              <span>Creating your roadmap...</span>
            </div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-3">
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 h-3 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FlowchartView = ({ userData, onClose, animationStep, careerData, user }: { 
  userData: UserData, 
  onClose: () => void, 
  animationStep: number, 
  careerData: CareerData, 
  user: any 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'education': return GraduationCap;
      case 'skill': return Award;
      case 'interest': return Target;
      case 'job': return Briefcase;
      case 'current': return User;
      default: return Briefcase;
    }
  };

  const getCareerAdvice = () => {
    if (userData.userType === 'student') {
      return [
        'Focus on building practical skills through internships and projects',
        'Network with professionals in your chosen domain',
        'Consider pursuing relevant certifications',
        'Build a strong portfolio showcasing your work',
        'Stay updated with industry trends and technologies'
      ];
    } else {
      return [
        'Develop leadership and management skills',
        'Seek mentorship opportunities',
        'Consider additional certifications or training',
        'Build cross-functional expertise',
        'Focus on strategic thinking and business acumen'
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Personalized Career Path</h2>
              <p className="text-purple-200">AI-generated roadmap for {userData.userType === 'student' ? 'students' : 'working professionals'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-white touch-target"
              >
                <Target className="w-4 h-4" />
                <span>Career Advice</span>
              </button>
              <button
                onClick={onClose}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-white touch-target"
              >
                <Home className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Career Path Flowchart */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Your Career Journey</h3>
                
                <div className="flex flex-col items-center space-y-8">
                  {careerData.nodes.map((node, index) => {
                    const Icon = getNodeIcon(node.type);
                    return (
                      <div key={node.id} className="flex flex-col items-center">
                        <div
                          className={`transition-all duration-800 transform ${
                            index <= animationStep ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4'
                          }`}
                        >
                          <div className={`${node.color} text-white p-6 rounded-3xl shadow-2xl min-w-[280px] text-center backdrop-blur-md border border-white/20 hover:scale-105 transition-transform duration-300`}>
                            <div className="flex items-center justify-center mb-4">
                              <Icon className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">{node.label}</h4>
                            <p className="text-sm text-white/80">
                              {node.type === 'education' && 'Academic Foundation'}
                              {node.type === 'skill' && 'Skills & Achievements'}
                              {node.type === 'interest' && 'Domain Focus'}
                              {node.type === 'job' && 'Career Milestone'}
                              {node.type === 'current' && 'Current Position'}
                            </p>
                          </div>
                        </div>
                        
                        {index < careerData.nodes.length - 1 && (
                          <div
                            className={`transition-all duration-500 delay-300 ${
                              index < animationStep ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <ChevronRight className="w-8 h-8 text-white/60 rotate-90 my-6" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Career Advice Panel */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Career Advice</h3>
                </div>
                
                <div className="space-y-4">
                  {getCareerAdvice().map((advice, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/90 text-sm leading-relaxed">{advice}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Next Steps</h3>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 text-sm font-medium touch-target">
                    Get Detailed Roadmap
                  </button>
                  <button className="w-full p-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all duration-200 text-sm font-medium touch-target">
                    Find Mentors
                  </button>
                  <button className="w-full p-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all duration-200 text-sm font-medium touch-target">
                    Explore Courses
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-6 mt-12">
            <button className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg font-semibold touch-target">
              <Download className="w-5 h-5" />
              <span>Download Roadmap</span>
            </button>
            <button className="flex items-center space-x-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-md font-semibold touch-target">
              <Share2 className="w-5 h-5" />
              <span>Share Results</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-md font-semibold touch-target"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Generate New Path</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;