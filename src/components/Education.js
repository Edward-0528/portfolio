import React from 'react';
import AnimatedSection from './AnimatedSection';
import CredlyBadges from './CredlyBadges';

const Education = () => {
  const experience = [
    {
      role: 'Lead Full-Stack Developer',
      company: 'Core+',
      period: 'Sept 2025 — Present',
      bullets: [
        'Independently designed, developed, and deployed an AI-powered fitness application to the Apple App Store and Google Play Store.',
        'Integrated Google Gemini 2.5 Flash API for real-time, camera-based food recognition using Generative AI.',
        'Built a scalable REST-based backend with Supabase and PostgreSQL, enforcing data integrity via row-level security.',
        'Optimized development velocity by shipping 80+ app versions through automated EAS Build and EAS Submit CI/CD pipelines.',
        'Implemented A/B testing for feature tiers and utilized RevenueCat to manage monetization and track conversion metrics.',
      ],
    },
    {
      role: 'Store Manager',
      company: 'T-Mobile',
      period: '2018 — Present',
      bullets: [
        'Leveraged performance KPIs to drive data-driven decision-making, optimizing team output and customer conversion rates.',
        'Led a diverse team in a high-pressure environment, translating complex technical service issues for non-technical audiences.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-[#0a0a14]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center mb-16">
            <h2 className="text-2xl font-bold text-white whitespace-nowrap">
              <span className="text-green-400 font-mono text-lg mr-2">04.</span>
              Experience & Certifications
            </h2>
            <div className="ml-6 h-px bg-gray-700 flex-grow max-w-xs" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Experience — wider */}
          <div className="lg:col-span-3 space-y-10">
            {/* "Now" marker at top of timeline */}
            <div className="flex items-center gap-3 pl-6">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse ring-4 ring-green-400/20 -ml-[5px]" />
              <span className="text-green-400 text-xs font-mono font-medium tracking-wide">Currently Building</span>
            </div>
            {experience.map((job, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="relative pl-6 border-l border-gray-700">
                  <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-green-400' : 'bg-gray-600'}`} />
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-sm font-mono text-green-400">{job.period}</p>
                    {idx === 0 && (
                      <span className="text-[10px] font-mono bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full">
                        Present
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {job.role}{' '}
                    <span className="text-gray-400 font-normal">@ {job.company}</span>
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {job.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-400 leading-relaxed">
                        <span className="text-green-400 mr-3 mt-1 text-xs flex-shrink-0">▹</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Certifications & Live Credly Badges */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Credly feed */}
            <AnimatedSection delay={0.1}>
              <div className="bg-[#1a1a2e] border border-white/5 rounded-xl p-6">
                <CredlyBadges />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
