import React, { useEffect } from 'react';
import Nav from './Nav';
import HeroSection from './HeroSection';
import CorePlusFeature from './CorePlusFeature';
import WorkGrid from './WorkGrid';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import SmoothScroll from '../SmoothScroll';
import PageIntro from '../PageIntro';

/**
 * The 2026 portfolio.
 *
 * Dark warm base with sage and apricot as the only light sources, a real
 * WebGL hero behind a capability gate, and Core+ as the first thing anyone
 * reads. Section order is deliberate: proof before biography.
 */
const Portfolio = ({ isAdmin, onAdminLogin, onLogout }) => {
  // Overscroll exposes <body>, not the app shell — without this the page
  // flashes the light support-page background at the top and bottom edges.
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#14110E';
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  return (
  <div className="min-h-screen bg-night text-bone antialiased">
    <PageIntro />
    <SmoothScroll />
    <Nav isAdmin={isAdmin} onAdminLogin={onAdminLogin} onLogout={onLogout} />

    <main>
      <HeroSection />
      <CorePlusFeature />
      <WorkGrid />
      <AboutSection />
      <ContactSection />
    </main>
  </div>
  );
};

export default Portfolio;
