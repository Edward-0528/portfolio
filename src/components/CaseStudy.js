import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { FiChevronDown, FiChevronUp, FiGithub, FiExternalLink } from 'react-icons/fi';

const STEPS = [
  {
    phase: '01',
    title: 'Problem',
    icon: '🔍',
    color: 'border-red-400/30 bg-red-400/5',
    accentColor: 'text-red-400',
    content:
      'Existing nutrition apps were either too complex (MyFitnessPal) or too basic. None offered AI-powered meal recognition with real-time camera scanning, specialized health profiles (diabetes, kidney, heart health), and a letter-grade nutrition scoring system — all in a single, polished mobile app.',
    metric: null,
  },
  {
    phase: '02',
    title: 'Architecture',
    icon: '⚙️',
    color: 'border-blue-400/30 bg-blue-400/5',
    accentColor: 'text-blue-400',
    content:
      'Built a full React Native + Expo app with a Supabase + PostgreSQL backend. Row-Level Security enforces per-user data isolation. The AI pipeline streams images to Google Gemini 2.5 Flash via REST, which returns structured JSON (macros, micros, allergens, grade). RevenueCat handles subscription state across iOS and Android with a single API.',
    diagram: [
      { label: 'React Native (Expo)', note: 'UI + Camera', color: 'border-green-400/30 text-green-300' },
      { label: 'Gemini 2.5 Flash', note: 'AI Food Analysis', color: 'border-purple-400/30 text-purple-300' },
      { label: 'Supabase + PostgreSQL', note: 'Auth + Database', color: 'border-blue-400/30 text-blue-300' },
      { label: 'RevenueCat', note: 'Subscriptions', color: 'border-yellow-400/30 text-yellow-300' },
      { label: 'EAS Build', note: 'CI/CD Pipeline', color: 'border-orange-400/30 text-orange-300' },
    ],
    metric: null,
  },
  {
    phase: '03',
    title: 'Shipped',
    icon: '🚀',
    color: 'border-green-400/30 bg-green-400/5',
    accentColor: 'text-green-400',
    content:
      'Shipped to both the Apple App Store and Google Play Store as a solo developer. Implemented automated EAS Build + EAS Submit CI/CD pipelines, enabling rapid iteration. Over 80 versions released. A/B tested subscription tiers and paywalls to optimize conversion.',
    metric: { value: '80+', label: 'versions shipped' },
  },
];

const CorePlusArchDiagram = ({ nodes }) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {nodes.map((node, i) => (
      <React.Fragment key={node.label}>
        <div className={`flex flex-col items-center justify-center border rounded-lg px-3 py-2 min-w-[110px] text-center ${node.color}`}>
          <span className="text-[11px] font-semibold">{node.label}</span>
          <span className="text-[9px] text-gray-500 mt-0.5">{node.note}</span>
        </div>
        {i < nodes.length - 1 && (
          <div className="flex items-center text-gray-700 text-xs font-mono self-center">→</div>
        )}
      </React.Fragment>
    ))}
  </div>
);

const CaseStudy = () => {
  const [expanded, setExpanded] = useState(null);

  const toggle = (idx) => setExpanded(expanded === idx ? null : idx);

  return (
    <section id="case-study" className="py-24 bg-[#0a0a14]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-white whitespace-nowrap">
              <span className="text-green-400 font-mono text-lg mr-2">02.5</span>
              How I Built Core+
            </h2>
            <div className="ml-6 h-px bg-gray-700 flex-grow max-w-xs" />
          </div>
          <p className="text-gray-500 text-sm mb-12 max-w-xl">
            A behind-the-scenes look at the engineering decisions, architecture, and ship process for my flagship product.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="space-y-4">
          {STEPS.map((step, idx) => (
            <AnimatedSection key={step.phase} delay={idx * 0.08}>
              <div
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${step.color} cursor-pointer`}
                onClick={() => toggle(idx)}
              >
                {/* Header row */}
                <div className="flex items-center justify-between px-6 py-5">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <p className={`text-xs font-mono ${step.accentColor} mb-0.5`}>Phase {step.phase}</p>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    </div>
                    {step.metric && (
                      <div className="hidden sm:flex items-baseline gap-1.5 ml-4 bg-white/5 border border-white/5 rounded-lg px-3 py-1.5">
                        <span className="text-green-400 font-bold font-mono text-xl">{step.metric.value}</span>
                        <span className="text-gray-500 text-xs">{step.metric.label}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-gray-500">
                    {expanded === idx ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                  </div>
                </div>

                {/* Expandable body */}
                {expanded === idx && (
                  <div className="px-6 pb-6 border-t border-white/5">
                    <p className="text-gray-400 text-sm leading-relaxed mt-4">{step.content}</p>
                    {step.diagram && <CorePlusArchDiagram nodes={step.diagram} />}
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Links */}
        <AnimatedSection delay={0.3}>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a
              href="https://github.com/Edward-0528/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm font-mono"
            >
              <FiGithub size={15} />
              View GitHub
            </a>
            <span className="text-gray-700 hidden sm:block">·</span>
            <a
              href="https://apps.apple.com/us/app/core-ai-nutrition-tracker/id6743702718"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm font-mono"
            >
              <FiExternalLink size={15} />
              App Store
            </a>
            <span className="text-gray-700 hidden sm:block">·</span>
            <a
              href="https://play.google.com/store/apps/details?id=com.edwardg.coreplus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm font-mono"
            >
              <FiExternalLink size={15} />
              Google Play
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CaseStudy;
