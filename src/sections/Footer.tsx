import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Linkedin, Twitter, Youtube, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy', href: '#' },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Flowing animation - fade in when entering viewport
      gsap.fromTo(
        contentRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 0.8,
      scrollTo: 0,
      ease: 'power3.inOut',
    });
  };

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: element, offsetY: 0 },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-slate-50 border-t border-slate-200"
    >
      <div ref={contentRef} className="w-full px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-slate-300 bg-white flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5 text-gold" />
              </div>
              <span className="font-heading font-bold text-xl tracking-wider text-slate-900">
                SM POWER SOLUTIONS
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed max-w-md mb-6">
              Powering modern infrastructure with reliable electrical and mechanical engineering services.
            </p>
            <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">
              Shivamogga, Karnataka, India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-600 hover:text-slate-900 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-slate-900 mb-6">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-gold/50 hover:bg-gold/10 transition-all duration-300 group shadow-sm"
                >
                  <social.icon className="w-4 h-4 text-slate-500 group-hover:text-gold transition-colors" />
                </a>
              ))}
            </div>
            
            {/* Contact mini */}
            <div className="mt-6 space-y-2">
              <a 
                href="tel:+919611951518" 
                className="block text-slate-600 hover:text-slate-900 transition-colors text-sm"
              >
                +91 96119 51518
              </a>
              <a 
                href="mailto:prithviraj.smps@gmail.com" 
                className="block text-slate-600 hover:text-slate-900 transition-colors text-sm"
              >
                prithviraj.smps@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © 2026 SM Power Solutions. All rights reserved.
          </p>
          
          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span className="text-sm">Back to top</span>
            <div className="w-8 h-8 rounded-full border border-slate-300 group-hover:border-gold flex items-center justify-center bg-white shadow-sm transition-colors">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-slate-600 group-hover:text-gold" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
