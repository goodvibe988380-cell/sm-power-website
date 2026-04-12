import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BarChart3, Layers, ClipboardCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: BarChart3,
    title: 'Load & energy modeling',
  },
  {
    icon: Layers,
    title: 'BIM coordination & clash detection',
  },
  {
    icon: ClipboardCheck,
    title: 'Construction support & commissioning',
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
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

      // Bullets stagger
      const bullets = bulletsRef.current?.querySelectorAll('li');
      if (bullets) {
        scrollTl.fromTo(
          bullets,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, ease: 'none' },
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

      if (bullets) {
        scrollTl.fromTo(
          bullets,
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
      className="section-pinned bg-dark-light"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-light">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-light via-dark to-dark" />
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
                src="/capabilities_analysis.jpg"
                alt="Analysis"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
            </div>

            {/* Right Content */}
            <div className="flex-1 max-w-xl lg:max-w-none">
              {/* Label */}
              <span
                ref={labelRef}
                className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-gold mb-4"
              >
                Capabilities
              </span>

              {/* Headline */}
              <h2
                ref={headlineRef}
                className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight"
              >
                Analysis-led design. Field-tested results.
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
                We model loads, pressure, and power early—so your systems are sized 
                right, coordinated tight, and easy to operate.
              </p>

              {/* Bullets */}
              <ul ref={bulletsRef} className="mt-8 space-y-4">
                {capabilities.map((cap, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <cap.icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-white/80 font-medium">{cap.title}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                ref={ctaRef}
                onClick={scrollToContact}
                className="group mt-8 px-6 py-3 border border-gold/50 text-gold font-heading font-medium rounded-full flex items-center gap-2 hover:bg-gold hover:text-dark transition-all duration-300"
              >
                See our process
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
