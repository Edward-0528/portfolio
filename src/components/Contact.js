import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import MinimalNetworkBackground from './MinimalNetworkBackground';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(''); // Clear any previous status
    
    try {
      // EmailJS configuration - you'll need to replace these with your actual values
      const serviceID = 'service_ipunz27'; // Replace with your EmailJS service ID
      const templateID = 'template_hq3lind'; // Replace with your EmailJS template ID
      const publicKey = 'O08IfisoNfuN1KWf1'; // Replace with your EmailJS public key
      
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'Alexanders.Edward@Gmail.com', // Your email
      };
      
      // Send email using EmailJS
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: "Email",
      info: "Alexanders.Edward@Gmail.com",
      link: "mailto:Alexanders.Edward@Gmail.com"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      title: "LinkedIn",
      info: "Connect with me",
      link: "https://linkedin.com/in/edward-granados-459342195/"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      title: "GitHub",
      info: "View my repositories",
      link: "https://github.com/Edward-0528/"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      <MinimalNetworkBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-slate-700 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            I'm actively seeking opportunities in Front-End Development and Junior Software Engineering roles. 
            Let's connect and discuss how my unique blend of technical skills and leadership experience 
            can contribute to your team's success!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's Start a Conversation</h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                I'm a dynamic Software Engineer with 9 years of diverse experience, actively seeking 
                entry-level Front-End Developer or Junior Software Engineer positions. My unique background 
                combines strong leadership skills from retail management with hands-on development experience 
                in React, mobile applications, and modern web technologies. I'm passionate about creating 
                user-centric solutions and ready to bring fresh perspectives to your development team.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white bg-opacity-95 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-400 transition duration-300 group shadow-md"
                >
                  <div className="text-emerald-700 group-hover:text-emerald-800 mr-4">
                    {contact.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-emerald-800 text-lg">
                      {contact.title}
                    </h4>
                    <p className="text-gray-700 text-base">{contact.info}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-white bg-opacity-95 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-lg">
              <h4 className="text-xl font-bold mb-6 text-emerald-700">Why Work With Me?</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-2xl font-bold mb-2 text-slate-800">Fast</div>
                  <div className="text-sm text-gray-700 leading-relaxed">Quick to learn new technologies</div>
                </div>
                <div className="text-center p-3 bg-slate-100 rounded-lg border border-slate-300">
                  <div className="text-2xl font-bold mb-2 text-slate-800">Dedicated</div>
                  <div className="text-sm text-gray-700 leading-relaxed">Committed to quality code</div>
                </div>
                <div className="text-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="text-2xl font-bold mb-2 text-slate-800">Collaborative</div>
                  <div className="text-sm text-gray-700 leading-relaxed">Great team player</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold mb-2 text-slate-800">Growth-minded</div>
                  <div className="text-sm text-gray-700 leading-relaxed">Always improving skills</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm border border-gray-200 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h3>
            
            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you for your message! I'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                Sorry, there was an error sending your message. Please try again or contact me directly at Alexanders.Edward@Gmail.com
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-300 placeholder-gray-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-300 placeholder-gray-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-300 placeholder-gray-500"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
