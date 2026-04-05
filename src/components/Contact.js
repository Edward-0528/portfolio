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
    <section id="contact" className="relative py-24 bg-surface-alt overflow-hidden">
      {/* Section-specific warm accent orb */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-warm-100/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="text-warm font-mono text-sm mb-4">05. What's Next?</p>
          <h2 className="text-4xl font-bold text-text-primary mb-6">Get In Touch</h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            I'm actively seeking Software Engineering and Full-Stack Developer roles.
            Whether you have a question, an opportunity, or just want to connect — my inbox is always open.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="/Edward_Granados_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-600 font-semibold py-3 px-8 rounded-full transition-all duration-300 text-sm shadow-soft hover:shadow-glow-blue"
            >
              <FiDownload size={15} />
              Download Resume
            </a>
            <a
              href="https://linkedin.com/in/edward-granados-459342195/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-200 text-text-secondary hover:border-accent-300 hover:text-accent font-medium py-3 px-8 rounded-full transition-colors duration-200 text-sm bg-white shadow-soft"
            >
              <FiLinkedin size={15} />
              LinkedIn
            </a>
            <a
              href="https://github.com/Edward-0528/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-200 text-text-secondary hover:border-accent-300 hover:text-accent font-medium py-3 px-8 rounded-full transition-colors duration-200 text-sm bg-white shadow-soft"
            >
              <FiGithub size={15} />
              GitHub
            </a>
          </div>
        </AnimatedSection>

        {/* Divider */}
        <AnimatedSection delay={0.05}>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs font-mono">or send a message</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {submitStatus === 'success' && (
              <div className="bg-accent-soft border border-accent-200 text-accent-600 px-4 py-3 rounded-lg text-sm">
                Thanks for reaching out! I'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                Something went wrong. Please email me directly at alexanders.edward@gmail.com
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm text-text-secondary mb-1.5">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 text-text-primary rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 placeholder-gray-400 text-sm shadow-soft"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-text-secondary mb-1.5">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 text-text-primary rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 placeholder-gray-400 text-sm shadow-soft"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-text-secondary mb-1.5">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white border border-gray-200 text-text-primary rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 placeholder-gray-400 text-sm resize-none shadow-soft"
                placeholder="Your message..."
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 justify-center bg-accent text-white hover:bg-accent-600 disabled:opacity-50 font-medium py-3 px-10 rounded-full transition-colors duration-200 text-sm shadow-soft"
              >
                <FiMail size={14} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </AnimatedSection>

        {/* Direct email */}
        <AnimatedSection delay={0.2}>
          <p className="text-gray-400 text-sm font-mono mt-10">
            alexanders.edward@gmail.com
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;