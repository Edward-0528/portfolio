import React, { useState, useRef, useEffect } from 'react';
import AdminLoginModal from './AdminLoginModal';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const Header = ({ isAdmin = false, onAdminLogin = null, onLogout = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const longPressTimerRef = useRef(null);
  const isLongPressingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogoMouseDown = (e) => {
    e.preventDefault();
    if (isAdmin && onLogout) { onLogout(); return; }
    isLongPressingRef.current = true;
    longPressTimerRef.current = setTimeout(() => {
      if (isLongPressingRef.current) setShowLoginModal(true);
    }, 2000);
  };

  const handleLogoMouseUp = (e) => {
    e.preventDefault();
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    isLongPressingRef.current = false;
  };

  const handleLogoMouseLeave = () => {
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    isLongPressingRef.current = false;
  };

  const handleLoginSuccess = (adminData) => {
    if (onAdminLogin) onAdminLogin(adminData);
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => e.preventDefault()}
            onMouseDown={handleLogoMouseDown}
            onMouseUp={handleLogoMouseUp}
            onMouseLeave={handleLogoMouseLeave}
            onTouchStart={handleLogoMouseDown}
            onTouchEnd={handleLogoMouseUp}
            className="text-text-primary font-semibold text-lg tracking-tight select-none cursor-pointer hover:text-accent transition-colors duration-200"
          >
            {isAdmin ? '⚙ Admin' : 'EG.'}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {!isAdmin ? (
              <>
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-text-secondary hover:text-text-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="w-px h-5 bg-gray-200 mx-2" />
                <a
                  href="https://github.com/Edward-0528/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary p-2 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <FiGithub size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/edward-granados-459342195/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary p-2 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={18} />
                </a>
                <a
                  href="/Edward_Granados_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-sm font-medium text-white bg-accent hover:bg-accent-600 px-5 py-2 rounded-full transition-colors duration-200 shadow-soft"
                >
                  Resume
                </a>
              </>
            ) : (
              <span className="text-accent text-sm font-medium">Admin Mode</span>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-secondary hover:text-text-primary p-2 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && !isAdmin && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-2 bg-white/90 backdrop-blur-xl rounded-b-2xl">
            <div className="pt-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-text-secondary hover:text-text-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-4 px-3 pt-4">
                <a href="https://github.com/Edward-0528/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                  <FiGithub size={18} />
                </a>
                <a href="https://linkedin.com/in/edward-granados-459342195/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                  <FiLinkedin size={18} />
                </a>
                <a
                  href="/Edward_Granados_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white bg-accent hover:bg-accent-600 px-5 py-2 rounded-full transition-colors duration-200"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
};

export default Header;
