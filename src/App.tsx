import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Sections
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import LifecycleSection from './sections/LifecycleSection';
import QualitySection from './sections/QualitySection';
import IndustriesSection from './sections/IndustriesSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import Preloader from './sections/Preloader';
import WhatsAppButton from './sections/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  // Preloader animation
  useEffect(() => {
    const preloader = preloaderRef.current;
    if (!preloader) return;

    const tl = gsap.timeline();
    tl.to(preloader, {
      opacity: 0,
      duration: 0.8,
      delay: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Global scroll snap for pinned sections
  useLayoutEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.08 && value <= r.end + 0.08
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.08, max: 0.25 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Preloader */}
      <Preloader ref={preloaderRef} />
      
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main ref={mainRef} className="relative">
        {/* Section 1: Hero - z-10 */}
        <div className="relative z-10">
          <HeroSection />
        </div>
        
        {/* Section 2: About - z-20 */}
        <div className="relative z-20">
          <AboutSection />
        </div>
        
        {/* Section 3: Services - z-30 */}
        <div className="relative z-30">
          <ServicesSection />
        </div>
        
        {/* Section 4: Capabilities - z-40 */}
        <div className="relative z-40">
          <CapabilitiesSection />
        </div>
        
        {/* Section 5: Lifecycle - z-50 */}
        <div className="relative z-50">
          <LifecycleSection />
        </div>
        
        {/* Section 6: Quality - z-[60] */}
        <div className="relative z-[60]">
          <QualitySection />
        </div>
        
        {/* Section 7: Industries - z-[70] */}
        <div className="relative z-[70]">
          <IndustriesSection />
        </div>
        
        {/* Section 8: Contact - z-[80] */}
        <div className="relative z-[80]">
          <ContactSection />
        </div>
        
        {/* Section 9: Footer - z-[90] */}
        <div className="relative z-[90]">
          <Footer />
        </div>
      </main>
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </>
  );
}

export default App;
