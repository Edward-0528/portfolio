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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
};

const StatItem = ({ target, suffix = '', label }) => {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} className="flex items-baseline space-x-3">
      <span className="text-3xl font-bold text-green-400 font-mono tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-gray-400 text-sm">{label}</span>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#0a0a14]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center mb-12">
            <h2 className="text-2xl font-bold text-white whitespace-nowrap">
              <span className="text-green-400 font-mono text-lg mr-2">01.</span>
              About Me
            </h2>
            <div className="ml-6 h-px bg-gray-700 flex-grow max-w-xs" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left — Text (2 cols wide) */}
          <AnimatedSection className="lg:col-span-2 space-y-5" delay={0.1}>
            <p className="text-gray-400 leading-relaxed text-lg">
              I'm a full-stack software engineer with a focus on mobile and web development.
              My flagship project is{' '}
              <span className="text-green-400 font-medium">Core+</span>, an AI-powered nutrition and
              fitness tracker that I independently designed, built, and shipped to both the
              Apple App Store and Google Play Store.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              I leverage the{' '}
              <span className="text-white font-medium">Google Gemini API</span> for real-time
              camera-based food recognition, built a scalable REST backend with{' '}
              <span className="text-white font-medium">Supabase & PostgreSQL</span>, and maintain
              a rapid CI/CD pipeline that has shipped{' '}
              <span className="text-white font-medium">80+ app versions</span> using EAS Build.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              Before engineering, I spent 7+ years leading retail teams at T-Mobile, where I
              developed a data-driven mindset around KPIs, conversion metrics, and
              cross-functional collaboration — skills I now bring directly to product development.
            </p>

            {/* Quick tech list */}
            <div className="pt-4">
              <p className="text-gray-400 mb-4">Technologies I work with daily:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                {[
                  'JavaScript (ES6+)',
                  'TypeScript',
                  'React / React Native',
                  'Node.js',
                  'Supabase / PostgreSQL',
                  'Tailwind CSS',
                  'Python (Foundational)',
                  'Google Gemini API',
                  'Git & GitHub',
                ].map((tech) => (
                  <span key={tech} className="flex items-center text-sm text-gray-300">
                    <span className="text-green-400 mr-2 text-xs">▹</span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Animated metrics card */}
          <AnimatedSection delay={0.2}>
            <div className="bg-[#1a1a2e] border border-white/5 rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">By the Numbers</h3>
              <div className="space-y-5">
                <StatItem target={80} suffix="+" label="App versions shipped via CI/CD" />
                <StatItem target={2} label="App Stores (iOS + Android)" />
                <StatItem target={4} label="Professional certifications" />
                <StatItem target={7} suffix="+" label="Years of leadership experience" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
