import React from 'react';
import MinimalNetworkBackground from './MinimalNetworkBackground';

/**
 * About Component
 * Displays personal information, skills overview, and development journey
 * Features: Two-column layout with text content and highlighted journey section
 */
const About = () => {
  return (
    // Main About Section Container
    <section id="about" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated particle background */}
      <MinimalNetworkBackground />
      
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section title and underline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        {/* Two-column layout: Text content + Journey highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Personal description and skill cards */}
          <div className="space-y-6">
            {/* Personal introduction paragraph 1 */}
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm a dynamic Software Engineer with 9 years of experience, uniquely blending retail management insights 
              with a robust foundation in Front-End and Mobile Development. Currently working as a Retail Store Manager 
              at T-Mobile Torrance, I've developed strong leadership and customer engagement skills while pursuing my 
              passion for software development.
            </p>
            
            {/* Personal introduction paragraph 2 */}
            <p className="text-lg text-gray-700 leading-relaxed">
              I specialize in React.js, Tailwind CSS, and Android development, with experience creating user-friendly, 
              mobile-first applications. I'm a proactive learner who embraces modern technologies to drive innovation 
              and enhance user experiences. My unique background allows me to understand both the technical and business 
              sides of development.
            </p>
            
            {/* Skills overview cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {/* Frontend skills card */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Frontend Focus</h4>
                <p className="text-gray-600">React, React Native, HTML, CSS, ES6+</p>
              </div>
              {/* Tools and mobile skills card */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Tools & Mobile</h4>
                <p className="text-gray-600">Android Studio, VS Code, Tailwind CSS</p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Development journey highlight box */}
          <div className="relative">
            {/* Journey highlight container with particle background */}
            <div className="rounded-lg p-8 text-white">
              {/* Local particle background for this section */}
              <MinimalNetworkBackground className="rounded-lg" />
              
              {/* Journey section title */}
              <h3 className="text-2xl font-bold mb-4">My Development Journey</h3>
              
              {/* Achievement list with icons */}
              <ul className="space-y-3">
                {/* Achievement item 1: Experience */}
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>9 years of experience bridging technology and customer needs</span>
                </li>
                
                {/* Achievement item 2: Teaching */}
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Experience teaching app development with Unity and Android Studio</span>
                </li>
                
                {/* Achievement item 3: Certifications */}
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Recent Coursera certifications in Front-End and React development</span>
                </li>
                
                {/* Achievement item 4: Applications */}
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Proven track record of building real-world applications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
