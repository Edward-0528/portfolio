import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AuthDebugger from './components/AuthDebugger';
import CorePlusSupport from './components/CorePlusSupport';
import { supabaseAuthAdmin } from './lib/supabaseAuth';
import { authService } from './lib/supabase';
import './lib/portfolioAnalytics'; // Initialize analytics tracking

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing admin session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Checking existing session...');
        
        // First, check if Supabase auth has a session
        const currentSession = await authService.getCurrentSession();
        console.log('Current Supabase session:', currentSession);
        
        if (currentSession && currentSession.user) {
          console.log('Found active Supabase session for:', currentSession.user.email);
          
          // Create admin object from session
          const adminData = {
            id: currentSession.user.id,
            email: currentSession.user.email,
            username: currentSession.user.email.split('@')[0],
            role: currentSession.user.user_metadata?.role || 'admin'
          };
          
          setIsAdmin(true);
          setCurrentAdmin(adminData);
          
          // Update the auth service state
          supabaseAuthAdmin.currentUser = currentSession.user;
          supabaseAuthAdmin.currentSession = currentSession;
        } else {
          console.log('No active session found');
          setIsAdmin(false);
          setCurrentAdmin(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsAdmin(false);
        setCurrentAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
    
    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      console.log('Auth state change in App:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session) {
        const adminData = {
          id: session.user.id,
          email: session.user.email,
          username: session.user.email.split('@')[0],
          role: session.user.user_metadata?.role || 'admin'
        };
        
        setIsAdmin(true);
        setCurrentAdmin(adminData);
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
        setCurrentAdmin(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAdminLogin = (adminData) => {
    setIsAdmin(true);
    setCurrentAdmin(adminData);
  };

  const handleLogout = async () => {
    try {
      await supabaseAuthAdmin.logout();
      setIsAdmin(false);
      setCurrentAdmin(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="App flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-slate-700 bg-white">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  // Portfolio component
  const Portfolio = () => (
    <>
      <Header 
        isAdmin={isAdmin} 
        onAdminLogin={handleAdminLogin}
        onLogout={handleLogout} 
      />
      <div data-section="hero"><Hero /></div>
      <div data-section="projects"><Projects /></div>
      <div data-section="skills"><Skills /></div>
      <div data-section="about"><About /></div>
      <div data-section="education"><Education /></div>
      <div data-section="contact"><Contact /></div>
      <Footer />
      
      {/* Auth Debugger - only shows when ?debug=auth is in URL */}
      <AuthDebugger />
    </>
  );

  // Show admin panel if logged in, otherwise show regular portfolio with routing
  if (isAdmin) {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/coreplus" element={<CorePlusSupport />} />
            <Route path="/*" element={<AdminPanel onLogout={handleLogout} currentAdmin={currentAdmin} />} />
          </Routes>
        </div>
      </Router>
    );
  }

  // Regular portfolio view with routing
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/coreplus" element={<CorePlusSupport />} />
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
