import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

// Proficiency levels: 3 = Expert, 2 = Proficient, 1 = Familiar
const skillCategories = [
  {
    title: 'Languages',
    icon: '{ }',
    skills: [
      { name: 'JavaScript', level: 3, project: '#projects' },
      { name: 'TypeScript', level: 3, project: '#projects' },
      { name: 'SQL', level: 3, project: '#projects' },
      { name: 'Python', level: 1, project: null },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: '⬡',
    skills: [
      { name: 'React', level: 3, project: '#projects' },
      { name: 'React Native', level: 3, project: '#projects' },
      { name: 'Expo', level: 3, project: '#projects' },
      { name: 'Node.js', level: 2, project: '#projects' },
      { name: 'Tailwind CSS', level: 3, project: '#projects' },
      { name: 'Framer Motion', level: 2, project: '#projects' },
    ],
  },
  {
    title: 'Back-End & Data',
    icon: '⊞',
    skills: [
      { name: 'Supabase', level: 3, project: '#projects' },
      { name: 'PostgreSQL', level: 3, project: '#projects' },
      { name: 'REST APIs', level: 3, project: '#projects' },
      { name: 'Row-Level Security', level: 2, project: '#projects' },
      { name: 'PKCE Auth', level: 2, project: '#projects' },
    ],
  },
  {
    title: 'AI & Analytics',
    icon: '◈',
    skills: [
      { name: 'Google Gemini API', level: 3, project: '#projects' },
      { name: 'Prompt Engineering', level: 2, project: '#projects' },
      { name: 'A/B Testing', level: 2, project: '#projects' },
      { name: 'GA4 Analytics', level: 2, project: null },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '⚙',
    skills: [
      { name: 'Git & GitHub', level: 3, project: null },
      { name: 'EAS Build CI/CD', level: 3, project: '#projects' },
      { name: 'RevenueCat', level: 2, project: '#projects' },
      { name: 'Apple HealthKit', level: 2, project: '#projects' },
      { name: 'Google Health Connect', level: 2, project: '#projects' },
    ],
  },
];

const LEVELS = {
  3: { label: 'Expert', color: 'bg-accent', textColor: 'text-accent-600', bars: 3 },
  2: { label: 'Proficient', color: 'bg-accent-300', textColor: 'text-accent-400', bars: 2 },
  1: { label: 'Familiar', color: 'bg-gray-300', textColor: 'text-gray-400', bars: 1 },
};

const ProficiencyBars = ({ level }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3].map((bar) => (
      <div
        key={bar}
        className={`h-1.5 w-4 rounded-full transition-all duration-300 ${
          bar <= level ? LEVELS[level].color : 'bg-gray-200'
        }`}
      />
    ))}
  </div>
);

const SkillPill = ({ skill }) => {
  const levelInfo = LEVELS[skill.level];
  const content = (
    <div
      className={`group flex items-center justify-between gap-3 text-sm bg-white hover:bg-accent-50/50 border border-gray-200 px-3 py-2 rounded-lg transition-all duration-200 shadow-soft ${
        skill.project ? 'cursor-pointer hover:border-accent-300' : ''
      }`}
    >
      <span className="text-text-primary group-hover:text-accent-600 transition-colors font-medium text-sm">
        {skill.name}
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-[10px] font-mono ${levelInfo.textColor} hidden sm:block`}>
          {levelInfo.label}
        </span>
        <ProficiencyBars level={skill.level} />
      </div>
    </div>
  );

  return skill.project ? (
    <a href={skill.project}>{content}</a>
  ) : (
    content
  );
};

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', ...skillCategories.map((c) => c.title)];

  const visibleCategories =
    activeFilter === 'All'
      ? skillCategories
      : skillCategories.filter((c) => c.title === activeFilter);

  return (
    <section id="skills" className="py-24 bg-surface-alt">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary whitespace-nowrap">
              <span className="text-accent font-mono text-lg mr-2">03.</span>
              Skills & Technologies
            </h2>
            <div className="ml-6 h-px bg-gray-200 flex-grow max-w-xs" />
          </div>
        </AnimatedSection>

        {/* Legend + filter row */}
        <AnimatedSection delay={0.05}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            {/* Proficiency legend */}
            <div className="flex items-center gap-5">
              {Object.values(LEVELS).map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <ProficiencyBars level={Object.keys(LEVELS).find((k) => LEVELS[k].label === l.label) * 1} />
                  <span className="text-xs text-gray-500">{l.label}</span>
                </div>
              ))}
            </div>
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-xs font-mono px-3 py-1 rounded-full border transition-all duration-200 ${
                    activeFilter === f
                      ? 'border-accent text-white bg-accent'
                      : 'border-gray-200 text-text-secondary hover:border-accent-300 hover:text-accent bg-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCategories.map((cat, idx) => (
            <AnimatedSection key={cat.title} delay={idx * 0.05}>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full hover:border-accent-300 hover:shadow-card transition-all duration-300 shadow-soft">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-accent text-lg font-mono leading-none">{cat.icon}</span>
                  <h3 className="text-sm font-mono text-accent uppercase tracking-wider">{cat.title}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {cat.skills.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Footnote */}
        <AnimatedSection delay={0.2}>
          <p className="text-center text-gray-400 text-xs font-mono mt-8">
            Skills marked with a project link are demonstrated in my work above ↑
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;
