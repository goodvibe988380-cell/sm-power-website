import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ClipboardList, Hammer, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    icon: ClipboardList,
    title: 'Design',
    description: 'Concept to detailed drawings',
  },
  {
    icon: Hammer,
    title: 'Build',
    description: 'Construction support',
  },
  {
    icon: CheckCircle,
    title: 'Commission',
    description: 'Testing & handover',
  },
];

export default function LifecycleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const phasesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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
      // Background parallax
      scrollTl.fromTo(
        bgRef.current,
        { y: '3vh' },
        { y: 0, ease: 'none' },
        0
      );

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

      // Phases stagger
      const phaseCards = phasesRef.current?.querySelectorAll('.phase-card');
      if (phaseCards) {
        scrollTl.fromTo(
          phaseCards,
          { y: '6vh', opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.04, ease: 'none' },
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
        bgRef.current,
        { y: 0 },
        { y: '-3vh', ease: 'power2.in' },
        0.7
      );

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

      if (phaseCards) {
        scrollTl.fromTo(
          phaseCards,
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
      <div ref={bgRef} className="absolute inset-0">
        <img
          src="/lifecycle_site.jpg"
          alt="Construction Site"
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
                Project Lifecycle
              </span>

              {/* Headline */}
              <h2
                ref={headlineRef}
                className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight"
              >
                From concept to commissioning.
              </h2>

              {/* Body */}
              <p
                ref={bodyRef}
                className="text-base lg:text-lg text-white/70 mt-6 leading-relaxed"
              >
                One team, one model, one schedule. We align design with procurement 
                and construction so changes don't become surprises.
              </p>

              {/* Phases */}
              <div ref={phasesRef} className="flex flex-col sm:flex-row gap-4 mt-8">
                {phases.map((phase, index) => (
                  <div
                    key={index}
                    className="phase-card flex-1 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                      <phase.icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-heading font-semibold text-white text-sm mb-1">
                      {phase.title}
                    </h3>
                    <p className="text-xs text-white/60">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                ref={ctaRef}
                onClick={scrollToContact}
                className="group mt-8 px-6 py-3 bg-gold text-dark font-heading font-semibold rounded-full flex items-center gap-2 hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5"
              >
                Start a project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Image Card */}
            <div
              ref={cardRef}
              className="hidden lg:block w-[40vw] h-[64vh] rounded-2xl overflow-hidden shadow-dark"
            >
              <img
                src="/lifecycle_site.jpg"
                alt="Project Lifecycle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
              
              {/* Timeline overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 h-[2px] bg-gold/30 relative">
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-gold" />
                  </div>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="font-mono text-xs text-gold uppercase tracking-wider">Design</span>
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Build</span>
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Deliver</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
