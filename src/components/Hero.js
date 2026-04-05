import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown, FiDownload, FiStar, FiCamera, FiActivity, FiShield } from 'react-icons/fi';

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
    <span className="gradient-text">
      {displayed}
      <span className="animate-pulse text-accent">|</span>
    </span>
  );
};

/* ── Mini phone mockup for bento ── */
const MiniPhoneMockup = () => (
  <div className="relative w-[140px] flex-shrink-0">
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-card overflow-hidden">
      {/* Notch */}
      <div className="flex justify-center pt-2 pb-1">
        <div className="w-12 h-1 bg-gray-200 rounded-full" />
      </div>
      {/* App header */}
      <div className="px-3 pt-1 pb-2 flex items-center justify-between">
        <div>
          <span className="text-accent font-bold text-[10px]">CORE</span>
          <span className="text-text-primary font-bold text-[10px]">+</span>
        </div>
        <div className="w-4 h-4 rounded-full bg-accent-soft border border-accent-200 flex items-center justify-center">
          <span className="text-accent-600 text-[5px] font-bold">PRO</span>
        </div>
      </div>
      {/* Calorie ring */}
      <div className="flex flex-col items-center py-2">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="#E2E8F0" strokeWidth="4" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="#6BA4D4" strokeWidth="4"
              strokeDasharray="163.4" strokeDashoffset="49" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-text-primary font-bold text-[10px] leading-none">1,847</span>
            <span className="text-text-secondary text-[6px]">/ 2,200 kcal</span>
          </div>
        </div>
      </div>
      {/* AI scan */}
      <div className="mx-2 mb-2">
        <div className="bg-accent-soft border border-accent-200 rounded-lg p-1.5 flex items-center space-x-1.5">
          <FiCamera size={8} className="text-accent-600" />
          <span className="text-text-primary text-[7px] font-semibold">AI Meal Scan</span>
        </div>
      </div>
      {/* Meal log items */}
      <div className="px-2 pb-1">
        {[['Chicken Bowl', '520'], ['Greek Yogurt', '210']].map(([name, cal]) => (
          <div key={name} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
            <span className="text-text-secondary text-[6px]">{name}</span>
            <span className="text-gray-400 text-[6px] font-mono">{cal}kcal</span>
          </div>
        ))}
      </div>
      {/* Nav bar */}
      <div className="flex justify-around items-center px-2 py-2 border-t border-gray-100">
        {[FiActivity, FiCamera, FiShield].map((Icon, i) => (
          <Icon key={i} size={8} className={i === 1 ? 'text-accent' : 'text-gray-300'} />
        ))}
      </div>
      <div className="flex justify-center pb-1">
        <div className="w-10 h-0.5 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-surface overflow-hidden">
      {/* Ambient gradient orbs — stronger, with warm accent */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-accent-200/40 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-warm-100/30 rounded-full blur-[100px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-50/60 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            {/* Open to Work badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-accent-200 rounded-full px-4 py-1.5 mb-6 shadow-soft"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-accent-600 text-xs font-mono font-medium tracking-wide">Open to Work · 2026</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-accent font-mono text-sm mb-4 tracking-wide"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-4 leading-tight"
            >
              Edward Granados.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-secondary mb-8 leading-tight h-12 flex items-center"
            >
              <Typewriter />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-text-secondary text-lg max-w-xl mb-10 leading-relaxed"
            >
              I independently designed, built, and shipped{' '}
              <span className="text-accent-600 font-semibold">Core+</span> — an AI-powered nutrition &amp; fitness app — to both the{' '}
              <span className="text-text-primary font-medium">Apple App Store</span> and{' '}
              <span className="text-text-primary font-medium">Google Play Store</span>.
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
                className="inline-flex items-center border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 text-sm"
              >
                View My Work
              </a>
              <a
                href="/Edward_Granados_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-600 font-semibold py-3 px-8 rounded-full transition-all duration-300 text-sm shadow-soft hover:shadow-glow-blue"
              >
                <FiDownload size={14} />
                Resume
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center space-x-5 mt-10"
            >
              <a href="https://github.com/Edward-0528/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors duration-200">
                <FiGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/edward-granados-459342195/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors duration-200">
                <FiLinkedin size={20} />
              </a>
              <div className="w-16 h-px bg-gray-200" />
              <span className="text-text-secondary text-sm font-mono">alexanders.edward@gmail.com</span>
            </motion.div>
          </div>

          {/* Right — Bento Grid (replaces code block) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-3 grid-rows-3 gap-3 auto-rows-fr">
              {/* Bento 1 — Core+ phone mockup (spans 1 col, 3 rows) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="row-span-3 flex items-center justify-center bg-gradient-to-br from-accent-50 to-accent-100/60 border border-accent-200/60 rounded-2xl p-4 shadow-soft hover:shadow-card transition-all duration-300"
              >
                <MiniPhoneMockup />
              </motion.div>

              {/* Bento 2 — App Store Rating (warm accent!) */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="col-span-2 bg-white border border-gray-200 rounded-2xl p-5 shadow-soft hover:shadow-card tilt-card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-xs font-mono mb-1">App Store Rating</p>
                    <p className="text-3xl font-bold text-text-primary font-mono">5.0</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FiStar key={s} size={14} className="text-warm fill-warm" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full" />
                      <span className="text-[10px] text-emerald-500 font-mono font-medium">Live on App Store</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bento 3 — Versions shipped */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-soft hover:shadow-card tilt-card"
              >
                <p className="text-text-secondary text-xs font-mono mb-1">Shipped</p>
                <p className="text-3xl font-bold text-accent font-mono">80+</p>
                <p className="text-text-secondary text-[10px] mt-1">versions via CI/CD</p>
              </motion.div>

              {/* Bento 4 — Tech stack icons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="bg-gradient-to-br from-warm-50 to-warm-100/50 border border-warm-200/60 rounded-2xl p-5 shadow-soft hover:shadow-card tilt-card"
              >
                <p className="text-text-secondary text-xs font-mono mb-2">Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {['React Native', 'TS', 'Supabase', 'AI'].map((t) => (
                    <span key={t} className="text-[10px] font-mono text-warm-600 bg-white/80 border border-warm-200/50 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </motion.div>

              {/* Bento 5 — Platforms (full width bottom) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="col-span-2 bg-white border border-gray-200 rounded-2xl p-4 shadow-soft hover:shadow-card tilt-card"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Apple */}
                    <a href="https://apps.apple.com/us/app/core-calorie-macro-tracker/id6752533436" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-surface-alt hover:bg-accent-50 border border-gray-200 rounded-lg px-3 py-2 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-text-primary" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <span className="text-xs font-medium text-text-primary">App Store</span>
                    </a>
                    {/* Google Play */}
                    <a href="https://play.google.com/store/apps/details?id=com.edwardg.coreplus" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-surface-alt hover:bg-accent-50 border border-gray-200 rounded-lg px-3 py-2 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.18 23.76a2 2 0 0 0 2.07-.22l11.84-6.86-2.89-2.89zM.49 1.05A2 2 0 0 0 0 2.37v19.26a2 2 0 0 0 .49 1.32L.6 23.07l10.79-10.79v-.25L.6 1.24z" fill="#4285F4"/>
                        <path d="m18.64 13.4-3.1-3.1-10.79 10.75.07.07 2.07-.22z" fill="#34A853"/>
                        <path d="M18.64 10.6 15.54 7.5 3.69.64 1.62.42.6 1.24l10.79 10.79z" fill="#FBBC04"/>
                        <path d="m3.18.24 11.84 6.86 3.1-3.1-2.07-.86A2 2 0 0 0 14 3l-8.75-3A2 2 0 0 0 3.18.24z" fill="#EA4335"/>
                      </svg>
                      <span className="text-xs font-medium text-text-primary">Google Play</span>
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="text-text-primary text-xs font-semibold">2 Platforms</p>
                    <p className="text-text-secondary text-[10px] font-mono">Solo developer</p>
                  </div>
                </div>
              </motion.div>
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
          <a href="#about" className="text-gray-300 hover:text-accent transition-colors">
            <FiArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
