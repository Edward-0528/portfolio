import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';

/* Shared easing — one curve across the site keeps the motion feeling authored. */
export const EASE = [0.16, 1, 0.3, 1];

/* ── Reveal ────────────────────────────────────────────────────────
   Fades and lifts a block the first time it enters the viewport.
   Collapses to a plain div under reduced motion so nothing is hidden
   from someone who never triggers the animation. */
export const Reveal = ({ children, delay = 0, y = 28, className = '', as = 'div' }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
};

/* ── SplitHeading ──────────────────────────────────────────────────
   Animates a heading in word by word. Words are the right unit: per
   character looks mechanical at display sizes, and screen readers get
   one continuous string either way because the words keep their spaces. */
export const SplitHeading = ({ text, className = '', delay = 0, as: Tag = 'h2' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{ duration: 0.85, delay: delay + i * 0.055, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/* ── Magnetic ──────────────────────────────────────────────────────
   Pulls an element gently toward the cursor while hovered. Pointer-fine
   only: on touch there is no hover state and the transform would stick. */
export const Magnetic = ({ children, strength = 0.35, className = '' }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.4 });
  const reduce = useReducedMotion();

  const onMove = (e) => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Parallax ──────────────────────────────────────────────────────
   Moves a layer against the scroll. `distance` is in pixels of total
   travel across the element's time in the viewport. */
export const Parallax = ({ children, distance = 60, className = '' }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yRaw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(yRaw, { stiffness: 120, damping: 28, mass: 0.6 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
};

/* ── Marquee ───────────────────────────────────────────────────────
   Duplicates its items once so the CSS translate can loop seamlessly
   at -50%. Paused entirely under reduced motion. */
export const Marquee = ({ items, className = '' }) => {
  const reduce = useReducedMotion();
  const run = [...items, ...items];

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        className={`flex min-w-full shrink-0 items-center gap-10 whitespace-nowrap ${
          reduce ? '' : 'animate-marquee'
        }`}
      >
        {run.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{item}</span>
            <span className="text-sage/40" aria-hidden>
              —
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── SectionLabel ──────────────────────────────────────────────── */
export const SectionLabel = ({ index, children }) => (
  <div className="mb-8 flex items-center gap-4">
    <span className="font-mono text-xs tracking-[0.25em] text-sage">{index}</span>
    <span className="h-px w-10 bg-night-line" />
    <span className="font-mono text-xs uppercase tracking-[0.25em] text-bone-sub">{children}</span>
  </div>
);
