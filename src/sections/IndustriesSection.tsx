import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, HeartPulse, Factory, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { icon: Building2, name: 'Commercial' },
  { icon: HeartPulse, name: 'Healthcare' },
  { icon: Factory, name: 'Industrial' },
  { icon: Server, name: 'Mission-Critical' },
];

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
      // Left dark panel wipe
      scrollTl.fromTo(
        panelRef.current,
        { x: '-46vw' },
        { x: 0, ease: 'none' },
        0
      );

      // Text content
      scrollTl.fromTo(
        labelRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // Industry chips pop in
      const chips = chipsRef.current?.querySelectorAll('.industry-chip');
      if (chips) {
        scrollTl.fromTo(
          chips,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.05, ease: 'none' },
          0.18
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.25
      );

      // Right card enters
      scrollTl.fromTo(
        cardRef.current,
        { x: '60vw', opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, bodyRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.72
      );

      if (chips) {
        scrollTl.fromTo(
          chips,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in', stagger: 0.01 },
          0.75
        );
      }

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '35vw', opacity: 0, ease: 'power2.in' },
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
      className="section-pinned"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/industries_ceiling.jpg"
          alt="Commercial Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-dark/30" />
      </div>

      {/* Left Dark Panel */}
      <div
        ref={panelRef}
        className="absolute left-0 top-0 w-full lg:w-[46vw] h-full bg-dark/85 backdrop-blur-sm"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 lg:px-[7vw]">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-[34vw]">
              {/* Label */}
              <span
                ref={labelRef}
                className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-gold mb-4"
              >
                Industries
              </span>

              {/* Headline */}
              <h2
                ref={headlineRef}
                className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight"
              >
                Complex buildings. Clear solutions.
              </h2>

              {/* Body */}
              <p
                ref={bodyRef}
                className="text-base lg:text-lg text-white/70 mt-6 leading-relaxed"
              >
                Commercial, healthcare, industrial, and mission-critical facilities—designed 
                for uptime, comfort, and energy accountability.
              </p>

              {/* Industry Chips */}
              <div ref={chipsRef} className="flex flex-wrap gap-3 mt-8">
                {industries.map((industry, index) => (
                  <div
                    key={index}
                    className="industry-chip group flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <industry.icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                    <span className="font-heading font-medium text-white text-sm">{industry.name}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                ref={ctaRef}
                onClick={scrollToContact}
                className="group mt-8 px-6 py-3 bg-gold text-dark font-heading font-semibold rounded-full flex items-center gap-2 hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5"
              >
                View case studies
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Image Card */}
            <div
              ref={cardRef}
              className="hidden lg:block w-[40vw] h-[64vh] rounded-2xl overflow-hidden shadow-dark"
            >
              <img
                src="/industries_ceiling.jpg"
                alt="Industries"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-dark/60 backdrop-blur-sm border border-white/10">
                  <p className="font-heading font-bold text-2xl text-gold">4</p>
                  <p className="font-mono text-xs text-white/60 uppercase tracking-wider">Sectors</p>
                </div>
                <div className="p-4 rounded-xl bg-dark/60 backdrop-blur-sm border border-white/10">
                  <p className="font-heading font-bold text-2xl text-gold">50+</p>
                  <p className="font-mono text-xs text-white/60 uppercase tracking-wider">Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
