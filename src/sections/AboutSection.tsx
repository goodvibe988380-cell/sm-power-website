import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
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
      // Left image panel enters from left
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Label enters from top
      scrollTl.fromTo(
        labelRef.current,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Headline enters from right
      scrollTl.fromTo(
        headlineRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Gold line draws in
      scrollTl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.12
      );

      // Body enters from bottom
      scrollTl.fromTo(
        bodyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // CTA enters
      scrollTl.fromTo(
        ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // SETTLE (30%-70%): Elements hold position

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
      id="about"
      className="section-pinned bg-slate-50"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-100" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 lg:px-[6vw]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Image Panel */}
            <div
              ref={imageRef}
              className="w-full lg:w-[40vw] h-[40vh] lg:h-[64vh] rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="/about_team.jpg"
                alt="Our Team"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              
              {/* Founder badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-white">Prithviraj S P</p>
                  <p className="font-mono text-xs text-gold/80 uppercase tracking-wider">Proprietor</p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 max-w-xl lg:max-w-none">
              {/* Label */}
              <span
                ref={labelRef}
                className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-gold mb-4"
              >
                About
              </span>

              {/* Headline */}
              <h2
                ref={headlineRef}
                className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight tracking-tight"
              >
                Engineering built on clarity, coordination, and craft.
              </h2>

              {/* Gold Line */}
              <div
                ref={lineRef}
                className="gold-line w-[10vw] max-w-[120px] mt-6 origin-left"
              />

              {/* Body */}
              <p
                ref={bodyRef}
                className="text-base lg:text-lg text-slate-700 mt-6 leading-relaxed max-w-lg"
              >
                We're a team of MEP specialists who treat every project like a partnership—clear 
                documentation, proactive problem-solving, and field-ready designs that reduce risk 
                and keep schedules moving.
              </p>

              {/* CTA */}
              <button
                ref={ctaRef}
                onClick={scrollToContact}
                className="group mt-8 px-6 py-3 border border-gold/50 text-gold font-heading font-medium rounded-full flex items-center gap-2 hover:bg-gold hover:text-dark transition-all duration-300"
              >
                Meet the team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
