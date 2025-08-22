import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NewsFeed from './components/NewsFeed';
import RightSidebar from './components/RightSidebar';
import MarketTrends from './components/MarketTrends';
import MobileSidebars from './components/MobileSidebars';
import AIIdeaGenerator from './components/AIIdeaGenerator';

import ValidationPage from './components/ValidationPage';
import BusinessIdeaGenerator from './components/BusinessIdeaGenerator';
import AIChatbotHub from './components/AIChatbotHub';
import CareerOathForm from './components/CareerOathForm';
import InteractiveDiagram from './components/InteractiveDiagram';
import ProfessionalChatbotForm from './components/ProfessionalChatbotForm';
import ProfessionalInteractiveDiagram from './components/ProfessionalInteractiveDiagram';

interface User {
  email: string;
  name: string;
  role: string;
  avatar: string;
}

type CurrentPage = 'landing' | 'login' | 'register' | 'dashboard' | 'chatbot' | 'business-ideas' | 'market-trends';

function App() {
  // Initialize user from localStorage on app start
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Initialize currentPage based on user authentication
  const [currentPage, setCurrentPage] = useState<CurrentPage>(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return 'landing';
    
    // Restore last visited page if user was logged in
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? (savedPage as CurrentPage) : 'dashboard';
  });
  
  // Initialize subpages from localStorage
  const [businessIdeaSubpage, setBusinessIdeaSubpage] = useState<'main' | 'ai-generator' | 'validation'>(() => {
    const saved = localStorage.getItem('businessIdeaSubpage');
    return saved ? (saved as 'main' | 'ai-generator' | 'validation') : 'main';
  });
  
  const [chatbotSubpage, setChatbotSubpage] = useState<'hub' | 'student' | 'professional'>(() => {
    const saved = localStorage.getItem('chatbotSubpage');
    return saved ? (saved as 'hub' | 'student' | 'professional') : 'hub';
  });
  
  const [careerFormData, setCareerFormData] = useState<any>(() => {
    const saved = localStorage.getItem('careerFormData');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [professionalFormData, setProfessionalFormData] = useState<any>(() => {
    const saved = localStorage.getItem('professionalFormData');
    return saved ? JSON.parse(saved) : null;
  });

  // Wrapper functions to save state to localStorage
  const setCurrentPageWithStorage = (page: CurrentPage) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
  };

  const setBusinessIdeaSubpageWithStorage = (subpage: 'main' | 'ai-generator' | 'validation') => {
    setBusinessIdeaSubpage(subpage);
    localStorage.setItem('businessIdeaSubpage', subpage);
  };

  const setChatbotSubpageWithStorage = (subpage: 'hub' | 'student' | 'professional') => {
    setChatbotSubpage(subpage);
    localStorage.setItem('chatbotSubpage', subpage);
  };

  const setCareerFormDataWithStorage = (data: any) => {
    setCareerFormData(data);
    if (data) {
      localStorage.setItem('careerFormData', JSON.stringify(data));
    } else {
      localStorage.removeItem('careerFormData');
    }
  };

  const setProfessionalFormDataWithStorage = (data: any) => {
    setProfessionalFormData(data);
    if (data) {
      localStorage.setItem('professionalFormData', JSON.stringify(data));
    } else {
      localStorage.removeItem('professionalFormData');
    }
  };

  const handleGetStarted = () => {
    setCurrentPageWithStorage('register');
  };

  const handleGoToLogin = () => {
    setCurrentPageWithStorage('login');
  };

  const handleGoToRegister = () => {
    setCurrentPageWithStorage('register');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPageWithStorage('dashboard');
    // Save user to localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPageWithStorage('landing');
    // Remove user from localStorage
    localStorage.removeItem('user');
    // Clear all navigation state
    localStorage.removeItem('currentPage');
    localStorage.removeItem('businessIdeaSubpage');
    localStorage.removeItem('chatbotSubpage');
    localStorage.removeItem('careerFormData');
    localStorage.removeItem('professionalFormData');
  };

  const openChatbot = () => {
    setCurrentPageWithStorage('chatbot');
    setChatbotSubpageWithStorage('hub');
  };

  const closeChatbot = () => {
    setCurrentPageWithStorage('dashboard');
    setChatbotSubpageWithStorage('hub');
  };

  const openStudentChatbot = () => {
    setChatbotSubpageWithStorage('student');
  };

  const openProfessionalChatbot = () => {
    setChatbotSubpageWithStorage('professional');
  };

  const backToChatbotHub = () => {
    setChatbotSubpageWithStorage('hub');
    setCareerFormDataWithStorage(null);
    setProfessionalFormDataWithStorage(null);
  };

  const handleCareerFormSubmit = (data: any) => {
    setCareerFormDataWithStorage(data);
    setChatbotSubpageWithStorage('student'); // Stay in student mode to show the diagram
  };

  const handleProfessionalFormSubmit = (data: any) => {
    setProfessionalFormDataWithStorage(data);
    setChatbotSubpageWithStorage('professional');
  };

  const openBusinessIdeas = () => {
    setCurrentPageWithStorage('business-ideas');
    setBusinessIdeaSubpageWithStorage('main');
  };

  const closeBusinessIdeas = () => {
    setCurrentPageWithStorage('dashboard');
    setBusinessIdeaSubpageWithStorage('main');
  };

  const openAIGenerator = () => {
    setBusinessIdeaSubpageWithStorage('ai-generator');
  };

  const openValidation = () => {
    setBusinessIdeaSubpageWithStorage('validation');
  };

  const backToBusinessIdeas = () => {
    setBusinessIdeaSubpageWithStorage('main');
  };



  const openMarketTrends = () => {
    setCurrentPageWithStorage('market-trends');
  };

  const closeMarketTrends = () => {
    setCurrentPageWithStorage('dashboard');
  };

  // Show landing page first
  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} onLogin={handleGoToLogin} />;
  }

  // Show register page
  if (currentPage === 'register') {
    return <RegisterPage onRegister={handleLogin} onBackToLogin={handleGoToLogin} />;
  }

  // Show login page
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onGoToRegister={handleGoToRegister} />;
  }

  // Redirect to login if no user
  if (!user) {
    return <LoginPage onLogin={handleLogin} onGoToRegister={handleGoToRegister} />;
  }

  // Show chatbot page
  if (currentPage === 'chatbot') {
    if (chatbotSubpage === 'student') {
      if (careerFormData) {
        return <InteractiveDiagram onClose={backToChatbotHub} careerData={careerFormData} />;
      } else {
        return <CareerOathForm onBack={backToChatbotHub} onSubmit={handleCareerFormSubmit} />;
      }
    }
    if (chatbotSubpage === 'professional') {
      if (professionalFormData) {
        return <ProfessionalInteractiveDiagram onClose={backToChatbotHub} professionalData={professionalFormData} />;
      } else {
        return <ProfessionalChatbotForm onBack={backToChatbotHub} onSubmit={handleProfessionalFormSubmit} />;
      }
    }
    return <AIChatbotHub onClose={closeChatbot} onOpenStudent={openStudentChatbot} onOpenProfessional={openProfessionalChatbot} user={user} />;
  }

  // Show Business Ideas section
  if (currentPage === 'business-ideas') {
    if (businessIdeaSubpage === 'ai-generator') {
      return <AIIdeaGenerator onClose={backToBusinessIdeas} />;
    }
    if (businessIdeaSubpage === 'validation') {
      return <ValidationPage onClose={backToBusinessIdeas} user={user} />;
    }
    return <BusinessIdeaGenerator 
      onClose={closeBusinessIdeas} 
      onOpenAIGenerator={openAIGenerator}
      onOpenValidation={openValidation}
      user={user} 
    />;
  }

  

  // Show Market Trends Page
  if (currentPage === 'market-trends') {
    return <MarketTrends onClose={closeMarketTrends} />;
  }

  // Show main dashboard if user is authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header 
        user={user} 
        onLogout={handleLogout}
        onOpenChatbot={openChatbot}
        onOpenBusinessIdeas={openBusinessIdeas}

      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          <Sidebar user={user} onOpenChatbot={openChatbot} onOpenBusinessIdeas={openBusinessIdeas} onOpenMarketTrends={openMarketTrends} />
          
          <div className="flex-1 space-y-6">
            <MobileSidebars user={user} onOpenChatbot={openChatbot} onOpenBusinessIdeas={openBusinessIdeas} />
            <NewsFeed />
          </div>
          
          <RightSidebar />
        </div>
      </main>
      
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default App;