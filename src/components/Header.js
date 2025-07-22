import React, { useState, useRef } from 'react';
import AdminLoginModal from './AdminLoginModal';

const Header = ({ isAdmin = false, onAdminLogin = null, onLogout = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const longPressTimerRef = useRef(null);
  const isLongPressingRef = useRef(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  // Handle long press authentication
  const handleLogoMouseDown = (e) => {
    e.preventDefault();
    console.log('Logo mouse down triggered');
    
    if (isAdmin && onLogout) {
      // If admin, logout on single click
      console.log('Admin logout triggered');
      onLogout();
      return;
    }

    // Start long press timer (2 seconds)
    console.log('Starting long press timer');
    isLongPressingRef.current = true;
    longPressTimerRef.current = setTimeout(() => {
      if (isLongPressingRef.current) {
        console.log('Long press completed - showing login modal');
        // Show login modal after 2 seconds
        setShowLoginModal(true);
      }
    }, 2000);
  };

  const handleLoginSuccess = (adminData) => {
    console.log('Login successful:', adminData);
    if (onAdminLogin) {
      onAdminLogin(adminData);
    }
  };

  const handleCloseLoginModal = () => {
    console.log('Closing login modal');
    setShowLoginModal(false);
  };

  const handleLogoMouseUp = (e) => {
    e.preventDefault();
    console.log('Logo mouse up triggered');
    
    // Clear the long press timer if mouse is released early
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    isLongPressingRef.current = false;
  };

  const handleLogoMouseLeave = (e) => {
    console.log('Logo mouse leave triggered');
    // Cancel long press if mouse leaves the element
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    isLongPressingRef.current = false;
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    // Prevent default navigation behavior
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              onClick={handleLogoClick}
              onMouseDown={handleLogoMouseDown}
              onMouseUp={handleLogoMouseUp}
              onMouseLeave={handleLogoMouseLeave}
              onTouchStart={handleLogoMouseDown}
              onTouchEnd={handleLogoMouseUp}
              className="text-2xl font-bold text-gray-900 flex items-center space-x-2 select-none cursor-pointer transition-all duration-200 hover:scale-105"
              title={isAdmin ? "Click to logout" : "Hold for 2 seconds to access admin"}
            >
              {isAdmin ? (
                <>
                  <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3V12.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                  </svg>
                  <span>Admin Panel</span>
                </>
              ) : (
                <span>Edward Granados</span>
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {!isAdmin ? (
                navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                  >
                    {item.name}
                  </a>
                ))
              ) : (
                <div className="text-emerald-700 px-3 py-2 rounded-md text-sm font-medium">
                  Logged in as Admin
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && !isAdmin && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={handleCloseLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
};

export default Header;
