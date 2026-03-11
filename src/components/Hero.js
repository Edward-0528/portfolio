import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';

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
                href="#contact"
                className="inline-flex items-center text-gray-400 hover:text-white font-medium py-3 px-8 rounded transition-colors duration-200 text-sm"
              >
                Get In Touch →
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center space-x-5 mt-12"
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
