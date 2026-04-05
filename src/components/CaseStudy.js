import React, { useState, useRef, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import { FiChevronDown, FiChevronUp, FiGithub, FiExternalLink, FiStar, FiSmartphone, FiCpu, FiDatabase, FiLayers, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

/* ── Count-up hook ── */
const useCountUp = (target, duration = 1600) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
};

/* ── Version timeline milestones ── */
const MILESTONES = [
  { version: 'v1.0', title: 'MVP Launch', desc: 'Manual food entry, basic calorie tracking, user authentication with Supabase.', date: 'Sept 2025' },
  { version: 'v1.5', title: 'AI Camera Scan', desc: 'Integrated Google Gemini 2.5 Flash for real-time camera-based food recognition.', date: 'Oct 2025' },
  { version: 'v1.10', title: 'Health Profiles', desc: 'Specialized profiles for diabetes, heart health, kidney health with tailored nutrition grades.', date: 'Nov 2025' },
  { version: 'v1.15', title: 'Monetization', desc: 'RevenueCat integration, A/B tested subscription tiers and paywalls for conversion optimization.', date: 'Dec 2025' },
  { version: 'v1.20', title: 'Health Sync', desc: 'Apple HealthKit & Google Health Connect integration for workout calorie import.', date: 'Jan 2026' },
  { version: 'v1.30', title: 'Polish & Scale', desc: 'Barcode scanner, water tracking, weekly reports, streaks & achievements, bug fixes.', date: 'Feb 2026' },
];

/* ── Architecture nodes ── */
const ARCH_NODES = [
  { label: 'React Native', sublabel: 'Expo + TypeScript', icon: FiSmartphone, color: 'bg-blue-50 border-blue-200 text-blue-600' },
  { label: 'Gemini 2.5 Flash', sublabel: 'AI Food Analysis', icon: FiCpu, color: 'bg-purple-50 border-purple-200 text-purple-600' },
  { label: 'Supabase', sublabel: 'Auth + PostgreSQL', icon: FiDatabase, color: 'bg-emerald-50 border-emerald-200 text-emerald-600' },
  { label: 'RevenueCat', sublabel: 'Subscriptions', icon: FiLayers, color: 'bg-amber-50 border-amber-200 text-amber-600' },
  { label: 'EAS Build', sublabel: 'CI/CD Pipeline', icon: FiTrendingUp, color: 'bg-rose-50 border-rose-200 text-rose-600' },
];

/* ── Accordion step data ── */
const STEPS = [
  {
    phase: '01',
    title: 'The Problem',
    icon: '�',
    color: 'border-rose-200 bg-rose-50',
    accentColor: 'text-rose-500',
    content:
      'Existing nutrition apps were either too complex (MyFitnessPal with its overwhelming UI) or too basic with no intelligence. None offered AI-powered meal recognition with real-time camera scanning, specialized health profiles (diabetes, kidney, heart health), and a letter-grade nutrition scoring system — all in a single, polished mobile app. I set out to build the app I wanted but couldn\'t find.',
  },
  {
    phase: '02',
    title: 'Architecture & Tech Stack',
    icon: '⚙️',
    color: 'border-accent-200 bg-accent-50',
    accentColor: 'text-accent-600',
    content:
      'Built a full React Native + Expo app with TypeScript for type safety. The backend uses Supabase + PostgreSQL with Row-Level Security for per-user data isolation. The AI pipeline streams images to Google Gemini 2.5 Flash via REST, which returns structured JSON (macros, micros, allergens, grade). RevenueCat handles subscription state across iOS and Android with a single API. EAS Build automates CI/CD for both platforms.',
    showArch: true,
  },
  {
    phase: '03',
    title: 'Shipped & Iterated',
    icon: '🚀',
    color: 'border-emerald-200 bg-emerald-50',
    accentColor: 'text-emerald-500',
    content:
      'Shipped to both the Apple App Store and Google Play Store as a solo developer. Implemented automated EAS Build + EAS Submit CI/CD pipelines, enabling rapid iteration across 80+ versions. A/B tested subscription tiers and paywalls to optimize conversion. Achieved a 5.0 App Store rating from day one.',
  },
];

const CaseStudy = () => {
  const [expanded, setExpanded] = useState(null);
  const toggle = (idx) => setExpanded(expanded === idx ? null : idx);

  // Count-up hooks for at-a-glance metrics
  const versions = useCountUp(80);
  const stores = useCountUp(2);
  const rating = useCountUp(5);
  const size = useCountUp(69);

  return (
    <section id="case-study" className="py-24 bg-surface-alt">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* ── Hero Banner ── */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-accent font-mono text-sm tracking-wide">Case Study</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mt-3 mb-4">
              How I Built Core+
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              A behind-the-scenes look at the engineering decisions, architecture, iteration process,
              and real-world metrics for my flagship product.
            </p>
          </div>
        </AnimatedSection>

        {/* ── At a Glance — Key Metrics ── */}
        <AnimatedSection delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { ref: versions.ref, value: versions.count, suffix: '+', label: 'Versions Shipped', sublabel: 'via EAS CI/CD' },
              { ref: stores.ref, value: stores.count, suffix: '', label: 'App Stores', sublabel: 'iOS & Android' },
              { ref: rating.ref, value: rating.count, suffix: '.0 ★', label: 'App Store Rating', sublabel: '5.0 out of 5' },
              { ref: size.ref, value: size.count, suffix: ' MB', label: 'App Size', sublabel: 'Optimized bundle' },
            ].map((stat, i) => (
              <div key={i} ref={stat.ref} className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-soft hover:shadow-card transition-shadow">
                <p className="text-3xl font-bold text-accent font-mono">{stat.value}{stat.suffix}</p>
                <p className="text-text-primary text-sm font-medium mt-1">{stat.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Deep-Dive Accordion ── */}
        <div className="space-y-4 mb-16">
          {STEPS.map((step, idx) => (
            <AnimatedSection key={step.phase} delay={idx * 0.08}>
              <div
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${step.color} cursor-pointer`}
                onClick={() => toggle(idx)}
              >
                {/* Header row */}
                <div className="flex items-center justify-between px-6 py-5">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <p className={`text-xs font-mono ${step.accentColor} mb-0.5`}>Phase {step.phase}</p>
                      <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {expanded === idx ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                  </div>
                </div>

                {/* Expandable body */}
                {expanded === idx && (
                  <div className="px-6 pb-6 border-t border-gray-200/50">
                    <p className="text-text-secondary text-sm leading-relaxed mt-4">{step.content}</p>

                    {/* Architecture diagram */}
                    {step.showArch && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {ARCH_NODES.map((node, i) => (
                          <React.Fragment key={node.label}>
                            <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 ${node.color}`}>
                              <node.icon size={16} />
                              <div>
                                <p className="text-sm font-semibold leading-tight">{node.label}</p>
                                <p className="text-[10px] opacity-70">{node.sublabel}</p>
                              </div>
                            </div>
                            {i < ARCH_NODES.length - 1 && (
                              <div className="flex items-center text-gray-300 text-sm font-mono self-center">→</div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── Revision History Timeline ── */}
        <AnimatedSection delay={0.1}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">Revision History</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px" />

              <div className="space-y-8">
                {MILESTONES.map((m, idx) => (
                  <AnimatedSection key={m.version} delay={idx * 0.06}>
                    <div className={`relative flex items-start gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full border-2 border-white shadow-sm -translate-x-1.5 mt-1.5 z-10" />

                      {/* Content card */}
                      <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-soft hover:shadow-card transition-shadow">
                          <div className={`flex items-center gap-2 mb-2 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                            <span className="text-accent font-mono text-sm font-bold">{m.version}</span>
                            <span className="text-gray-400 text-xs font-mono">· {m.date}</span>
                          </div>
                          <h4 className="text-text-primary font-semibold mb-1">{m.title}</h4>
                          <p className="text-text-secondary text-sm leading-relaxed">{m.desc}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── App Store Metrics ── */}
        <AnimatedSection delay={0.15}>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-card mb-16">
            <h3 className="text-xl font-bold text-text-primary mb-6 text-center">App Store Presence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Rating card */}
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-5 text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} size={18} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-2xl font-bold text-text-primary font-mono">5.0</p>
                <p className="text-text-secondary text-sm mt-1">App Store Rating</p>
              </div>

              {/* Category */}
              <div className="bg-surface-alt border border-gray-200 rounded-xl p-5 text-center">
                <p className="text-3xl mb-2">🏃</p>
                <p className="text-text-primary font-semibold">Health & Fitness</p>
                <p className="text-text-secondary text-sm mt-1">App Store Category</p>
              </div>

              {/* Features */}
              <div className="bg-surface-alt border border-gray-200 rounded-xl p-5">
                <p className="text-text-primary font-semibold mb-3 text-center">Key Features</p>
                <div className="space-y-2">
                  {['AI Food Recognition', 'Barcode Scanner', 'Apple HealthKit Sync', 'In-App Purchases'].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <FiCheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── What I Learned ── */}
        <AnimatedSection delay={0.2}>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-soft mb-12">
            <h3 className="text-xl font-bold text-text-primary mb-4">What I Learned</h3>
            <p className="text-text-secondary leading-relaxed">
              Building Core+ solo taught me that shipping is a skill in itself. I learned to make pragmatic architecture 
              decisions — choosing Supabase over a custom backend cut months of work. I learned that A/B testing isn't 
              optional for monetization, that CI/CD pipelines pay for themselves after the third deploy, and that a 
              well-scoped MVP with one killer feature (AI camera scan) beats a bloated v1.0 every time. Most importantly, 
              I learned that owning the full stack — from database schema to App Store screenshot design — gives you 
              an unmatched understanding of the product.
            </p>
          </div>
        </AnimatedSection>

        {/* ── CTAs ── */}
        <AnimatedSection delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://apps.apple.com/us/app/core-calorie-macro-tracker/id6752533436"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-600 font-semibold py-3 px-8 rounded-full transition-colors text-sm shadow-soft"
            >
              <FiExternalLink size={15} />
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.edwardg.coreplus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent-50 font-medium py-3 px-8 rounded-full transition-colors text-sm"
            >
              <FiExternalLink size={15} />
              Google Play
            </a>
            <a
              href="https://github.com/Edward-0528/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-200 text-text-secondary hover:border-accent-300 hover:text-accent font-medium py-3 px-8 rounded-full transition-colors text-sm bg-white shadow-soft"
            >
              <FiGithub size={15} />
              GitHub
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CaseStudy;
