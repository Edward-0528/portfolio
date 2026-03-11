import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import AnimatedSection from './AnimatedSection';
import { FiDownload, FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await emailjs.send(
        'service_ipunz27',
        'template_hq3lind',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'Alexanders.Edward@Gmail.com',
        },
        'O08IfisoNfuN1KWf1'
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0f0f1a]">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="text-green-400 font-mono text-sm mb-4">05. What's Next?</p>
          <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            I'm actively seeking Software Engineering and Full-Stack Developer roles.
            Whether you have a question, an opportunity, or just want to connect — my inbox is always open.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="/Edward_Granados_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-400 text-[#0f0f1a] hover:bg-green-300 font-semibold py-3 px-8 rounded transition-colors duration-200 text-sm"
            >
              <FiDownload size={15} />
              Download Resume
            </a>
            <a
              href="https://linkedin.com/in/edward-granados-459342195/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 text-gray-300 hover:border-green-400/40 hover:text-white font-medium py-3 px-8 rounded transition-colors duration-200 text-sm"
            >
              <FiLinkedin size={15} />
              LinkedIn
            </a>
            <a
              href="https://github.com/Edward-0528/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 text-gray-300 hover:border-green-400/40 hover:text-white font-medium py-3 px-8 rounded transition-colors duration-200 text-sm"
            >
              <FiGithub size={15} />
              GitHub
            </a>
          </div>
        </AnimatedSection>

        {/* Divider */}
        <AnimatedSection delay={0.05}>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-gray-600 text-xs font-mono">or send a message</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {submitStatus === 'success' && (
              <div className="bg-green-400/10 border border-green-400/30 text-green-400 px-4 py-3 rounded-lg text-sm">
                Thanks for reaching out! I'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-400/10 border border-red-400/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                Something went wrong. Please email me directly at alexanders.edward@gmail.com
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-1.5">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#1a1a2e] border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-green-400/30 focus:border-green-400 transition-all duration-200 placeholder-gray-600 text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#1a1a2e] border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-green-400/30 focus:border-green-400 transition-all duration-200 placeholder-gray-600 text-sm"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-1.5">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-[#1a1a2e] border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-green-400/30 focus:border-green-400 transition-all duration-200 placeholder-gray-600 text-sm resize-none"
                placeholder="Your message..."
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 justify-center border border-green-400 text-green-400 hover:bg-green-400/10 disabled:opacity-50 font-medium py-3 px-10 rounded transition-colors duration-200 text-sm"
              >
                <FiMail size={14} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </AnimatedSection>

        {/* Direct email */}
        <AnimatedSection delay={0.2}>
          <p className="text-gray-600 text-sm font-mono mt-10">
            alexanders.edward@gmail.com
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;