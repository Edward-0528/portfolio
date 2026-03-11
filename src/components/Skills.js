import React from 'react';
import AnimatedSection from './AnimatedSection';

const skillCategories = [
  {
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'SQL', 'Python'],
  },
  {
    title: 'Frameworks & Libraries',
    items: ['React', 'React Native', 'Expo', 'Node.js', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    title: 'Back-End & Data',
    items: ['Supabase', 'PostgreSQL', 'REST APIs', 'Row-Level Security', 'PKCE Auth'],
  },
  {
    title: 'AI & Analytics',
    items: ['Google Gemini API', 'Generative AI', 'Prompt Engineering', 'A/B Testing', 'Analytics'],
  },
  {
    title: 'Tools & DevOps',
    items: ['Git', 'GitHub', 'EAS Build CI/CD', 'RevenueCat', 'Apple HealthKit', 'Google Health Connect'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-[#0f0f1a]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center mb-16">
            <h2 className="text-2xl font-bold text-white whitespace-nowrap">
              <span className="text-green-400 font-mono text-lg mr-2">03.</span>
              Skills & Technologies
            </h2>
            <div className="ml-6 h-px bg-gray-700 flex-grow max-w-xs" />
          </div>
        </AnimatedSection>

        {/* Skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <AnimatedSection key={cat.title} delay={idx * 0.05}>
              <div className="bg-[#1a1a2e] border border-white/5 rounded-xl p-6 h-full hover:border-green-400/20 transition-colors duration-300">
                <h3 className="text-sm font-mono text-green-400 mb-4 uppercase tracking-wider">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
