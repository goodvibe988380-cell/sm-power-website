import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowRight, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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

      // Contact items stagger
      const contactItems = contactRef.current?.querySelectorAll('.contact-item');
      if (contactItems) {
        scrollTl.fromTo(
          contactItems,
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

      if (contactItems) {
        scrollTl.fromTo(
          contactItems,
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

  return (
    <section
      ref={sectionRef}
      id="contact"
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
            {/* Left Image Card */}
            <div
              ref={imageRef}
              className="w-full lg:w-[40vw] h-[40vh] lg:h-[64vh] rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="/contact_office.jpg"
                alt="Contact Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              
              {/* Contact info overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-4 rounded-xl bg-slate-950/70 backdrop-blur-sm border border-slate-200/40">
                  <p className="font-heading font-semibold text-white">SM POWER SOLUTIONS</p>
                  <p className="font-mono text-xs text-gold/80 uppercase tracking-wider mt-1">Shivamogga, Karnataka</p>
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
                Contact
              </span>

              {/* Headline */}
              <h2
                ref={headlineRef}
                className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight tracking-tight"
              >
                Ready when you are.
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
                Tell us what you're building. We'll respond within one business day 
                with next steps and a clear scope of work.
              </p>

              {/* Contact Details */}
              <div ref={contactRef} className="mt-8 space-y-4">
                <a
                  href="tel:+919611951518"
                  className="contact-item group flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-slate-200/60 hover:border-gold/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">Phone</p>
                    <p className="font-heading font-medium text-slate-900 group-hover:text-gold transition-colors">+91 96119 51518</p>
                  </div>
                </a>

                <a
                  href="mailto:prithviraj.smps@gmail.com"
                  className="contact-item group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">Email</p>
                    <p className="font-heading font-medium text-slate-900 group-hover:text-gold transition-colors">prithviraj.smps@gmail.com</p>
                  </div>
                </a>

                <div className="contact-item flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">Website</p>
                    <p className="font-heading font-medium text-slate-900">smpowersolutions.in</p>
                  </div>
                </div>

                <div className="contact-item flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">Location</p>
                    <p className="font-heading font-medium text-slate-900">Shivamogga, Karnataka</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                ref={ctaRef}
                href="mailto:prithviraj.smps@gmail.com"
                className="group inline-flex mt-8 px-6 py-3 bg-gold text-dark font-heading font-semibold rounded-full items-center gap-2 hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5"
              >
                Send a message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
