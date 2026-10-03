import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiStar } from 'react-icons/fi';
import { Reveal, SplitHeading, SectionLabel, Magnetic, Parallax, EASE } from './primitives';
import useCorePlusLive from '../../hooks/useCorePlusLive';

export const APP_STORE_URL = 'https://apps.apple.com/us/app/id6752533436';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.anonymous.coreplus';
export const SITE_URL = 'https://coreplusct.com';

/* Each step is one real screen of the shipped app beside the engineering
   problem it solves. Screenshots are untouched device captures. */
const STEPS = [
  {
    img: '/coreplus/plan.jpg',
    eyebrow: 'The plan',
    title: 'A week built from a five-minute baseline',
    body:
      'A short assessment scores each user 1–5 on every movement pattern independently — someone can be a 4 at squats and a 2 at pushing. Week one is generated from those scores, not from a beginner / intermediate dropdown.',
    tags: ['Plan generator', 'Per-pattern levels'],
  },
  {
    img: '/coreplus/preview.jpg',
    eyebrow: 'The session',
    title: 'Every workout filtered against your joints',
    body:
      'Intake asks once about knees, lower back, shoulders and wrists. 69 of the 85 exercises carry a contraindication tag, and anything loading a flagged joint is dropped before a session is assembled.',
    tags: ['Injury filtering', 'Exercise library'],
  },
  {
    img: '/coreplus/player.jpg',
    eyebrow: 'The player',
    title: 'Hands-free, because your phone is on the floor',
    body:
      'The player runs a session end to end with audio cues and haptics — no reaching for the screen mid-set. Looping demos play for every movement, and timed work advances on its own while rep sets wait for a tap.',
    tags: ['Audio cues', 'Haptics', 'Looping demos'],
  },
  {
    img: '/coreplus/finish.jpg',
    eyebrow: 'The feedback loop',
    title: 'Two taps of feedback steer next week',
    body:
      'Rating a session too easy or too hard feeds straight into progression. Consistent work pushes load and unlocks harder variants; a missed week deloads about 10% instead of resetting.',
    tags: ['Adaptive progression', 'Deload logic'],
  },
  {
    img: '/coreplus/week.jpg',
    eyebrow: 'The payoff',
    title: 'Progress stated in movements, not minutes',
    body:
      'The weekly recap names what actually changed — knee push-up to full push-up, a row that went from 20 to 30 lbs. Showing the unlock is what makes week four feel different from week one.',
    tags: ['Weekly recap', 'Unlocks'],
  },
];

/* ── Device frame ──────────────────────────────────────────────── */

const Device = ({ src, alt, priority = false, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[2.4rem] bg-night-900 p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <div className="relative aspect-[1179/2277] overflow-hidden rounded-[2.2rem] bg-night-800">
          <div className="absolute left-1/2 top-[1.5%] z-20 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-night-900" />
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover object-top transition-opacity duration-700 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

/* ── Live store panel ──────────────────────────────────────────── */

const Stat = ({ value, sub, label }) => (
  <div>
    <div className="flex items-baseline gap-1.5">
      <span className="font-display text-4xl leading-none text-bone tabular-nums">{value}</span>
      {sub && <span className="text-sm text-bone-sub">{sub}</span>}
    </div>
    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">{label}</p>
  </div>
);

const StorePanel = ({ store }) => (
  <div className="rounded-3xl border border-night-line bg-night-700/60 p-7 backdrop-blur-sm sm:p-9">
    <div className="flex items-center gap-5">
      <img
        src="/coreplus/icon.png"
        alt=""
        width={64}
        height={64}
        className="h-16 w-16 flex-shrink-0 rounded-[1.15rem] ring-1 ring-white/10"
      />
      <div className="min-w-0">
        <p className="truncate text-lg font-medium text-bone">
          {store?.name || 'Core+: Pilates & Home Workout'}
        </p>
        <p className="text-sm text-bone-sub">
          {store?.genre || 'Health & Fitness'} · Free{store?.minimumOs ? ` · iOS ${store.minimumOs}+` : ''}
        </p>
      </div>
    </div>

    <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {/* Rating renders only once Apple has actually answered. */}
      {store?.rating != null && store.ratingCount > 0 && (
        <div>
          <div className="flex items-baseline gap-1.5">
            <FiStar className="translate-y-[2px] fill-honey text-honey" size={20} aria-hidden />
            <span className="font-display text-4xl leading-none text-bone tabular-nums">
              {store.rating.toFixed(1)}
            </span>
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">
            App Store · {store.ratingCount} rating{store.ratingCount === 1 ? '' : 's'}
          </p>
        </div>
      )}
      <Stat value="100" sub="+" label="Play installs" />
      <Stat value={store?.version ? `v${store.version}` : 'v1.64'} label="Live version" />
      <Stat value="Nov" sub="2025" label="First shipped" />
    </div>

    <div className="mt-9 flex flex-wrap gap-3">
      <Magnetic>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 text-sm font-medium text-night transition-colors duration-500 hover:bg-sage-light"
        >
          App Store
          <FiArrowUpRight size={15} className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </Magnetic>
      <Magnetic>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-night-line px-6 py-3 text-sm font-medium text-bone transition-colors duration-500 hover:border-sage hover:text-sage-light"
        >
          Google Play
          <FiArrowUpRight size={15} className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </Magnetic>
      <Magnetic>
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-bone-sub transition-colors duration-500 hover:text-sage-light"
        >
          coreplusct.com
          <FiArrowUpRight size={15} className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </Magnetic>
    </div>
  </div>
);

/* ── Scroll-pinned walkthrough ─────────────────────────────────── */

const Walkthrough = () => {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const next = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
      setActive((prev) => (prev === next ? prev : next));
    });
    return unsub;
  }, [scrollYProgress]);

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={trackRef} style={{ height: `${STEPS.length * 95}vh` }} className="relative hidden lg:block">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-[1fr_auto] items-center gap-20">
          <div className="relative min-h-[24rem]">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.img}
                aria-hidden={active !== i}
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: reduce ? 0 : active === i ? 0 : 24,
                  filter: active === i ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{ duration: 0.6, ease: EASE }}
                className={`absolute inset-0 flex flex-col justify-center ${
                  active === i ? '' : 'pointer-events-none'
                }`}
              >
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-sage">
                  {String(i + 1).padStart(2, '0')} · {step.eyebrow}
                </p>
                <h3 className="mb-6 max-w-xl font-display text-[2.8rem] leading-[1.05] tracking-[-0.01em] text-bone">
                  {step.title}
                </h3>
                <p className="max-w-lg leading-relaxed text-bone-sub">{step.body}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-sage/30 bg-sage/10 px-3.5 py-1.5 font-mono text-[11px] text-sage-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <div className="relative w-[320px] xl:w-[350px]">
              {/* Glow tracks behind the device so it sits in light, not on a flat field */}
              <div
                aria-hidden
                className="animate-glow-pulse absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle,rgba(126,156,127,0.35)_0%,rgba(232,118,58,0.12)_45%,transparent_70%)] blur-3xl"
              />
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.img}
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: reduce ? 1 : active === i ? 1 : 0.96 }}
                  transition={{ duration: 0.65, ease: EASE }}
                  className={i === 0 ? '' : 'absolute inset-0'}
                >
                  <Device src={step.img} alt={`Core+ — ${step.title}`} priority={i === 0} />
                </motion.div>
              ))}
            </div>

            <div className="relative h-64 w-[2px] overflow-hidden rounded-full bg-night-line">
              <motion.div style={{ scaleY: railScale }} className="absolute inset-0 origin-top rounded-full bg-sage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Mobile rail ───────────────────────────────────────────────── */

const MobileRail = () => (
  <div className="lg:hidden">
    <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {STEPS.map((step, i) => (
        <div key={step.img} className="w-[74vw] max-w-[300px] flex-shrink-0 snap-center">
          <Device src={step.img} alt={`Core+ — ${step.title}`} priority={i === 0} />
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-sage">
            {String(i + 1).padStart(2, '0')} · {step.eyebrow}
          </p>
          <h3 className="mt-3 font-display text-2xl leading-snug text-bone">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-bone-sub">{step.body}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ── Testimonials — real rows only ─────────────────────────────── */

const Testimonials = ({ testimonials }) => {
  if (!testimonials.length) return null;
  return (
    <div className="mt-24">
      <SectionLabel index="—">What members say</SectionLabel>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={Math.min(i, 5) * 0.08}>
            <figure className="h-full rounded-2xl border border-night-line bg-night-700/60 p-7">
              {t.rating != null && (
                <div className="mb-4 flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <FiStar key={s} size={13} className={s < t.rating ? 'fill-honey text-honey' : 'text-night-600'} aria-hidden />
                  ))}
                </div>
              )}
              <blockquote className="leading-relaxed text-bone">“{t.quote}”</blockquote>
              <figcaption className="mt-5 font-mono text-xs text-bone-faint">— {t.name}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

/* ── Section ───────────────────────────────────────────────────── */

const CorePlusFeature = () => {
  const { store, testimonials } = useCorePlusLive();

  return (
    <section id="coreplus" className="relative bg-night py-28 lg:py-36">
      {/* Ambient depth behind the whole section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60rem] overflow-hidden" aria-hidden>
        <Parallax distance={90}>
          <div className="mx-auto h-[36rem] w-[60rem] max-w-full rounded-full bg-[radial-gradient(ellipse,rgba(126,156,127,0.18)_0%,transparent_65%)] blur-3xl" />
        </Parallax>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel index="01">Featured work</SectionLabel>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <SplitHeading
              text="Core+"
              as="h2"
              className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-[0.9] tracking-[-0.02em] text-bone"
            />
            <SplitHeading
              text="A workout app that adapts to the body using it."
              as="p"
              delay={0.1}
              className="mt-6 max-w-xl font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] text-bone-sub"
            />
          </div>

          <Reveal delay={0.15}>
            <p className="leading-relaxed text-bone-sub">
              Designed, built and shipped alone to the App Store and Google Play. React Native
              and Expo on the front, Supabase and Postgres behind it, released continuously
              through EAS. Everything below is a real screenshot of the live build.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <StorePanel store={store} />
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Walkthrough />
        <div className="mt-16">
          <MobileRail />
        </div>
        <Testimonials testimonials={testimonials} />
      </div>
    </section>
  );
};

export default CorePlusFeature;
