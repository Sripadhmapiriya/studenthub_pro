import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import CredentialsHelper from './components/CredentialsHelper';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  // Handle login process
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock JWT token
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
        email: credentials?.email,
        role: credentials?.role,
        exp: Date.now() + (credentials?.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000) // 30 days or 1 day
      }))}.signature`;

      // Store authentication data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userEmail', credentials?.email);
      localStorage.setItem('userRole', credentials?.role);
      
      if (credentials?.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      setIsAuthenticated(true);
      
      // Navigate to intended page or dashboard
      const from = location?.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      {/* Main Container */}
      <div className="relative w-full max-w-lg">
        {/* Login Card */}
        <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-2xl shadow-elevation-3 p-8">
          {/* Welcome Header */}
          <WelcomeHeader />
          
          {/* Login Form */}
          <LoginForm onLogin={handleLogin} isLoading={isLoading} />
          
          {/* Demo Credentials Helper */}
          <CredentialsHelper />
          
          {/* Security Badges */}
          <SecurityBadges />
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} StudentHub Pro. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-micro">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-micro">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-micro">
              Support
            </a>
          </div>
        </div>
      </div>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 shadow-elevation-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-foreground font-medium">Authenticating...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;