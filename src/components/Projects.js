import React from 'react';
import AnimatedSection from './AnimatedSection';
import { FiGithub, FiExternalLink, FiCamera, FiActivity, FiShield } from 'react-icons/fi';

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Core+',
    subtitle: 'AI Nutrition & Fitness Tracker',
    category: 'Full-Stack Mobile',
    description:
      'An AI-powered calorie & macro tracker that goes beyond basic food logging. Snap a photo and Gemini AI identifies your food, calculates calories, macros, and micros instantly. Features specialized health profiles (diabetes, heart health, kidney health), real-time nutrition grading (A–F), allergen detection, and Apple HealthKit / Google Health Connect sync. Shipped solo to both app stores.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Google Gemini API', 'RevenueCat', 'EAS Build'],
    image: null,
    github: 'https://github.com/Edward-0528/',
    live: '#',
    featured: true,
    highlights: [
      'Shipped 80+ versions via automated EAS Build CI/CD pipeline',
      'Integrated Apple HealthKit & Google Health Connect',
      'Implemented A/B testing for feature tiers & conversion optimization',
    ],
  },
  {
    id: 2,
    title: 'BudgetApp',
    subtitle: 'Personal Finance Web Application',
    category: 'React',
    description:
      'A responsive personal finance web application built with React and Tailwind CSS. Features dynamic UI components, state management, and interactive MUI data visualization for tracking income and expenses.',
    technologies: ['React', 'Tailwind CSS', 'MUI', 'Chart.js'],
    image: null,
    github: 'https://github.com/Edward-0528/budget-app',
    live: 'https://budgetappedward.netlify.app',
    featured: true,
    highlights: [
      'Interactive charts for visualizing transactions',
      'Mobile-first responsive design',
    ],
  },
  {
    id: 3,
    title: 'Portfolio',
    subtitle: 'Developer Portfolio',
    category: 'React',
    description:
      'This portfolio site — built with React, Tailwind CSS, and Framer Motion. Features scroll-reveal animations, dark theme, Supabase-backed admin panel, and EmailJS contact form.',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'EmailJS'],
    image: null,
    github: 'https://github.com/Edward-0528/portfolio',
    live: 'https://edwardgranados.netlify.app',
    featured: false,
    highlights: [],
  },
  {
    id: 4,
    title: 'Weather App',
    subtitle: 'Real-Time Weather Dashboard',
    category: 'React',
    description:
      'A modern weather application providing real-time data via Open Mateo API with automatic geolocation detection. Clean UI with responsive design.',
    technologies: ['React', 'Tailwind CSS', 'Open Mateo API', 'Geolocation API'],
    image: null,
    github: 'https://github.com/Edward-0528/weather-app',
    live: 'https://weatherappedward.netlify.app',
    featured: false,
    highlights: [],
  },
  {
    id: 5,
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack Shopping Experience',
    category: 'React',
    description:
      'A full-featured e-commerce application with cart functionality, user authentication, and persistent data via Supabase. AI-assisted UI/UX design.',
    technologies: ['React', 'Tailwind CSS', 'Supabase', 'Gemini AI'],
    image: null,
    github: 'https://github.com/Edward-0528/ecommerce-app',
    live: 'https://ecomedward.netlify.app',
    featured: false,
    highlights: [],
  },
];

const CorePlusMockup = () => (
  <div className="relative flex items-center justify-center py-8">
    {/* Glow behind phone */}
    <div className="absolute w-64 h-80 bg-green-500/10 rounded-full blur-3xl" />

    {/* Phone frame */}
    <div className="relative w-[220px] bg-[#0a0a14] rounded-[36px] border-2 border-white/10 shadow-2xl overflow-hidden"
         style={{ boxShadow: '0 0 60px rgba(74,222,128,0.08), 0 25px 50px rgba(0,0,0,0.6)' }}>
      {/* Notch */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-20 h-1.5 bg-white/10 rounded-full" />
      </div>

      {/* Status bar */}
      <div className="flex justify-between items-center px-5 py-1">
        <span className="text-white/40 text-[9px] font-mono">9:41</span>
        <div className="flex space-x-1">
          <div className="w-3 h-1.5 bg-white/30 rounded-sm" />
          <div className="w-1 h-1.5 bg-green-400/60 rounded-sm" />
        </div>
      </div>

      {/* App header */}
      <div className="px-4 pt-2 pb-3 flex items-center justify-between">
        <div>
          <span className="text-green-400 font-bold text-sm tracking-wide">CORE</span>
          <span className="text-white font-bold text-sm">+</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
          <span className="text-green-400 text-[8px] font-bold">PRO</span>
        </div>
      </div>

      {/* Calorie ring */}
      <div className="flex flex-col items-center py-3">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle cx="48" cy="48" r="40" fill="none" stroke="#4ade80" strokeWidth="6"
              strokeDasharray="251.2" strokeDashoffset="75" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">1,847</span>
            <span className="text-gray-500 text-[9px]">/ 2,200 kcal</span>
          </div>
        </div>
        {/* Macros row */}
        <div className="flex space-x-4 mt-3">
          {[['P', '142g', '#4ade80'], ['C', '198g', '#60a5fa'], ['F', '54g', '#f59e0b']].map(([label, val, color]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-[8px] font-mono" style={{ color }}>{label}</span>
              <span className="text-white text-[10px] font-semibold">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Scan button */}
      <div className="mx-4 mb-3">
        <div className="bg-green-400/10 border border-green-400/20 rounded-xl p-2.5 flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <FiCamera size={11} className="text-green-400" />
          </div>
          <div>
            <p className="text-white text-[9px] font-semibold">AI Meal Scan</p>
            <p className="text-gray-500 text-[8px]">Snap a photo · instant macros</p>
          </div>
          <div className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Recent meals */}
      <div className="px-4 pb-2">
        <p className="text-gray-600 text-[8px] font-mono uppercase tracking-wider mb-1.5">Today's Log</p>
        {[
          { meal: 'Grilled Chicken Bowl', cal: '520 kcal', grade: 'A' },
          { meal: 'Greek Yogurt + Berries', cal: '210 kcal', grade: 'A' },
          { meal: 'Protein Shake', cal: '180 kcal', grade: 'B+' },
        ].map(({ meal, cal, grade }) => (
          <div key={meal} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
            <div className="flex items-center space-x-1.5">
              <FiActivity size={8} className="text-green-400/60 flex-shrink-0" />
              <span className="text-gray-400 text-[8px] truncate max-w-[100px]">{meal}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-gray-500 text-[8px] font-mono">{cal}</span>
              <span className="text-green-400 text-[8px] font-bold font-mono">{grade}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around items-center px-4 py-3 border-t border-white/5 mt-1">
        {[FiActivity, FiCamera, FiShield].map((Icon, i) => (
          <div key={i} className={`flex flex-col items-center ${i === 1 ? 'text-green-400' : 'text-gray-600'}`}>
            <Icon size={12} />
          </div>
        ))}
      </div>

      {/* Home bar */}
      <div className="flex justify-center pb-2">
        <div className="w-16 h-1 bg-white/10 rounded-full" />
      </div>
    </div>

    {/* Floating badge — App Store */}
    <div className="absolute -right-2 top-12 bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[9px] text-gray-500 font-mono">Available on</p>
      <p className="text-white text-[10px] font-semibold">App Store &amp;</p>
      <p className="text-white text-[10px] font-semibold">Google Play</p>
    </div>

    {/* Floating badge — AI */}
    <div className="absolute -left-2 bottom-16 bg-[#1a1a2e] border border-green-400/20 rounded-xl px-3 py-2 shadow-xl">
      <p className="text-green-400 text-[9px] font-mono font-semibold">Gemini AI</p>
      <p className="text-gray-400 text-[9px]">Food recognition</p>
    </div>
  </div>
);

const Projects = () => {
  const featured = FALLBACK_PROJECTS.filter((p) => p.featured);
  const other = FALLBACK_PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-[#0f0f1a]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center mb-16">
            <h2 className="text-2xl font-bold text-white whitespace-nowrap">
              <span className="text-green-400 font-mono text-lg mr-2">02.</span>
              Things I've Built
            </h2>
            <div className="ml-6 h-px bg-gray-700 flex-grow max-w-xs" />
          </div>
        </AnimatedSection>

        {/* Featured projects — large cards */}
        <div className="space-y-20 mb-24">
          {featured.map((project, idx) => (
            <AnimatedSection key={project.id} delay={0.1}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                {/* Mockup / image side */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center min-h-[400px]">
                  {project.title === 'Core+' ? (
                    <CorePlusMockup />
                  ) : (
                    <span className="text-6xl font-bold text-white/5 select-none">{project.title}</span>
                  )}
                </div>

                {/* Text side */}
                <div>
                  <p className="text-green-400 font-mono text-sm mb-2">{project.subtitle || 'Featured Project'}</p>
                  <h3 className="text-3xl font-bold text-white mb-5">{project.title}</h3>
                  <div className="bg-[#1a1a2e] border border-white/5 rounded-xl p-6 mb-5 shadow-xl">
                    <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-300">
                            <span className="text-green-400 mr-2 mt-0.5 text-xs">▹</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.github && project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                        <FiGithub size={20} />
                      </a>
                    )}
                    {project.live && project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Other projects — grid */}
        {other.length > 0 && (
          <>
            <AnimatedSection>
              <h3 className="text-xl font-semibold text-white text-center mb-10">
                Other Noteworthy Projects
              </h3>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {other.map((project) => (
                <AnimatedSection key={project.id} delay={0.05}>
                  <div className="bg-[#1a1a2e] border border-white/5 rounded-xl p-6 h-full flex flex-col hover:border-green-400/20 hover:-translate-y-1 transition-all duration-300 group">
                    {/* Top row */}
                    <div className="flex justify-between items-center mb-5">
                      <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      <div className="flex space-x-3">
                        {project.github && project.github !== '#' && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors">
                            <FiGithub size={18} />
                          </a>
                        )}
                        {project.live && project.live !== '#' && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors">
                            <FiExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">{project.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-5">{project.description}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-xs font-mono text-gray-500">{tech}</span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </>
        )}

        {/* GitHub CTA */}
        <AnimatedSection>
          <div className="text-center mt-16">
            <a
              href="https://github.com/Edward-0528/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-green-400 text-green-400 hover:bg-green-400/10 font-medium py-3 px-8 rounded transition-colors duration-200 text-sm"
            >
              <FiGithub className="mr-2" size={16} />
              See more on GitHub
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Projects;
