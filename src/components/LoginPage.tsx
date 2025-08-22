import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface LoginPageProps {
  onLogin: (user: { email: string; name: string; role: string; avatar: string }) => void;
  onGoToRegister?: () => void;
}

const LoginPage = ({ onLogin, onGoToRegister }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    setTimeout(() => setAnimateIn(true), 100);
    setTimeout(() => setAnimateForm(true), 300);
    setTimeout(() => setAnimateButton(true), 500);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Demo authentication for kaushik77@gmail.com
    if (email === 'kaushik77@gmail.com' && password === 'demo123') {
      setTimeout(() => {
        onLogin({
          email: 'kaushik77@gmail.com',
          name: 'Kaushik Gandhi',
          role: 'User',
          avatar: 'KG'
        });
        setIsLoading(false);
      }, 1000); // Simulate loading delay
      return;
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setError('Database connection not configured. Please set up your Supabase credentials.');
      setIsLoading(false);
      return;
    }

    try {
      // Supabase authentication
      const { data: authData, error: authError } = await supabase!.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        setError('Invalid credentials. Please check your email and password.');
        return;
      }

      if (authData.user) {
        // Get user profile from database
        const { data: profile, error: profileError } = await supabase!
          .from('user_profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profile) {
          onLogin({
            email: profile.email,
            name: profile.full_name,
            role: profile.role || 'Entrepreneur',
            avatar: profile.avatar || 'U'
          });
        } else {
          setError('User profile not found. Please try registering again.');
          return;
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
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

      <div className={`w-full max-w-md relative z-10 transition-all duration-1000 ${
        animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-2xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
            TechConnect
          </h1>
          <p className="text-gray-300 text-lg">
            Where Innovation Meets Opportunity
          </p>
        </div>

        {/* Login Form */}
        <div className={`bg-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl transition-all duration-1000 delay-200 ${
          animateForm ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-300">Sign in to continue your journey</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm animate-fade-in-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 group ${
                animateButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Don't have an account? 
            <button 
              onClick={onGoToRegister}
              className="text-purple-400 hover:text-purple-300 ml-1 font-medium transition-colors"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;