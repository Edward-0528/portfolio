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
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center mb-16">
            <h2 className="text-2xl font-bold text-text-primary whitespace-nowrap">
              <span className="text-accent font-mono text-lg mr-2">04.</span>
              Experience & Certifications
            </h2>
            <div className="ml-6 h-px bg-gray-200 flex-grow max-w-xs" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Experience — wider */}
          <div className="lg:col-span-3 space-y-10">
            {/* "Now" marker at top of timeline */}
            <div className="flex items-center gap-3 pl-6">
              <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse ring-4 ring-accent-100 -ml-[5px]" />
              <span className="text-accent text-xs font-mono font-medium tracking-wide">Currently Building</span>
            </div>
            {experience.map((job, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="relative pl-6 border-l border-gray-200">
                  <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-accent' : 'bg-gray-300'}`} />
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-sm font-mono text-accent">{job.period}</p>
                    {idx === 0 && (
                      <span className="text-[10px] font-mono bg-accent-soft text-accent-600 border border-accent-200 px-2 py-0.5 rounded-full">
                        Present
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    {job.role}{' '}
                    <span className="text-text-secondary font-normal">@ {job.company}</span>
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {job.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start text-sm text-text-secondary leading-relaxed">
                        <span className="text-accent mr-3 mt-1 text-xs flex-shrink-0">▹</span>
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
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card">
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
