import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Social links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/Edward-0528/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/edward-granados-459342195/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
            >
              LinkedIn
            </a>
            <a
              href="mailto:alexanders.edward@gmail.com"
              className="text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
            >
              Email
            </a>
          </div>

          {/* Attribution */}
          <p className="text-gray-400 text-xs font-mono">
            Built by Edward Granados with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
