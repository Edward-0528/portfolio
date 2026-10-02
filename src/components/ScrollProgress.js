import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Hairline read-progress bar pinned to the top of the viewport. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 34, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-600 to-warm-400"
    />
  );
};

export default ScrollProgress;
