import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { Reveal, SplitHeading, SectionLabel, EASE } from './primitives';

/* Every link here was checked live. Nothing ships to this grid on faith —
   a dead link on a portfolio costs more than a missing project. */
const PROJECTS = [
  {
    title: 'Cross My Words!',
    kind: 'iOS game',
    year: '2026',
    blurb:
      'A word-tracing puzzle game — drag across a letter grid to spell hidden words against the clock. Handcrafted levels, stars and a leaderboard. Shipped to the App Store.',
    stack: ['React Native', 'Expo', 'Supabase'],
    live: 'https://apps.apple.com/us/app/cross-my-words/id6766165878',
    liveLabel: 'App Store',
    accent: 'honey',
    shipped: true,
    icon: '/coreplus/cmw-icon.png',
  },
  {
    title: 'Ladle',
    kind: 'Real-time web app',
    year: '2026',
    blurb:
      'A live multiplayer quiz platform in the shape of Kahoot. Players join by code and answer simultaneously, with Socket.IO driving gameplay and Zod validating every event server-side.',
    stack: ['React 19', 'TypeScript', 'Socket.IO', 'Firebase'],
    live: 'https://ladle.netlify.app',
    liveLabel: 'Live site',
    github: 'https://github.com/Edward-0528/Laddle',
    accent: 'sage',
  },
  {
    title: 'This site',
    kind: 'Portfolio',
    year: '2026',
    blurb:
      'Built with React and Three.js. The hero is a real WebGL scene behind a capability gate, and the Core+ figures are proxied live from Apple rather than hardcoded, so they cannot go stale.',
    stack: ['React', 'Three.js', 'Framer Motion', 'Netlify Functions'],
    live: 'https://edwardgranados.app',
    liveLabel: 'You are here',
    github: 'https://github.com/Edward-0528/portfolio',
    accent: 'apricot',
  },
  {
    title: 'Weather',
    kind: 'Web app',
    year: '2025',
    blurb:
      'A clean forecast app with automatic geolocation — current conditions, hourly and weekly outlook, designed to read well on a wall-mounted tablet.',
    stack: ['React', 'Open-Meteo', 'Tailwind'],
    live: 'https://weatherappedward.netlify.app',
    liveLabel: 'Live site',
    accent: 'sage',
  },
  {
    title: 'Storefront',
    kind: 'E-commerce',
    year: '2025',
    blurb:
      'A full shopping flow — catalogue, cart, authentication and persistent orders on Supabase.',
    stack: ['React', 'Supabase', 'Tailwind'],
    live: 'https://ecomedward.netlify.app',
    liveLabel: 'Live site',
    accent: 'honey',
  },
];

const ACCENTS = {
  sage: { text: 'text-sage-light', border: 'group-hover:border-sage/50', glow: 'rgba(126,156,127,0.14)' },
  apricot: { text: 'text-apricot-light', border: 'group-hover:border-apricot/50', glow: 'rgba(232,118,58,0.14)' },
  honey: { text: 'text-honey', border: 'group-hover:border-honey/50', glow: 'rgba(227,169,63,0.12)' },
};

/* A card that tilts slightly toward the cursor and lifts a glow behind it.
   Both effects are pointer-fine and reduced-motion aware. */
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const reduce = useReducedMotion();
  const accent = ACCENTS[project.accent] || ACCENTS.sage;

  const onMove = (e) => {
    if (reduce || !ref.current || !window.matchMedia('(pointer: fine)').matches) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 5, ry: px * 5 });
  };

  return (
    <Reveal delay={Math.min(index, 4) * 0.07}>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformPerspective: 900 }}
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-night-line bg-night-700/50 p-8 transition-colors duration-500 ${accent.border}`}
      >
        {/* Glow that only appears on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(600px circle at 50% 0%, ${accent.glow}, transparent 70%)` }}
        />

        <div className="relative">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-start gap-5">
              {project.icon && (
                <img
                  src={project.icon}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 flex-shrink-0 rounded-[1rem] ring-1 ring-white/10"
                />
              )}
              <div>
              <div className="flex items-center gap-3">
                <h3 className="font-display text-3xl leading-none text-bone">{project.title}</h3>
                {project.shipped && (
                  <span className="rounded-full border border-sage/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-sage-light">
                    Shipped
                  </span>
                )}
              </div>
              <p className={`mt-2 font-mono text-xs uppercase tracking-[0.18em] ${accent.text}`}>
                {project.kind}
              </p>
              </div>
            </div>
            <span className="font-mono text-xs text-bone-faint">{project.year}</span>
          </div>

          <p className="max-w-md leading-relaxed text-bone-sub">{project.blurb}</p>
        </div>

        <div className="relative mt-8">
          <div className="mb-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-night-600 px-3 py-1 font-mono text-[11px] text-bone-faint"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors duration-300 hover:${accent.text.replace('text-', 'text-')}`}
            >
              {project.liveLabel}
              <FiArrowUpRight
                size={15}
                className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="inline-flex items-center gap-2 text-sm text-bone-faint transition-colors duration-300 hover:text-bone"
              >
                <FiGithub size={15} />
                Code
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
};

const WorkGrid = () => (
  <section id="work" className="relative bg-night py-28 lg:py-36">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <SectionLabel index="02">Selected work</SectionLabel>

      <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <SplitHeading
          text="Other things I have built and shipped."
          className="max-w-2xl font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.01em] text-bone"
        />
        <Reveal delay={0.15}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-faint">
            Two of these are in app stores. The rest are live on the web — every link
            on this page was checked before it went up.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <div key={p.title} className={i === 0 ? 'md:col-span-2' : ''}>
            <ProjectCard project={p} index={i} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WorkGrid;
