import React from 'react';
import { Reveal, SplitHeading, SectionLabel, Parallax, Marquee } from './primitives';

/* Rewritten for the shipped product: the headline bullet used to lead with
   Gemini food recognition, which has not been the point of Core+ since the
   September pivot. */
const EXPERIENCE = [
  {
    role: 'Founder & Lead Engineer',
    org: 'Core+',
    period: 'Sept 2025 — Present',
    current: true,
    bullets: [
      'Designed, built and shipped a workout app to the App Store and Google Play as the only engineer — product, design, backend, release and store listing.',
      'Built the plan engine: per-pattern level assessment, injury-aware exercise filtering across an 85-movement library, and progression that responds to user-rated difficulty.',
      'Modelled the backend in Supabase and Postgres with row-level security enforcing per-user isolation at the database, plus Edge Functions for scheduled push.',
      'Shipped past 380 builds through automated EAS Build and EAS Submit pipelines.',
      'Instrumented the funnel first-party, then acted on it — usage data showed workouts drove retention while nutrition drove usage, and the product was rebuilt around training.',
    ],
  },
  {
    role: 'Store Manager',
    org: 'T-Mobile',
    period: '2018 — Present',
    bullets: [
      'Led a retail team against performance KPIs, using conversion and throughput data to decide where to spend coaching time.',
      'Translated technical service problems for non-technical customers under pressure — the habit that still shapes how I write product copy.',
    ],
  },
];

const CAPABILITIES = [
  { label: 'Mobile', items: ['React Native', 'Expo', 'EAS Build & Submit', 'HealthKit', 'Health Connect'] },
  { label: 'Front-end', items: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Three.js'] },
  { label: 'Back-end', items: ['Supabase', 'PostgreSQL', 'Row-level security', 'Edge Functions', 'REST'] },
  { label: 'Product', items: ['First-party analytics', 'A/B testing', 'RevenueCat', 'ASO', 'Store releases'] },
];

const AboutSection = () => (
  <section id="about" className="relative overflow-hidden bg-night-800 py-28 lg:py-36">
    <Parallax distance={70} className="pointer-events-none absolute inset-x-0 bottom-0 -z-0">
      <div className="mx-auto h-[30rem] w-[48rem] max-w-full rounded-full bg-[radial-gradient(ellipse,rgba(232,118,58,0.12)_0%,transparent_65%)] blur-3xl" />
    </Parallax>

    <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
      <SectionLabel index="03">About</SectionLabel>

      <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SplitHeading
            text="I build products, not just projects."
            className="max-w-xl font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.01em] text-bone"
          />

          <Reveal delay={0.12}>
            <div className="mt-10 max-w-xl space-y-6 leading-relaxed text-bone-sub">
              <p>
                I own the whole stack: the Postgres schema and its row-level security, the
                plan engine, the React Native app, the release pipeline, and the screenshots
                in the store listing. Shipping is the part most side projects never reach,
                and it is the part I care about.
              </p>
              <p>
                That ownership includes the uncomfortable parts. Nine months into Core+, my
                own analytics said the feature I was selling was not the feature keeping
                people — <span className="text-bone">67% scanned food, 7% ever trained, and
                the 7% were the ones who came back.</span> So I rebuilt the product around
                training and moved nutrition to a supporting role.
              </p>
              <p>
                Before engineering I spent seven years leading retail teams at T-Mobile,
                which is where reading a funnel and acting on it stopped being theory.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="space-y-10">
          {CAPABILITIES.map((group, i) => (
            <Reveal key={group.label} delay={0.1 + i * 0.06}>
              <div className="border-t border-night-line pt-5">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-sage">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-bone-sub">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mt-28">
        <SectionLabel index="04">Experience</SectionLabel>

        <div className="mt-12 space-y-14">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.org} delay={i * 0.08}>
              <div className="grid gap-6 border-t border-night-line pt-8 lg:grid-cols-[16rem_1fr] lg:gap-14">
                <div>
                  <div className="flex items-center gap-2.5">
                    {job.current && (
                      <span className="relative flex h-2 w-2" aria-hidden>
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-light" />
                      </span>
                    )}
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-sage">{job.period}</p>
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-bone">{job.role}</h3>
                  <p className="mt-1 text-sm text-bone-faint">{job.org}</p>
                </div>

                <ul className="space-y-4">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-4 leading-relaxed text-bone-sub">
                      <span className="mt-2.5 h-px w-5 flex-shrink-0 bg-night-600" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>

    {/* Full-bleed strip to close the section */}
    <div className="mt-28 border-y border-night-line py-6">
      <Marquee
        className="font-display text-[clamp(1.6rem,4vw,2.6rem)] text-[#6B635A]"
        items={['Design', 'Build', 'Ship', 'Measure', 'Rebuild']}
      />
    </div>
  </section>
);

export default AboutSection;
