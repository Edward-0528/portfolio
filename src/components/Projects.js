import React from 'react';
import AnimatedSection from './AnimatedSection';
import { FiGithub, FiExternalLink, FiCamera, FiActivity, FiShield, FiShoppingBag, FiUsers, FiPlay, FiCheck, FiAward } from 'react-icons/fi';

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
    title: 'Ladle',
    subtitle: 'Real-Time Interactive Quiz Platform',
    category: 'Full-Stack Web',
    description:
      'A full-stack, real-time multiplayer quiz platform — like Kahoot! — built for teachers, managers, and team leads. Players join via game code or QR link and answer simultaneously with live scoring and leaderboards. Features a step-by-step quiz builder, Firebase Auth (email + Google), persistent Firestore storage, and Socket.IO-powered real-time gameplay with Zod-validated events.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'Socket.IO', 'Express 5', 'Firebase', 'Firestore', 'Zod'],
    image: null,
    github: 'https://github.com/Edward-0528/Laddle',
    live: 'https://ladle.netlify.app',
    featured: true,
    highlights: [
      'Real-time multiplayer via Socket.IO with server-side Zod validation',
      'Firebase Auth + Firestore for persistent quiz storage',
      'Code-split lazy routes for fast initial loads',
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
    <div className="absolute w-64 h-80 bg-accent-200/30 rounded-full blur-3xl" />

    {/* Phone frame */}
    <div className="relative w-[220px] bg-white rounded-[36px] border-2 border-gray-200 shadow-card overflow-hidden">
      {/* Notch */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-20 h-1.5 bg-gray-200 rounded-full" />
      </div>

      {/* Status bar */}
      <div className="flex justify-between items-center px-5 py-1">
        <span className="text-text-secondary text-[9px] font-mono">9:41</span>
        <div className="flex space-x-1">
          <div className="w-3 h-1.5 bg-gray-300 rounded-sm" />
          <div className="w-1 h-1.5 bg-accent/60 rounded-sm" />
        </div>
      </div>

      {/* App header */}
      <div className="px-4 pt-2 pb-3 flex items-center justify-between">
        <div>
          <span className="text-accent font-bold text-sm tracking-wide">CORE</span>
          <span className="text-text-primary font-bold text-sm">+</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-accent-soft border border-accent-200 flex items-center justify-center">
          <span className="text-accent-600 text-[8px] font-bold">PRO</span>
        </div>
      </div>

      {/* Calorie ring */}
      <div className="flex flex-col items-center py-3">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="40" fill="none" stroke="#E2E8F0" strokeWidth="6" />
            <circle cx="48" cy="48" r="40" fill="none" stroke="#6BA4D4" strokeWidth="6"
              strokeDasharray="251.2" strokeDashoffset="75" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-text-primary font-bold text-lg leading-none">1,847</span>
            <span className="text-text-secondary text-[9px]">/ 2,200 kcal</span>
          </div>
        </div>
        {/* Macros row */}
        <div className="flex space-x-4 mt-3">
          {[['P', '142g', '#6BA4D4'], ['C', '198g', '#60a5fa'], ['F', '54g', '#f59e0b']].map(([label, val, color]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-[8px] font-mono" style={{ color }}>{label}</span>
              <span className="text-text-primary text-[10px] font-semibold">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Scan button */}
      <div className="mx-4 mb-3">
        <div className="bg-accent-soft border border-accent-200 rounded-xl p-2.5 flex items-center space-x-2">
          <div className="w-6 h-6 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FiCamera size={11} className="text-accent-600" />
          </div>
          <div>
            <p className="text-text-primary text-[9px] font-semibold">AI Meal Scan</p>
            <p className="text-text-secondary text-[8px]">Snap a photo · instant macros</p>
          </div>
          <div className="ml-auto w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
        </div>
      </div>

      {/* Recent meals */}
      <div className="px-4 pb-2">
        <p className="text-gray-400 text-[8px] font-mono uppercase tracking-wider mb-1.5">Today's Log</p>
        {[
          { meal: 'Grilled Chicken Bowl', cal: '520 kcal', grade: 'A' },
          { meal: 'Greek Yogurt + Berries', cal: '210 kcal', grade: 'A' },
          { meal: 'Protein Shake', cal: '180 kcal', grade: 'B+' },
        ].map(({ meal, cal, grade }) => (
          <div key={meal} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
            <div className="flex items-center space-x-1.5">
              <FiActivity size={8} className="text-accent/60 flex-shrink-0" />
              <span className="text-text-secondary text-[8px] truncate max-w-[100px]">{meal}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-gray-400 text-[8px] font-mono">{cal}</span>
              <span className="text-accent-600 text-[8px] font-bold font-mono">{grade}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around items-center px-4 py-3 border-t border-gray-100 mt-1">
        {[FiActivity, FiCamera, FiShield].map((Icon, i) => (
          <div key={i} className={`flex flex-col items-center ${i === 1 ? 'text-accent' : 'text-gray-300'}`}>
            <Icon size={12} />
          </div>
        ))}
      </div>

      {/* Home bar */}
      <div className="flex justify-center pb-2">
        <div className="w-16 h-1 bg-gray-200 rounded-full" />
      </div>
    </div>

    {/* Floating badge — App Store */}
    <div className="absolute -right-2 top-12 bg-white border border-warm-200 rounded-xl px-3 py-2 shadow-card animate-pulse-glow">
      <p className="text-[9px] text-warm-500 font-mono">Available on</p>
      <p className="text-text-primary text-[10px] font-semibold">App Store &amp;</p>
      <p className="text-text-primary text-[10px] font-semibold">Google Play</p>
    </div>

    {/* Floating badge — AI */}
    <div className="absolute -left-2 bottom-16 bg-white border border-accent-200 rounded-xl px-3 py-2 shadow-card animate-pulse-glow">
      <p className="text-accent-600 text-[9px] font-mono font-semibold">Gemini AI</p>
      <p className="text-text-secondary text-[9px]">Food recognition</p>
    </div>
  </div>
);

// Browser chrome mockup wrapper
const BrowserMockup = ({ children, url }) => (
  <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
    {/* Browser chrome */}
    <div className="flex items-center gap-2 px-4 py-3 bg-surface-alt border-b border-gray-100">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 bg-red-400 rounded-full" />
        <div className="w-3 h-3 bg-yellow-400 rounded-full" />
        <div className="w-3 h-3 bg-green-400 rounded-full" />
      </div>
      <div className="flex-1 mx-3 bg-white rounded-md px-3 py-1 border border-gray-200">
        <span className="text-gray-400 text-[10px] font-mono">{url}</span>
      </div>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// Ladle quiz platform mockup
const LadleMockup = () => (
  <BrowserMockup url="ladle.netlify.app">
    <div className="space-y-3">
      {/* Game header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold text-sm tracking-wide">L</span>
          <span className="text-text-primary font-bold text-xs">Ladle</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-600 text-[8px] font-mono font-semibold">LIVE</span>
        </div>
      </div>

      {/* Question card */}
      <div className="bg-gradient-to-br from-accent-100 to-accent-50 border border-accent-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-accent-600 font-mono">Question 3 of 10</span>
          <span className="text-[9px] text-warm-500 font-mono font-bold">0:12</span>
        </div>
        <p className="text-text-primary text-xs font-semibold leading-snug">
          Which protocol enables real-time bidirectional communication between client and server?
        </p>
      </div>

      {/* Answer options grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { label: 'HTTP', color: 'bg-red-50 border-red-200', text: 'text-red-600' },
          { label: 'WebSocket', color: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-600', correct: true },
          { label: 'FTP', color: 'bg-blue-50 border-blue-200', text: 'text-blue-600' },
          { label: 'SMTP', color: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-600' },
        ].map((opt) => (
          <div key={opt.label} className={`${opt.color} border rounded-lg p-2 text-center relative ${opt.correct ? 'ring-2 ring-emerald-400' : ''}`}>
            <span className={`text-[10px] font-semibold ${opt.text}`}>{opt.label}</span>
            {opt.correct && <FiCheck size={8} className="absolute top-1 right-1 text-emerald-500" />}
          </div>
        ))}
      </div>

      {/* Live leaderboard */}
      <div className="bg-surface-alt rounded-xl p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <FiAward size={9} className="text-warm-500" />
          <p className="text-[9px] text-text-secondary font-mono uppercase tracking-wider">Leaderboard</p>
        </div>
        {[
          { name: 'Player 1', score: 2400, rank: '🥇' },
          { name: 'Player 2', score: 2100, rank: '🥈' },
          { name: 'Player 3', score: 1800, rank: '🥉' },
        ].map((p) => (
          <div key={p.name} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px]">{p.rank}</span>
              <span className="text-text-secondary text-[9px]">{p.name}</span>
            </div>
            <span className="text-accent text-[9px] font-mono font-bold">{p.score.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Players connected */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1">
          <FiUsers size={9} className="text-accent" />
          <span className="text-[9px] text-text-secondary font-mono">12 players</span>
        </div>
        <div className="flex items-center gap-1">
          <FiPlay size={9} className="text-accent" />
          <span className="text-[9px] text-text-secondary font-mono">Game #4F82</span>
        </div>
      </div>
    </div>
  </BrowserMockup>
);

// WeatherApp mockup
const WeatherAppMockup = () => (
  <BrowserMockup url="weatherappedward.netlify.app">
    <div className="space-y-3">
      {/* Main weather card */}
      <div className="bg-gradient-to-br from-accent-100 to-accent-50 border border-accent-200 rounded-xl p-4 text-center">
        <p className="text-text-secondary text-[10px] font-mono mb-1">San Francisco, CA</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl">⛅</span>
          <span className="text-text-primary text-4xl font-bold font-mono">72°</span>
        </div>
        <p className="text-accent-600 text-xs mt-1">Partly Cloudy</p>
        <div className="flex justify-center gap-4 mt-3">
          <span className="text-[9px] text-text-secondary">H: 76° · L: 58°</span>
          <span className="text-[9px] text-text-secondary">💧 62%</span>
          <span className="text-[9px] text-text-secondary">💨 12 mph</span>
        </div>
      </div>
      {/* 5-day forecast */}
      <div className="grid grid-cols-5 gap-1">
        {[
          { day: 'Mon', icon: '☀️', hi: '78', lo: '60' },
          { day: 'Tue', icon: '🌤', hi: '74', lo: '57' },
          { day: 'Wed', icon: '🌧', hi: '65', lo: '52' },
          { day: 'Thu', icon: '⛅', hi: '70', lo: '55' },
          { day: 'Fri', icon: '☀️', hi: '80', lo: '62' },
        ].map((d) => (
          <div key={d.day} className="bg-surface-alt rounded-lg p-2 text-center">
            <p className="text-[8px] text-text-secondary font-mono">{d.day}</p>
            <span className="text-base">{d.icon}</span>
            <p className="text-[8px] text-text-primary font-mono">{d.hi}°</p>
            <p className="text-[8px] text-gray-400 font-mono">{d.lo}°</p>
          </div>
        ))}
      </div>
    </div>
  </BrowserMockup>
);

// E-Commerce mockup
const EcommerceMockup = () => (
  <BrowserMockup url="ecomedward.netlify.app">
    <div className="space-y-3">
      {/* Product grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: 'Wireless Headphones', price: '$89.99', badge: 'Sale', emoji: '🎧' },
          { name: 'Smart Watch', price: '$199.99', badge: 'New', emoji: '⌚' },
          { name: 'Laptop Stand', price: '$45.00', badge: null, emoji: '💻' },
          { name: 'Mechanical Keyboard', price: '$129.99', badge: 'Popular', emoji: '⌨️' },
        ].map((p) => (
          <div key={p.name} className="bg-surface-alt border border-gray-100 rounded-lg p-3 relative">
            {p.badge && (
              <span className="absolute top-2 right-2 bg-accent-soft text-accent-600 text-[8px] font-mono px-1.5 py-0.5 rounded">{p.badge}</span>
            )}
            <div className="text-2xl mb-1">{p.emoji}</div>
            <p className="text-text-primary text-[9px] font-medium leading-tight">{p.name}</p>
            <p className="text-accent text-[10px] font-mono font-bold mt-1">{p.price}</p>
            <div className="mt-2 bg-accent-soft border border-accent-200 rounded px-2 py-0.5 text-center">
              <span className="text-accent-600 text-[8px] font-semibold">Add to Cart</span>
            </div>
          </div>
        ))}
      </div>
      {/* Cart indicator */}
      <div className="flex items-center justify-between bg-surface-alt rounded-lg px-3 py-2">
        <div className="flex items-center gap-2">
          <FiShoppingBag size={12} className="text-accent" />
          <span className="text-text-secondary text-[10px]">2 items in cart</span>
        </div>
        <span className="text-accent text-[10px] font-mono font-bold">$235.98</span>
      </div>
    </div>
  </BrowserMockup>
);

const PROJECT_MOCKUPS = {
  'Ladle': LadleMockup,
  'Weather App': WeatherAppMockup,
  'E-Commerce Platform': EcommerceMockup,
};

const Projects = () => {
  const featured = FALLBACK_PROJECTS.filter((p) => p.featured);
  const other = FALLBACK_PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center mb-16">
            <h2 className="text-2xl font-bold text-text-primary whitespace-nowrap">
              <span className="text-accent font-mono text-lg mr-2">02.</span>
              Things I've Built
            </h2>
            <div className="ml-6 h-px bg-gray-200 flex-grow max-w-xs" />
          </div>
        </AnimatedSection>

        {/* Featured projects — large cards */}
        <div className="space-y-20 mb-24">
          {featured.map((project, idx) => (
            <AnimatedSection key={project.id} delay={0.1}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                {/* Mockup / image side */}
                <div className="bg-gradient-to-br from-accent-50 to-accent-100/50 border border-gray-200 rounded-2xl overflow-hidden flex items-center justify-center min-h-[400px] shadow-soft group-hover:shadow-glow-blue transition-all duration-500">
                  {project.title === 'Core+' ? (
                    <CorePlusMockup />
                  ) : PROJECT_MOCKUPS[project.title] ? (
                    React.createElement(PROJECT_MOCKUPS[project.title])
                  ) : (
                    <span className="text-6xl font-bold text-gray-100 select-none">{project.title}</span>
                  )}
                </div>

                {/* Text side */}
                <div>
                  <p className="text-accent font-mono text-sm mb-2">{project.subtitle || 'Featured Project'}</p>
                  <h3 className="text-3xl font-bold text-text-primary mb-5">{project.title}</h3>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                    <p className="text-text-secondary text-sm leading-relaxed">{project.description}</p>
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start text-sm text-text-secondary">
                            <span className="text-accent mr-2 mt-0.5 text-xs">▹</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs font-mono text-text-secondary bg-surface-alt px-2 py-1 rounded">{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.github && project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
                        <FiGithub size={20} />
                      </a>
                    )}
                    {project.live && project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors">
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
              <h3 className="text-xl font-semibold text-text-primary text-center mb-10">
                Other Noteworthy Projects
              </h3>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {other.map((project) => {
                const MockupComponent = PROJECT_MOCKUPS[project.title];
                return (
                <AnimatedSection key={project.id} delay={0.05}>
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col hover:border-accent-300 transition-all duration-300 group shadow-soft hover:shadow-card tilt-card">
                    {/* Visual preview */}
                    {MockupComponent && (
                      <div className="bg-surface-alt border-b border-gray-100 px-4 pt-4 pb-2 overflow-hidden max-h-52 pointer-events-none select-none opacity-90 group-hover:opacity-100 transition-opacity">
                        <div className="transform scale-[0.72] origin-top">
                          <MockupComponent />
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Top row */}
                      <div className="flex justify-between items-center mb-4">
                        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <div className="flex space-x-3">
                          {project.github && project.github !== '#' && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                              <FiGithub size={18} />
                            </a>
                          )}
                          {project.live && project.live !== '#' && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                              <FiExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">{project.title}</h4>
                      <p className="text-text-secondary text-sm leading-relaxed flex-grow mb-5">{project.description}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-xs font-mono text-gray-400">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
                );
              })}
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
              className="inline-flex items-center border border-accent text-accent hover:bg-accent-50 font-medium py-3 px-8 rounded-full transition-colors duration-200 text-sm"
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
