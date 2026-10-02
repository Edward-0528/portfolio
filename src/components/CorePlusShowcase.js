import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiStar } from 'react-icons/fi';
import PhoneFrame from './PhoneFrame';
import useCorePlusLive from '../hooks/useCorePlusLive';

export const APP_STORE_URL = 'https://apps.apple.com/us/app/id6752533436';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.anonymous.coreplus';
export const SITE_URL = 'https://coreplusct.com';

/**
 * Each step is one real screen of the shipped app, paired with the engineering
 * problem behind it. The screenshots are untouched device captures.
 */
const STEPS = [
  {
    img: '/coreplus/plan.jpg',
    eyebrow: 'The plan',
    title: 'A week built from a five-minute baseline',
    body:
      'New users take a short assessment that scores them 1–5 on each movement pattern independently — someone can be a 4 at squats and a 2 at pushing. Week one is generated from those scores, not from a "beginner / intermediate" dropdown.',
    tags: ['Plan generator', 'Per-pattern levels'],
  },
  {
    img: '/coreplus/preview.jpg',
    eyebrow: 'The session',
    title: 'Every workout filtered against your joints',
    body:
      'Intake asks once about knees, lower back, shoulders and wrists. 69 of the 85 exercises in the library carry a contraindication tag, and the plan builder drops anything that loads a flagged joint before a session is ever assembled.',
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
      'Rating a session "too easy" or "too hard" feeds straight back into progression. Consistent work pushes load and unlocks harder variants; a missed week deloads roughly 10% instead of dropping you back where you started.',
    tags: ['Adaptive progression', 'Deload logic'],
  },
  {
    img: '/coreplus/week.jpg',
    eyebrow: 'The payoff',
    title: 'Progress stated in movements, not just minutes',
    body:
      'The weekly recap names what actually changed — knee push-up to full push-up, a row that went from 20 to 30 lbs. Showing the unlock rather than a calorie total is what makes week four feel different from week one.',
    tags: ['Weekly recap', 'Unlocks'],
  },
];

/* ── Live store bar ─────────────────────────────────────────────── */

const StoreStat = ({ label, value, sub }) => (
  <div className="flex-1 min-w-[7rem]">
    <div className="flex items-baseline gap-1.5">
      <span className="text-2xl font-semibold tracking-tight text-text-primary tabular-nums">{value}</span>
      {sub && <span className="text-sm text-text-secondary">{sub}</span>}
    </div>
    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-text-secondary/80">{label}</p>
  </div>
);

const LiveStoreBar = ({ store, state }) => {
  const pending = state === 'loading';

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-soft backdrop-blur-sm sm:p-7">
      <div className="flex items-center gap-4">
        <img
          src="/coreplus/icon.png"
          alt="Core+ app icon"
          width={56}
          height={56}
          className="h-14 w-14 flex-shrink-0 rounded-[1rem] shadow-soft ring-1 ring-black/5"
        />
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-text-primary">
            {store?.name || 'Core+: Pilates & Home Workout'}
          </p>
          <p className="text-sm text-text-secondary">
            {store?.genre || 'Health & Fitness'} · Free{store?.minimumOs ? ` · iOS ${store.minimumOs}+` : ''}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-5">
        {/* Rating only renders once Apple has actually answered. */}
        {store?.rating != null && store.ratingCount > 0 && (
          <div className="flex-1 min-w-[7rem]">
            <div className="flex items-baseline gap-1.5">
              <FiStar className="translate-y-[1px] fill-warm-400 text-warm-400" size={18} aria-hidden />
              <span className="text-2xl font-semibold tracking-tight text-text-primary tabular-nums">
                {store.rating.toFixed(1)}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-text-secondary/80">
              App Store · {store.ratingCount} rating{store.ratingCount === 1 ? '' : 's'}
            </p>
          </div>
        )}

        <StoreStat label="Google Play installs" value="100" sub="+" />
        <StoreStat
          label="Live version"
          value={pending ? '—' : store?.version ? `v${store.version}` : 'v1.64'}
        />
        <StoreStat label="First shipped" value="Nov" sub="2025" />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-text-primary/90 hover:shadow-lg"
        >
          App Store
          <FiArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:border-accent hover:text-accent"
        >
          Google Play
          <FiArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-300 hover:text-accent"
        >
          coreplusct.com
          <FiArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};

/* ── Scroll-pinned screenshot walkthrough ──────────────────────── */

const ScrollWalkthrough = () => {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Map continuous scroll onto a discrete step index.
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const next = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
      setActive((prev) => (prev === next ? prev : next));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={trackRef} style={{ height: `${STEPS.length * 90}vh` }} className="relative hidden lg:block">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-[1fr_auto] items-center gap-16">
          {/* Copy column — cross-fades between steps */}
          <div className="relative min-h-[22rem]">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.img}
                aria-hidden={active !== i}
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: reduceMotion ? 0 : active === i ? 0 : 18,
                  filter: active === i ? 'blur(0px)' : 'blur(3px)',
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 flex flex-col justify-center ${
                  active === i ? '' : 'pointer-events-none'
                }`}
              >
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, '0')} · {step.eyebrow}
                </p>
                <h3 className="mb-5 max-w-xl text-3xl font-bold leading-[1.15] tracking-tight text-text-primary xl:text-[2.6rem]">
                  {step.title}
                </h3>
                <p className="max-w-lg text-[15px] leading-relaxed text-text-secondary">{step.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-accent-200 bg-accent-soft px-3 py-1 font-mono text-[11px] font-medium text-accent-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Phone column — screenshots cross-fade in place */}
          <div className="flex items-center gap-7">
            <div className="relative w-[300px] xl:w-[330px]">
              {/* Ambient glow that tracks the active step */}
              <motion.div
                aria-hidden
                initial={false}
                animate={{ opacity: 0.55 }}
                className="absolute -inset-10 -z-10 rounded-full bg-accent-200/35 blur-[70px]"
              />

              {STEPS.map((step, i) => (
                <motion.div
                  key={step.img}
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: reduceMotion ? 1 : active === i ? 1 : 0.965,
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={i === 0 ? '' : 'absolute inset-0'}
                >
                  <PhoneFrame src={step.img} alt={`Core+ — ${step.title}`} priority={i === 0} />
                </motion.div>
              ))}
            </div>

            {/* Progress rail */}
            <div className="relative h-56 w-[3px] overflow-hidden rounded-full bg-border">
              <motion.div
                style={{ scaleY: railScale }}
                className="absolute inset-0 origin-top rounded-full bg-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Mobile fallback: a plain horizontal snap rail ─────────────── */

const MobileRail = () => (
  <div className="lg:hidden">
    <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {STEPS.map((step, i) => (
        <div key={step.img} className="w-[72vw] max-w-[280px] flex-shrink-0 snap-center">
          <PhoneFrame src={step.img} alt={`Core+ — ${step.title}`} priority={i === 0} />
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            {String(i + 1).padStart(2, '0')} · {step.eyebrow}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-snug text-text-primary">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.body}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ── Testimonials — real rows only ─────────────────────────────── */

const Testimonials = ({ testimonials }) => {
  if (!testimonials.length) return null;

  return (
    <div className="mt-20">
      <h3 className="mb-7 text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary">
        What members say
      </h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-card"
          >
            {t.rating != null && (
              <div className="mb-3 flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <FiStar
                    key={s}
                    size={13}
                    className={s < t.rating ? 'fill-warm-400 text-warm-400' : 'text-border'}
                    aria-hidden
                  />
                ))}
              </div>
            )}
            <blockquote className="text-[15px] leading-relaxed text-text-primary">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-text-secondary">— {t.name}</figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
};

/* ── Section ───────────────────────────────────────────────────── */

const CorePlusShowcase = () => {
  const { store, testimonials, state } = useCorePlusLive();

  return (
    <section id="coreplus" className="relative bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center">
            <h2 className="whitespace-nowrap text-2xl font-bold text-text-primary">
              <span className="mr-2 font-mono text-lg text-accent">02.</span>
              Core+ — shipped
            </h2>
            <div className="ml-6 h-px max-w-xs flex-grow bg-border" />
          </div>

          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-text-secondary">
            A fitness app I designed, built and shipped alone to the App Store and Google Play.
            React Native and Expo on the front, Supabase and Postgres behind it, released
            continuously through EAS. Everything below is a real screenshot of the live build.
          </p>

          <LiveStoreBar store={store} state={state} />
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ScrollWalkthrough />
        <div className="mt-14">
          <MobileRail />
        </div>
        <Testimonials testimonials={testimonials} />
      </div>
    </section>
  );
};

export default CorePlusShowcase;
