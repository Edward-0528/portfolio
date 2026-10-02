import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown, FiDownload, FiStar, FiArrowUpRight } from 'react-icons/fi';
import useCorePlusLive from '../hooks/useCorePlusLive';
import { APP_STORE_URL, PLAY_STORE_URL } from './CorePlusShowcase';

const Scene3D = lazy(() => import('./Scene3D'));

const ROLES = [
  'Full-Stack Engineer',
  'React Native · Supabase · Expo',
  'Shipped solo to both app stores',
];

const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const target = ROLES[index];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 45);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTyping(false), 2200);
      return () => clearTimeout(t);
    }
    if (displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 22);
      return () => clearTimeout(t);
    }
    setIndex((i) => (i + 1) % ROLES.length);
    setTyping(true);
    return undefined;
  }, [displayed, typing, index, reduceMotion]);

  // Reduced motion gets the sentence, not the animation.
  if (reduceMotion) return <span className="gradient-text">{ROLES[0]}</span>;

  return (
    <span className="gradient-text">
      {displayed}
      <span className="animate-pulse text-accent">|</span>
    </span>
  );
};

/* ── Hero bento tile ── */
const Tile = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`rounded-2xl border border-border/80 bg-white/85 p-5 shadow-card ring-1 ring-white/60 backdrop-blur-xl transition-shadow duration-300 hover:shadow-card-hover ${className}`}
  >
    {children}
  </motion.div>
);

const AppleGlyph = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden {...props}>
    <path
      fill="currentColor"
      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
    />
  </svg>
);

const PlayGlyph = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden {...props}>
    <path d="M3.18 23.76a2 2 0 0 0 2.07-.22l11.84-6.86-2.89-2.89zM.49 1.05A2 2 0 0 0 0 2.37v19.26a2 2 0 0 0 .49 1.32L.6 23.07l10.79-10.79v-.25L.6 1.24z" fill="#4285F4" />
    <path d="m18.64 13.4-3.1-3.1-10.79 10.75.07.07 2.07-.22z" fill="#34A853" />
    <path d="M18.64 10.6 15.54 7.5 3.69.64 1.62.42.6 1.24l10.79 10.79z" fill="#FBBC04" />
    <path d="m3.18.24 11.84 6.86 3.1-3.1-2.07-.86A2 2 0 0 0 14 3l-8.75-3A2 2 0 0 0 3.18.24z" fill="#EA4335" />
  </svg>
);

const Hero = () => {
  const { store } = useCorePlusLive();

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-surface">
      <Suspense fallback={null}>
        <Scene3D className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }} />
      </Suspense>

      {/* Soft gradient fallback, visible while the 3D scene loads */}
      <div className="absolute inset-0 z-0">
        <div className="animate-float absolute -left-32 top-1/4 h-[600px] w-[600px] rounded-full bg-accent-200/20 blur-[140px]" />
        <div className="animate-float-delayed absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-warm-100/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mb-6 inline-flex items-center space-x-2 rounded-full border border-accent-200 bg-white/80 px-4 py-1.5 shadow-soft backdrop-blur-sm"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono text-xs font-medium tracking-wide text-accent-600">Open to Work · 2026</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 font-mono text-sm tracking-wide text-accent"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 text-5xl font-bold leading-tight text-text-primary sm:text-6xl lg:text-7xl"
            >
              Edward Granados.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 flex h-12 items-center text-2xl font-bold leading-tight text-text-secondary sm:text-3xl lg:text-4xl"
            >
              <Typewriter />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-10 max-w-xl text-lg leading-relaxed text-text-secondary"
            >
              I designed, built and shipped{' '}
              <a
                href="#coreplus"
                className="font-semibold text-accent-600 underline decoration-accent-300 underline-offset-4 transition-colors hover:text-accent"
              >
                Core+
              </a>{' '}
              — a home and gym workout app that builds an adaptive weekly plan around your level,
              your schedule and your injuries. Solo, end to end, live on the{' '}
              <span className="font-medium text-text-primary">App Store</span> and{' '}
              <span className="font-medium text-text-primary">Google Play</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#coreplus"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-accent-600 hover:shadow-glow-blue"
              >
                See Core+
                <FiArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="/Edward_Granados_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-accent px-8 py-3 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-white"
              >
                <FiDownload size={14} />
                Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 flex items-center space-x-5"
            >
              <a
                href="https://github.com/Edward-0528/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 transition-colors duration-200 hover:text-accent"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/edward-granados-459342195/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 transition-colors duration-200 hover:text-accent"
              >
                <FiLinkedin size={20} />
              </a>
              <div className="h-px w-16 bg-gray-200" />
              <span className="font-mono text-sm text-text-secondary">alexanders.edward@gmail.com</span>
            </motion.div>
          </div>

          {/* Right — bento proof grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="grid auto-rows-fr grid-cols-3 grid-rows-3 gap-3">
              {/* Real app screenshot, not a mockup */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="row-span-3 flex items-center justify-center"
              >
                {/* No card around this one — a bare device reads better beside
                    the info tiles than a phone letterboxed inside a panel. */}
                <div className="w-full overflow-hidden rounded-[1.6rem] bg-[#1A1A2E] p-[3px] shadow-[0_20px_50px_-12px_rgba(26,26,46,0.4)] ring-1 ring-white/10">
                  <img
                    src="/coreplus/plan.jpg"
                    alt="Core+ weekly plan screen"
                    width={300}
                    height={580}
                    className="w-full rounded-[1.45rem] object-cover object-top"
                    style={{ aspectRatio: '1179 / 2277' }}
                  />
                </div>
              </motion.div>

              {/* Live App Store rating */}
              <Tile className="col-span-2" delay={0.6}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 font-mono text-xs text-text-secondary">App Store rating</p>
                    <p className="font-mono text-3xl font-bold text-text-primary tabular-nums">
                      {store?.rating != null ? store.rating.toFixed(1) : '—'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <FiStar
                          key={s}
                          size={14}
                          className={
                            store?.rating != null && s < Math.round(store.rating)
                              ? 'fill-warm-400 text-warm-400'
                              : 'text-gray-200'
                          }
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="font-mono text-[10px] font-medium text-emerald-500">
                        {store?.ratingCount
                          ? `${store.ratingCount} rating${store.ratingCount === 1 ? '' : 's'} · live`
                          : 'Live on App Store'}
                      </span>
                    </div>
                  </div>
                </div>
              </Tile>

              {/* Live version straight from the store */}
              <Tile delay={0.7}>
                <p className="mb-1 font-mono text-xs text-text-secondary">Live build</p>
                <p className="font-mono text-3xl font-bold text-accent tabular-nums">
                  {store?.version ? `v${store.version}` : '—'}
                </p>
                <p className="mt-1 text-[10px] text-text-secondary">shipped via EAS</p>
              </Tile>

              <Tile className="border-warm-200/40" delay={0.8}>
                <p className="mb-2 font-mono text-xs text-text-secondary">Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {['React Native', 'Expo', 'Supabase', 'Postgres'].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-warm-200/50 bg-white/80 px-2 py-0.5 font-mono text-[10px] text-warm-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Tile>

              {/* Store links — both verified live */}
              <Tile className="col-span-2 flex flex-col justify-between p-4" delay={0.9}>
                <div>
                  <p className="mb-1 font-mono text-xs text-text-secondary">Shipped</p>
                  <p className="text-sm leading-snug text-text-primary">
                    On the App Store since{' '}
                    <span className="font-semibold">
                      {store?.releasedAt
                        ? new Date(store.releasedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                        : 'November 2025'}
                    </span>
                    , updated continuously since.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-surface-alt px-3 py-2 transition-colors hover:bg-accent-50"
                    >
                      <AppleGlyph className="h-4 w-4 text-text-primary" />
                      <span className="whitespace-nowrap text-xs font-medium text-text-primary">App Store</span>
                    </a>
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-surface-alt px-3 py-2 transition-colors hover:bg-accent-50"
                    >
                      <PlayGlyph className="h-4 w-4" />
                      <span className="whitespace-nowrap text-xs font-medium text-text-primary">Google Play</span>
                    </a>
                  </div>
                  <p className="whitespace-nowrap font-mono text-[10px] text-text-secondary">Solo dev</p>
                </div>
              </Tile>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" aria-label="Scroll to About" className="text-gray-300 transition-colors hover:text-accent">
            <FiArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
