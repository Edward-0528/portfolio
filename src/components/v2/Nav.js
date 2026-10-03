import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { EASE } from './primitives';
import AdminLoginModal from '../AdminLoginModal';

const LINKS = [
  { label: 'Core+', href: '#coreplus' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Nav = ({ isAdmin = false, onAdminLogin = null, onLogout = null }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const reduce = useReducedMotion();

  // Long-press the wordmark to reach the admin login, as before.
  const pressTimer = useRef(null);
  const pressing = useRef(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 34, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The mobile sheet covers the page, so nothing behind it should scroll.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const startPress = (e) => {
    e.preventDefault();
    if (isAdmin && onLogout) {
      onLogout();
      return;
    }
    pressing.current = true;
    pressTimer.current = setTimeout(() => {
      if (pressing.current) setShowLogin(true);
    }, 2000);
  };
  const endPress = () => {
    clearTimeout(pressTimer.current);
    pressing.current = false;
  };

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-sage via-sage-light to-apricot"
      />

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-700 ease-out-expo ${
          scrolled ? 'border-b border-night-line/70 bg-night/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a
            href="#home"
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={endPress}
            className="select-none font-display text-xl tracking-tight text-bone transition-colors duration-300 hover:text-sage-light"
          >
            Edward Granados
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-xs uppercase tracking-[0.18em] text-bone-sub transition-colors duration-300 hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-sage transition-all duration-500 ease-out-expo group-hover:w-full" />
              </a>
            ))}
            <a
              href="/Edward_Granados_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-night-line px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-bone transition-colors duration-500 hover:border-sage hover:text-sage-light"
            >
              Résumé
              <FiArrowUpRight size={13} className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="block h-px w-6 bg-bone"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="block h-px w-6 bg-bone"
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="fixed inset-0 z-[55] flex flex-col justify-center bg-night px-6 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: EASE }}
                  className="border-b border-night-line py-5 font-display text-4xl text-bone"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="/Edward_Granados_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + LINKS.length * 0.07, ease: EASE }}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-bone px-7 py-4 text-sm font-medium text-night"
              >
                Résumé
                <FiArrowUpRight size={15} />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminLoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={(data) => {
          setShowLogin(false);
          if (onAdminLogin) onAdminLogin(data);
        }}
      />
    </>
  );
};

export default Nav;
