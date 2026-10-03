import React from 'react';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiInstagram } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import { Reveal, SplitHeading, SectionLabel, Magnetic } from './primitives';

export const EMAIL = 'alexanders.edward@gmail.com';

/* Personal profiles. The Core+ social accounts live in the product column
   below so visitors can tell whose account they are about to open. */
const SOCIALS = [
  { label: 'GitHub', handle: '@Edward-0528', href: 'https://github.com/Edward-0528', Icon: FiGithub },
  { label: 'LinkedIn', handle: 'edward-granados', href: 'https://linkedin.com/in/edward-granados-459342195/', Icon: FiLinkedin },
  { label: 'Email', handle: EMAIL, href: `mailto:${EMAIL}`, Icon: FiMail },
];

const PRODUCT_LINKS = [
  { label: 'Core+ on the App Store', href: 'https://apps.apple.com/us/app/id6752533436' },
  { label: 'Core+ on Google Play', href: 'https://play.google.com/store/apps/details?id=com.anonymous.coreplus' },
  { label: 'coreplusct.com', href: 'https://coreplusct.com' },
  { label: 'Cross My Words! on the App Store', href: 'https://apps.apple.com/us/app/cross-my-words/id6766165878' },
];

const CORE_SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/coreplusct', Icon: FiInstagram },
  { label: 'TikTok', href: 'https://tiktok.com/@coreplusct', Icon: SiTiktok },
];

const ContactSection = () => (
  <section id="contact" className="relative overflow-hidden bg-night pt-28 lg:pt-36">
    {/* Warm light rising from the bottom edge */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[34rem] bg-[radial-gradient(ellipse_at_bottom,rgba(126,156,127,0.22)_0%,rgba(232,118,58,0.08)_40%,transparent_70%)] blur-2xl"
    />

    <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
      <SectionLabel index="05">Contact</SectionLabel>

      <SplitHeading
        text="Open to work."
        className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.02em] text-bone"
      />

      <Reveal delay={0.12}>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone-sub">
          Looking for full-stack or mobile engineering roles. The fastest way to reach me is
          email — I answer everything.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <Magnetic strength={0.2} className="mt-12 inline-block">
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-4 rounded-full bg-bone px-9 py-5 text-base font-medium text-night transition-colors duration-500 hover:bg-sage-light"
          >
            {EMAIL}
            <FiArrowUpRight
              size={18}
              className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </Magnetic>
      </Reveal>

      <div className="mt-24 grid gap-12 border-t border-night-line pt-14 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-sage">Elsewhere</p>
          <ul className="space-y-4">
            {SOCIALS.map(({ label, handle, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-bone-sub transition-colors duration-300 hover:text-bone"
                >
                  <Icon size={16} className="flex-shrink-0 text-bone-faint transition-colors group-hover:text-sage-light" />
                  <span className="min-w-0">
                    <span className="block text-sm text-bone">{label}</span>
                    <span className="block truncate font-mono text-xs text-bone-faint">{handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-sage">Products</p>
          <ul className="space-y-4">
            {PRODUCT_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-bone-sub transition-colors duration-300 hover:text-bone"
                >
                  {label}
                  <FiArrowUpRight
                    size={13}
                    className="text-bone-faint transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-sage">Core+ social</p>
          <ul className="space-y-4">
            {CORE_SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-sm text-bone-sub transition-colors duration-300 hover:text-bone"
                >
                  <Icon size={15} className="text-bone-faint transition-colors group-hover:text-sage-light" />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/Edward_Granados_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-night-line px-5 py-2.5 text-sm text-bone transition-colors duration-500 hover:border-sage hover:text-sage-light"
          >
            Download résumé
            <FiArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <footer className="mt-20 flex flex-col gap-4 border-t border-night-line py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-bone-faint">
          © {new Date().getFullYear()} Edward Granados
        </p>
        <p className="font-mono text-xs text-bone-faint">
          React · Three.js · Framer Motion — built and deployed by hand
        </p>
      </footer>
    </div>
  </section>
);

export default ContactSection;
