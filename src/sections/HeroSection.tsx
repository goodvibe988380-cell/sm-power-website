import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ delay: 2.2 });

      // Label
      loadTl.fromTo(
        labelRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0
      );

      // Headline words animation
      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        loadTl.fromTo(
          headlineWords,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out' },
          0.2
        );
      }

      // Subheadline
      loadTl.fromTo(
        subheadlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        0.5
      );

      // Gold line
      loadTl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out' },
        0.6
      );

      // Body
      loadTl.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.8
      );

      // CTA
      loadTl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        1
      );

      // Right card
      loadTl.fromTo(
        cardRef.current,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        0.3
      );

      // Scroll-driven EXIT animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.35,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([labelRef.current, headlineRef.current, subheadlineRef.current, bodyRef.current, ctaRef.current, cardRef.current, lineRef.current], {
              opacity: 1, x: 0, y: 0, scaleX: 1, scale: 1
            });
          }
        },
      });

      // ENTRANCE (0%-30%): Hold - already visible from load animation
      // SETTLE (30%-70%): Static
      // EXIT (70%-100%): Elements exit

      // Headline exits left
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Subheadline exits left
      scrollTl.fromTo(
        subheadlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-15vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Label exits
      scrollTl.fromTo(
        labelRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.68
      );

      // Line exits
      scrollTl.fromTo(
        lineRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0, opacity: 0, ease: 'power2.in' },
        0.74
      );

      // Body exits down
      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.76
      );

      // CTA exits down
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.78
      );

      // Card exits right
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: element, offsetY: 0 },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-slate-50"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/lifecycle_site.jpg"
          alt="Indian infrastructure site"
          className="w-full h-full object-cover"
        />
        {/* Warm infrastructure overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 lg:px-[7vw]">
          {/* Label */}
          <span
            ref={labelRef}
            className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-gold mb-6"
          >
            SM POWER SOLUTIONS
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.95] tracking-tight max-w-[52vw]"
          >
            <span className="word inline-block">Powering</span>{' '}
            <span className="word inline-block">Smart</span>{' '}
            <span className="word inline-block">Infrastructure</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/90 mt-4 leading-tight"
          >
            with Precision Engineering
          </p>

          {/* Gold Line */}
          <div
            ref={lineRef}
            className="gold-line w-[18vw] max-w-[200px] mt-8 origin-left"
          />

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-base lg:text-lg text-white/70 mt-8 max-w-[34vw] leading-relaxed"
          >
            MEP consultancy for Indian infrastructure and modern buildings—on time, 
            on scope, and built to last.
          </p>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="group mt-10 px-8 py-4 bg-gold text-dark font-heading font-semibold rounded-full flex items-center gap-3 hover:shadow-gold-strong transition-all duration-300 hover:-translate-y-0.5"
          >
            Get a Quote
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Right Hero Card */}
      <div
        ref={cardRef}
        className="hidden lg:block absolute right-[4vw] top-[18vh] w-[34vw] h-[56vh] rounded-2xl overflow-hidden shadow-dark"
      >
        <img
          src="/capabilities_analysis.jpg"
          alt="Infrastructure planning"
          className="w-full h-full object-cover"
        />
        {/* Inner vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
        
        {/* Card overlay content */}
        <div className="absolute bottom-6 left-6 right-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Expert MEP</span>
          <p className="font-heading font-semibold text-white mt-2">Consultancy for Modern Buildings</p>
        </div>
      </div>
    </section>
  );
}
