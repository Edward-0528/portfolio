import React, { Suspense, lazy } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import { EASE, Magnetic, Marquee } from './primitives';
import useCanRender3D from './useCanRender3D';
import useCorePlusLive from '../../hooks/useCorePlusLive';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

/* The CSS stand-in when WebGL is unavailable or unwanted. It is built to look
   intentional on its own, not like a slot where something failed to load. */
const GradientFallback = () => (
  <div className="absolute inset-0 overflow-hidden" aria-hidden>
    <div className="animate-glow-pulse absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,156,127,0.45)_0%,rgba(126,156,127,0.12)_45%,transparent_70%)] blur-3xl" />
    <div className="absolute left-[28%] top-[58%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,118,58,0.35)_0%,transparent_68%)] blur-3xl" />
    <div className="absolute left-[70%] top-[36%] h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,169,63,0.22)_0%,transparent_70%)] blur-3xl" />
  </div>
);

const HeroSection = () => {
  const canRender3D = useCanRender3D();
  const reduce = useReducedMotion();
  const { store } = useCorePlusLive();

  const line = (text, delay) => (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '110%' }}
        animate={reduce ? false : { y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-night">
      {/* Backdrop: real 3D where it will run well, a composed gradient otherwise */}
      <div className="absolute inset-0 z-0">
        {canRender3D ? (
          <Suspense fallback={<GradientFallback />}>
            <HeroCanvas className="!absolute inset-0" />
          </Suspense>
        ) : (
          <GradientFallback />
        )}
      </div>

      {/* Scrim — keeps type legible over whatever the scene is doing underneath */}
      <div
        className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(20,17,14,0.97)_0%,rgba(20,17,14,0.9)_30%,rgba(20,17,14,0.55)_52%,rgba(20,17,14,0.1)_78%,rgba(20,17,14,0.4)_100%)]"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-night to-transparent" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-32 lg:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-light" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-bone-sub">
            Open to work · 2026
          </span>
        </motion.div>

        <h1 className="max-w-5xl font-display text-[clamp(3rem,11vw,9.5rem)] font-normal leading-[0.88] tracking-[-0.02em] text-bone">
          {line('Edward', 0.1)}
          {line('Granados', 0.22)}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="mt-12 flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-md text-lg leading-relaxed text-bone-sub">
            Full-stack engineer. I design and build mobile products end to end — and ship
            them. <span className="text-bone">Core+</span>, a home and gym workout app, is
            live on the App Store and Google Play.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#coreplus"
                className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-4 text-sm font-medium text-night transition-colors duration-500 hover:bg-sage-light"
              >
                See Core+
                <FiArrowUpRight
                  size={16}
                  className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-full border border-night-line px-7 py-4 text-sm font-medium text-bone transition-colors duration-500 hover:border-sage hover:text-sage-light"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Running strip of what is actually true about the work */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-night-line/60 bg-night/60 py-4 backdrop-blur-sm">
        <Marquee
          className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint"
          items={[
            'React Native',
            'Expo',
            'Supabase',
            'PostgreSQL',
            'Three.js',
            store?.version ? `Core+ v${store.version} live` : 'Core+ live on both stores',
            'Solo developer',
          ]}
        />
      </div>

      <motion.a
        href="#coreplus"
        aria-label="Scroll to Core+"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 text-bone-faint transition-colors hover:text-sage-light lg:block"
      >
        <FiArrowDown size={18} className="animate-bounce" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
