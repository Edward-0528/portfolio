import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown, FiDownload } from 'react-icons/fi';

const ROLES = [
  'Full-Stack Engineer',
  'Mobile Developer',
  'Shipped to App Store & Play Store',
  'React Native · Supabase · AI',
];

const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = ROLES[index];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 22);
        return () => clearTimeout(t);
      } else {
        setIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, index]);

  return (
    <span className="text-green-400">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#0f0f1a] overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            {/* Open to Work badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="inline-flex items-center space-x-2 bg-green-400/10 border border-green-400/25 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-mono font-medium tracking-wide">Open to Work · March 2026</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-green-400 font-mono text-sm mb-4 tracking-wide"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            >
              Edward Granados.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 mb-8 leading-tight h-12 flex items-center"
            >
              <Typewriter />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed"
            >
              I independently designed, built, and shipped{' '}
              <span className="text-green-400 font-semibold">Core+</span> — an AI-powered nutrition &amp; fitness app — to both the{' '}
              <span className="text-white font-medium">Apple App Store</span> and{' '}
              <span className="text-white font-medium">Google Play Store</span>.
              Full-stack, production-ready, zero team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#projects"
                className="inline-flex items-center border border-green-400 text-green-400 hover:bg-green-400/10 font-medium py-3 px-8 rounded transition-colors duration-200 text-sm"
              >
                View My Work
              </a>
              <a
                href="/Edward_Granados_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-400 text-[#0f0f1a] hover:bg-green-300 font-semibold py-3 px-8 rounded transition-colors duration-200 text-sm"
              >
                <FiDownload size={14} />
                Resume
              </a>
            </motion.div>

            {/* App Store badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-3 mt-8"
            >
              <span className="text-gray-600 text-xs font-mono">Core+ available on</span>
              {/* Apple App Store badge */}
              <a
                href="https://apps.apple.com/us/app/core-ai-nutrition-tracker/id6743702718"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-green-400/30 text-white rounded-lg px-3 py-1.5 transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-xs font-medium">App Store</span>
              </a>
              {/* Google Play badge */}
              <a
                href="https://play.google.com/store/apps/details?id=com.edwardg.coreplus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-green-400/30 text-white rounded-lg px-3 py-1.5 transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 23.76a2 2 0 0 0 2.07-.22l11.84-6.86-2.89-2.89zM.49 1.05A2 2 0 0 0 0 2.37v19.26a2 2 0 0 0 .49 1.32L.6 23.07l10.79-10.79v-.25L.6 1.24z" fill="#4285F4"/>
                  <path d="m18.64 13.4-3.1-3.1-10.79 10.75.07.07 2.07-.22z" fill="#34A853"/>
                  <path d="M18.64 10.6 15.54 7.5 3.69.64 1.62.42.6 1.24l10.79 10.79z" fill="#FBBC04"/>
                  <path d="m3.18.24 11.84 6.86 3.1-3.1-2.07-.86A2 2 0 0 0 14 3l-8.75-3A2 2 0 0 0 3.18.24z" fill="#EA4335"/>
                </svg>
                <span className="text-xs font-medium">Google Play</span>
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center space-x-5 mt-10"
            >
              <a
                href="https://github.com/Edward-0528/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-400 transition-colors duration-200"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/edward-granados-459342195/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-400 transition-colors duration-200"
              >
                <FiLinkedin size={20} />
              </a>
              <div className="w-16 h-px bg-gray-700" />
              <span className="text-gray-500 text-sm font-mono">alexanders.edward@gmail.com</span>
            </motion.div>
          </div>

          {/* Right — Code block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="bg-[#1a1a2e] rounded-xl border border-white/5 p-6 shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center mb-5">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500/80 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500/80 rounded-full" />
                  <div className="w-3 h-3 bg-green-500/80 rounded-full" />
                </div>
                <span className="ml-4 text-gray-500 text-xs font-mono">about.ts</span>
              </div>
              {/* Code */}
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  <span className="text-blue-400">const</span>{' '}
                  <span className="text-yellow-300">developer</span>{' '}
                  <span className="text-white">=</span> {'{\n'}
                  {'  '}<span className="text-green-300">name</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-orange-300">"Edward Granados"</span>,{'\n'}
                  {'  '}<span className="text-green-300">role</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-orange-300">"Full-Stack Engineer"</span>,{'\n'}
                  {'  '}<span className="text-green-300">languages</span>
                  <span className="text-white">:</span> [
                  <span className="text-orange-300">"JS"</span>,{' '}
                  <span className="text-orange-300">"TS"</span>,{' '}
                  <span className="text-orange-300">"SQL"</span>,{' '}
                  <span className="text-orange-300">"Python"</span>],{'\n'}
                  {'  '}<span className="text-green-300">frameworks</span>
                  <span className="text-white">:</span> [
                  <span className="text-orange-300">"React"</span>,{' '}
                  <span className="text-orange-300">"React Native"</span>,{' '}
                  <span className="text-orange-300">"Node.js"</span>],{'\n'}
                  {'  '}<span className="text-green-300">shipped</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-orange-300">"Core+ → App Store & Google Play"</span>,{'\n'}
                  {'  '}<span className="text-green-300">passion</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-orange-300">"Building products people use"</span>{'\n'}
                  {'}'};
                </code>
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="text-gray-600 hover:text-gray-400 transition-colors">
            <FiArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
