import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable scroll-reveal wrapper using framer-motion.
 * Wraps children and fades them in + slides up when they enter the viewport.
 */
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
