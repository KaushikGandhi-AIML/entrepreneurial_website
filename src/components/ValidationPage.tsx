import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, Loader2, Lightbulb, Zap, Target, TrendingUp } from 'lucide-react';

interface ValidationPageProps {
  onClose: () => void;
  user: { name: string; role: string; avatar: string };
}

interface ValidationResult {
  originality_score: number;
  market_score: number;
  feasibility_score: number;
  risk_level: 'Low' | 'Medium' | 'High' | string;
  verdict: string;
  reasoning: string;
  success: boolean;
}

const ValidationPage: React.FC<ValidationPageProps> = ({ onClose, user }) => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check API status on component mount
  React.useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch('http://localhost:8003/api/health');
      if (response.ok) {
        setApiStatus('online');
      } else {
        setApiStatus('offline');
      }
    } catch (error) {
      setApiStatus('offline');
    }
  };

  const handleValidate = async () => {
    setError(null);
    setResult(null);
    if (!idea.trim()) {
      setError('Please enter a business idea to validate.');
      return;
    }
    
    setIsLoading(true);
    try {
      // Call the FastAPI validation endpoint
      const response = await fetch('http://localhost:8003/api/validate-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea: idea.trim(),
          model: 'llama-3.1-8b-instant',
          temperature: 0.2
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ValidationResult = await response.json();
      setResult(data);
      
      // Update API status to online if validation succeeds
      setApiStatus('online');
      
    } catch (e: any) {
      if (e.message.includes('Failed to fetch') || e.message.includes('Connection refused')) {
        setError('Cannot connect to validation service. Please ensure the FastAPI server is running on port 8003.');
        setApiStatus('offline');
      } else {
        setError(e?.message || 'Failed to validate idea. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const retryApiConnection = async () => {
    setApiStatus('checking');
    await checkApiStatus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 touch-target"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Business Ideas</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Idea Validation</h1>
                  <p className="text-sm text-gray-600">AI evaluation using FastAPI validation service</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user.avatar}
              </div>
              <span className="hidden sm:block text-sm">{user.name}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Status Banner */}
        <div className="mb-6">
          {apiStatus === 'checking' && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Checking validation service status...</span>
            </div>
          )}
          
          {apiStatus === 'online' && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>✅ Validation service is online and ready</span>
            </div>
          )}
          
          {apiStatus === 'offline' && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-semibold">Validation service is offline</div>
                <div className="text-sm opacity-90">
                  Start the FastAPI server with: <code className="bg-red-100 px-2 py-1 rounded">python validation_model.py api</code>
                </div>
              </div>
              <button 
                onClick={retryApiConnection}
                className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-red-700 text-sm font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Centered Chatbox */}
        <div className="max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl bg-white/90 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">AI Business Idea Validator</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Describe your business idea:</label>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g., A subscription box for renting designer sarees for special occasions..."
                  className="w-full h-32 p-4 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
                />
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-semibold">Validation failed</div>
                    <div className="text-sm opacity-90">{error}</div>
                  </div>
                </div>
              )}

              <button
                onClick={handleValidate} 
                disabled={isLoading || !idea.trim() || apiStatus === 'offline'} 
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin" /> 
                    <span>AI is analyzing your idea...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <Zap className="w-5 h-5" />
                    Validate Business Idea
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Loading Animation */}
          {isLoading && (
            <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 shadow-lg">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Analysis in Progress</h3>
                <p className="text-gray-600">Our AI is evaluating your business idea across multiple dimensions...</p>
              </div>
            </div>
          )}

          {/* Validation Results */}
          {result && !isLoading && (
            <div className="mt-8 space-y-6">
              {/* Score Cards */}
              <div className="grid grid-cols-3 gap-4">
                <MetricCard 
                  label="Originality" 
                  value={result.originality_score.toString()} 
                  color="text-purple-600" 
                  icon={Lightbulb}
                />
                <MetricCard 
                  label="Market" 
                  value={result.market_score.toString()} 
                  color="text-blue-600" 
                  icon={Target}
                />
                <MetricCard 
                  label="Feasibility" 
                  value={result.feasibility_score.toString()} 
                  color="text-green-600" 
                  icon={TrendingUp}
                />
              </div>

              {/* Verdict Card */}
              <div className="p-6 rounded-2xl bg-white/90 border border-gray-200 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">AI Verdict</h3>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    result.risk_level === 'Low' ? 'bg-green-100 text-green-700 border border-green-200' : 
                    result.risk_level === 'High' ? 'bg-red-100 text-red-700 border border-red-200' : 
                    'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                    {result.risk_level} Risk
                  </div>
                </div>
                <p className="text-lg text-gray-800 leading-relaxed mb-3">{result.verdict}</p>
                {result.reasoning && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm leading-relaxed">{result.reasoning}</p>
                  </div>
                )}
              </div>

              {/* Raw JSON (Collapsible) */}
              <details className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">View Raw Analysis Data</summary>
                <pre className="mt-3 text-sm text-gray-600 whitespace-pre-wrap bg-white p-4 rounded-lg border">{JSON.stringify({ result }, null, 2)}</pre>
              </details>
            </div>
          )}

          {/* Initial State */}
          {!result && !isLoading && (
            <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl grid place-items-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Ready to Validate Your Idea</h3>
                <p className="text-gray-600">
                  {apiStatus === 'online' 
                    ? 'Enter your business idea above and click validate to get AI-powered insights on originality, market potential, and feasibility.'
                    : 'Please start the validation service to begin validating your business ideas.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const MetricCard = ({ label, value, color, icon: Icon }: { label: string; value: string; color: string; icon: any }) => (
  <div className="p-6 rounded-2xl bg-white/90 border border-gray-200 shadow">
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <div className="text-sm text-gray-600">{label}</div>
    </div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
  </div>
);

export default ValidationPage;