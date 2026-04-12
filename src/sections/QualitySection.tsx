import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Award, FileCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const standards = [
  { code: 'NEC', name: 'National Electrical Code' },
  { code: 'ASHRAE', name: 'HVAC Standards' },
  { code: 'IPC', name: 'International Plumbing Code' },
];

export default function QualitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.35,
        },
      });

      // ENTRANCE (0%-30%)
      // Left image card enters from left
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Right content enters from right
      scrollTl.fromTo(
        labelRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // Standards badges stagger
      const badges = standardsRef.current?.querySelectorAll('.standard-badge');
      if (badges) {
        scrollTl.fromTo(
          badges,
          { y: 18, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.04, ease: 'none' },
          0.18
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.25
      );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, bodyRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );

      if (badges) {
        scrollTl.fromTo(
          badges,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in', stagger: 0.01 },
          0.75
        );
      }

      scrollTl.fromTo(
        lineRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0, opacity: 0, ease: 'power2.in' },
        0.72
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
      className="section-pinned bg-dark"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-dark-light" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 lg:px-[6vw]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Image Card */}
            <div
              ref={imageRef}
              className="w-full lg:w-[40vw] h-[40vh] lg:h-[64vh] rounded-2xl overflow-hidden shadow-dark"
            >
              <img
                src="/quality_panel.jpg"
                alt="Quality Testing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
              
              {/* Quality badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/50">
                <Shield className="w-4 h-4 text-gold" />
                <span className="font-mono text-xs text-gold uppercase tracking-wider">Certified</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 max-w-xl lg:max-w-none">
              {/* Label */}
              <span
                ref={labelRef}
                className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-gold mb-4"
              >
                Quality & Safety
              </span>

              {/* Headline */}
              <h2
                ref={headlineRef}
                className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight"
              >
                Built to standards. Built to last.
              </h2>

              {/* Gold Line */}
              <div
                ref={lineRef}
                className="gold-line w-[10vw] max-w-[120px] mt-6 origin-left"
              />

              {/* Body */}
              <p
                ref={bodyRef}
                className="text-base lg:text-lg text-white/70 mt-6 leading-relaxed max-w-lg"
              >
                We follow NEC, ASHRAE, IPC, and local codes with rigorous QA checks—so 
                your systems are safe, efficient, and easy to maintain.
              </p>

              {/* Standards */}
              <div ref={standardsRef} className="flex flex-wrap gap-3 mt-8">
                {standards.map((std, index) => (
                  <div
                    key={index}
                    className="standard-badge flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-gold/50 transition-colors"
                  >
                    <Award className="w-4 h-4 text-gold" />
                    <div>
                      <span className="font-heading font-bold text-white text-sm">{std.code}</span>
                      <span className="text-white/50 text-xs ml-2 hidden sm:inline">{std.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-gold" />
                  <span className="text-white/70 text-sm">Rigorous quality assurance checks</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-gold" />
                  <span className="text-white/70 text-sm">Safety-first approach on all projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-gold" />
                  <span className="text-white/70 text-sm">Compliance documentation provided</span>
                </div>
              </div>

              {/* CTA */}
              <button
                ref={ctaRef}
                onClick={scrollToContact}
                className="group mt-8 px-6 py-3 border border-gold/50 text-gold font-heading font-medium rounded-full flex items-center gap-2 hover:bg-gold hover:text-dark transition-all duration-300"
              >
                Request compliance docs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
