import React, { useEffect, useRef, useState } from 'react';
import AnimatedSection from './AnimatedSection';

// Count-up hook: animates from 0 to `target` when the element enters the viewport
const useCountUp = (target, duration = 1800) => {
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

const About = () => {
  const versions = useCountUp(80);
  const stores = useCountUp(2);
  const certs = useCountUp(4);
  const leadership = useCountUp(7);

  return (
    <section id="about" className="py-24 bg-surface-alt">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center mb-14">
            <h2 className="text-2xl font-bold text-text-primary whitespace-nowrap">
              <span className="text-accent font-mono text-lg mr-2">01.</span>
              About Me
            </h2>
            <div className="ml-6 h-px bg-gray-200 flex-grow max-w-xs" />
          </div>
        </AnimatedSection>

        {/* ── Apple-style bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">

          {/* Bento 1 — Intro blurb (large, spans 2 cols) */}
          <AnimatedSection className="md:col-span-2 lg:col-span-2" delay={0.05}>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 h-full">
              <h3 className="text-xl font-bold text-text-primary mb-4">I build products, not just projects.</h3>
              <p className="text-text-secondary leading-relaxed text-[15px]">
                I'm a full-stack software engineer who independently designed, built, and shipped{' '}
                <span className="text-accent-600 font-medium">Core+</span> — an AI-powered nutrition & fitness app —
                to both the Apple App Store and Google Play Store. I own the entire stack: from database schema to
                App Store screenshot design.
              </p>
              <p className="text-text-secondary leading-relaxed text-[15px] mt-4">
                Before engineering, I spent 7+ years leading retail teams at T-Mobile, where I developed a data-driven
                mindset around KPIs and conversion metrics — skills I now bring directly to product development.
              </p>
            </div>
          </AnimatedSection>

          {/* Bento 2 — Animated metric: Versions shipped */}
          <AnimatedSection delay={0.1}>
            <div className="bg-gradient-to-br from-accent-50 to-accent-100/60 border border-accent-200/60 rounded-2xl p-6 shadow-soft hover:shadow-card tilt-card h-full flex flex-col justify-between">
              <p className="text-accent-600 text-xs font-mono uppercase tracking-wider mb-3">Shipped</p>
              <div ref={versions.ref}>
                <p className="text-5xl font-bold text-accent font-mono">{versions.count}+</p>
              </div>
              <p className="text-text-secondary text-sm mt-2">App versions via EAS CI/CD</p>
            </div>
          </AnimatedSection>

          {/* Bento 3 — Animated metric: App Stores */}
          <AnimatedSection delay={0.15}>
            <div className="bg-gradient-to-br from-warm-50 to-warm-100/50 border border-warm-200/60 rounded-2xl p-6 shadow-soft hover:shadow-card tilt-card h-full flex flex-col justify-between">
              <p className="text-warm-500 text-xs font-mono uppercase tracking-wider mb-3">Platforms</p>
              <div ref={stores.ref}>
                <p className="text-5xl font-bold text-warm font-mono">{stores.count}</p>
              </div>
              <p className="text-text-secondary text-sm mt-2">App Store + Google Play</p>
            </div>
          </AnimatedSection>

          {/* Bento 4 — Tech stack (spans 2 cols) */}
          <AnimatedSection className="md:col-span-2" delay={0.2}>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 h-full">
              <p className="text-text-secondary text-sm mb-4 font-medium">Technologies I work with daily</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'JavaScript', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                  { name: 'TypeScript', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                  { name: 'React / React Native', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
                  { name: 'Node.js', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                  { name: 'Supabase / PostgreSQL', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                  { name: 'Tailwind CSS', color: 'bg-sky-50 text-sky-700 border-sky-200' },
                  { name: 'Python', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
                  { name: 'Google Gemini API', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                  { name: 'Git & GitHub', color: 'bg-gray-50 text-gray-700 border-gray-200' },
                ].map((tech) => (
                  <span key={tech.name} className={`text-xs font-mono px-3 py-1.5 rounded-full border ${tech.color}`}>
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Bento 5 — Certifications count */}
          <AnimatedSection delay={0.25}>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-soft hover:shadow-card tilt-card h-full flex flex-col justify-between">
              <p className="text-text-secondary text-xs font-mono uppercase tracking-wider mb-3">Certified</p>
              <div ref={certs.ref}>
                <p className="text-5xl font-bold text-text-primary font-mono">{certs.count}</p>
              </div>
              <p className="text-text-secondary text-sm mt-2">Professional certifications</p>
            </div>
          </AnimatedSection>

          {/* Bento 6 — Leadership years */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-soft hover:shadow-card tilt-card h-full flex flex-col justify-between">
              <p className="text-text-secondary text-xs font-mono uppercase tracking-wider mb-3">Leadership</p>
              <div ref={leadership.ref}>
                <p className="text-5xl font-bold text-text-primary font-mono">{leadership.count}+</p>
              </div>
              <p className="text-text-secondary text-sm mt-2">Years managing teams at T-Mobile</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
