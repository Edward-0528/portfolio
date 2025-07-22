import React, { useState, useEffect } from 'react';
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
import { adminAuth } from './lib/adminAuth';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // Check for existing admin session on app load
  useEffect(() => {
    const checkSession = async () => {
      const isValid = await adminAuth.validateSession();
      if (isValid) {
        const admin = adminAuth.getCurrentAdmin();
        setIsAdmin(true);
        setCurrentAdmin(admin);
      }
    };

    checkSession();
  }, []);

  const handleAdminLogin = (adminData) => {
    setIsAdmin(true);
    setCurrentAdmin(adminData);
  };

  const handleLogout = () => {
    adminAuth.logout();
    setIsAdmin(false);
    setCurrentAdmin(null);
  };

  // Show admin panel if logged in, otherwise show regular portfolio
  if (isAdmin) {
    return (
      <div className="App">
        <AdminPanel onLogout={handleLogout} currentAdmin={currentAdmin} />
      </div>
    );
  }

  // Regular portfolio view
  return (
    <div className="App">
      <Header 
        isAdmin={isAdmin} 
        onAdminLogin={handleAdminLogin}
        onLogout={handleLogout} 
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
