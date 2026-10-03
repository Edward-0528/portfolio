import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Inertial scrolling for the whole page.
 *
 * Two things this has to get right or it becomes an accessibility problem:
 * it stays off entirely when the visitor asks for reduced motion, and anchor
 * links keep working (Lenis hijacks scroll, so native `scroll-behavior: smooth`
 * stops applying and in-page nav has to be routed through it).
 */
const SmoothScroll = () => {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch is better than anything we can simulate.
      smoothTouch: false,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Route same-page anchors through Lenis so #about etc. still glide.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
