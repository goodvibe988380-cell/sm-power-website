import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, Cog, Droplets, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Zap,
    title: 'Electrical Services',
    description: 'Power distribution, lighting design, and energy-efficient systems.',
  },
  {
    icon: Cog,
    title: 'Mechanical Services',
    description: 'HVAC, ventilation, and climate control solutions.',
  },
  {
    icon: Droplets,
    title: 'Plumbing Solutions',
    description: 'Water supply, drainage, and sanitary systems design.',
  },
  {
    icon: Network,
    title: 'Networking Infrastructure',
    description: 'Structured cabling, data centers, and smart building integration.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

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
      // Left dark panel wipe reveal
      scrollTl.fromTo(
        panelRef.current,
        { x: '-46vw' },
        { x: 0, ease: 'none' },
        0
      );

      // Text content stagger
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

      scrollTl.fromTo(
        ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // Services cards stagger
      const serviceCards = servicesRef.current?.querySelectorAll('.service-card');
      if (serviceCards) {
        scrollTl.fromTo(
          serviceCards,
          { y: '6vh', opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.03, ease: 'none' },
          0.15
        );
      }

      // Right image card enters from right
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

      if (serviceCards) {
        scrollTl.fromTo(
          serviceCards,
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
      id="services"
      className="section-pinned"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/capabilities_analysis.jpg"
          alt="Infrastructure planning"
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
                Services
              </span>

              {/* Headline */}
              <h2
                ref={headlineRef}
                className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight"
              >
                Full-spectrum MEP design & coordination.
              </h2>

              {/* Body */}
              <p
                ref={bodyRef}
                className="text-base lg:text-lg text-white/70 mt-6 leading-relaxed"
              >
                From concept to commissioning—electrical, mechanical, plumbing, and 
                low-voltage systems—designed for performance, maintainability, and 
                cost control.
              </p>

              {/* Services Grid */}
              <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="service-card group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <service.icon className="w-6 h-6 text-gold mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-heading font-semibold text-white text-sm mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {service.description}
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
                Explore services
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
                alt="Building systems"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                <div>
                  <p className="font-heading font-bold text-3xl text-gold">50+</p>
                  <p className="font-mono text-xs text-white/60 uppercase tracking-wider">Projects</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-3xl text-gold">10+</p>
                  <p className="font-mono text-xs text-white/60 uppercase tracking-wider">Years</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-3xl text-gold">100%</p>
                  <p className="font-mono text-xs text-white/60 uppercase tracking-wider">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
