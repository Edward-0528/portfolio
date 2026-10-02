import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * A short curtain over the first paint.
 *
 * The rule it follows: never make anyone wait for decoration. It resolves on
 * whichever comes first — fonts ready or a 900ms ceiling — and it does not
 * render at all for reduced-motion visitors or on a repeat view in the same
 * tab session. A recruiter opening the site twice sees it once.
 */
const PageIntro = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
      return sessionStorage.getItem('intro-played') !== '1';
    } catch {
      return true; // Private mode throws on storage; showing it is harmless.
    }
  });

  useEffect(() => {
    if (!visible) return undefined;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem('intro-played', '1');
      } catch {
        /* non-fatal */
      }
      setVisible(false);
    };

    const ceiling = setTimeout(finish, 900);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => setTimeout(finish, 220));
    }

    // Nothing behind the curtain should scroll while it is up.
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(ceiling);
      document.body.style.overflow = previous;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface"
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            Edward Granados
            <motion.span
              className="ml-0.5 inline-block text-accent"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              .
            </motion.span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageIntro;
