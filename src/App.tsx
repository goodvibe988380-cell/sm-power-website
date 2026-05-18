import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  Droplets,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Sun,
  Wrench,
  X,
} from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';
import WhatsAppButton from './sections/WhatsAppButton';
import ResidentialSection from './sections/ResidentialSection';
import Gallery from './components/Gallery';
import { AboutPage, ContactPage, GalleryPage, ProjectsPage, ServicesPage } from './pages/SitePages';
import './App.css';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

const servicePillars = [
  {
    icon: PlugZap,
    title: 'Electrical Works',
    description: 'Premium wiring, panels, earthing, lighting, automation and power distribution for safe modern spaces.',
  },
  {
    icon: Sun,
    title: 'Solar Installation',
    description: 'Efficient solar planning and installation support for homes, apartments and commercial properties.',
  },
  {
    icon: BatteryCharging,
    title: 'Power Backup',
    description: 'Reliable backup power solutions, EV readiness and system planning for uninterrupted operations.',
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    description: 'Responsive AMC, fault rectification, inspection and preventive maintenance for long-term performance.',
  },
  {
    icon: Droplets,
    title: 'Plumbing',
    description: 'Clean water supply, drainage, sanitary fittings, bathroom installation and repair support.',
  },
];

const detailedServices = [
  {
    title: 'Design and Consultation',
    items: ['SLD (Single line diagram)', 'Panel designing', 'Looping drawing', 'Switch box schedule', 'Load calculation and power sanction'],
  },
  {
    title: 'Electrical Services',
    items: [
      'Electrical house wiring',
      'Earthing',
      'Lightning arrestor installation',
      'Solar panel installation',
      'Profile, decorative, chandelier, outdoor, waterbody, wardrobe sensor, staircase and downlight installation',
      'Automation (wired / wireless)',
      'Panel installation and termination',
      'Car charging points',
      'Renovation electrical work',
      'AMC',
    ],
  },
  {
    title: 'Extra Low Voltage (ELV)',
    items: ['Camera installation and configuration', 'Data and access points', 'Intercom', 'Speaker', 'FA and PA systems', 'AMC'],
  },
  {
    title: 'Plumbing Services',
    items: [
      'Residential plumbing repair',
      'Bathroom plumbing installation',
      'Water supply line work',
      'Drainage and sanitary support',
      'Apartment plumbing upgrades',
      'Maintenance and leak rectification',
    ],
  },
  {
    title: 'ESCOM Office Works',
    items: ['Temporary power sanction', 'Permanent power sanction', 'Load enhancement / reduction', 'HT power sanction', 'Name changing', 'Meter replacement'],
  },
];

const trustStats = [
  { value: '500+', label: 'Projects' },
  { value: '24/7', label: 'Fast installation support' },
  { value: '100%', label: 'Customer-focused pricing' },
];

const whyCounters = [
  { value: 500, suffix: '+', label: 'Projects' },
  { value: 24, suffix: '/7', label: 'Fast Installation' },
  { value: 100, suffix: '%', label: 'Affordable Pricing' },
  { value: 10, suffix: '+', label: 'Expert Team' },
];

const processSteps = [
  {
    title: 'Site Visit & Requirement Study',
    text: 'We understand the site, MEP scope, load needs, service routing, safety requirements and approval path before execution begins.',
  },
  {
    title: 'Design, Estimate & Documentation',
    text: 'SLD, panel planning, switch box schedule, load calculation and material planning are prepared with clarity.',
  },
  {
    title: 'Installation & Coordination',
    text: 'HVAC coordination, wiring, plumbing, networking, ELV, lighting, earthing, automation and site work are coordinated cleanly.',
  },
  {
    title: 'Testing, Handover & AMC',
    text: 'Final checks, customer handover and maintenance support help keep the installation dependable after completion.',
  },
];

const whyChoose = [
  {
    icon: ShieldCheck,
    title: 'Safety-first MEP execution',
    text: 'Practical MEP work with attention to protection, neatness, service access and long-term reliability.',
  },
  {
    icon: Landmark,
    title: 'Approval guidance',
    text: 'Support for power sanction, load enhancement, HT sanction, meter replacement and name change work.',
  },
  {
    icon: Sparkles,
    title: 'Premium finish',
    text: 'Lighting, automation and panel work delivered with a clean finish suitable for modern interiors.',
  },
  {
    icon: Sun,
    title: 'Future-ready systems',
    text: 'HVAC, solar, EV charging, ELV, networking and automation options planned for evolving needs.',
  },
];

const industries = ['Homes', 'Apartments', 'Offices', 'Retail Spaces', 'Commercial Buildings', 'Industrial Sites'];

const businessDetails = [
  ['Proprietor', 'Prithviraj S P'],
  ['Service Area', 'Shivamogga and nearby Karnataka regions'],
  ['Website', 'smpowersolutions.in'],
];

const heroSupportTiles = [
  { label: 'HVAC', className: 'text-xl sm:text-2xl' },
  { label: 'ELECTRICAL', className: 'text-[15px] sm:text-xl' },
  { label: 'PLUMBING', className: 'text-[15px] sm:text-xl' },
  { label: 'NETWORKING', className: 'text-[14px] sm:text-lg' },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 55;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (frame >= totalFrames) {
        window.clearInterval(timer);
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const isHomePage = currentPath === '/';
  const routePage =
    currentPath === '/about' ? (
      <AboutPage />
    ) : currentPath === '/services' ? (
      <ServicesPage />
    ) : currentPath === '/projects' ? (
      <ProjectsPage />
    ) : currentPath === '/gallery' ? (
      <GalleryPage />
    ) : currentPath === '/contact' ? (
      <ContactPage />
    ) : (
      <AboutPage />
    );

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  const handleConsultationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const text = encodeURIComponent(
      `Hi SM Power Solutions, I need a free consultation.\nName: ${name}\nPhone: ${phone}\nRequirement: ${message}`
    );
    window.open(`https://wa.me/919611951518?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {showIntro && isHomePage && (
        <div className="intro-overlay fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black">
          <div className="circuit-grid" aria-hidden="true" />
          <div className="energy-trace energy-trace-horizontal" aria-hidden="true" />
          <div className="energy-trace energy-trace-vertical" aria-hidden="true" />
          <div className="activation-flash" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <img src="/smps-logo.png" alt="SM Power Solutions logo" className="intro-logo h-32 w-auto sm:h-40" />
            <p className="intro-tagline mt-7 font-heading text-sm font-bold uppercase tracking-[0.28em] text-[#FFD700] sm:text-lg">
              Power Rules the World. We Rule Power.
            </p>
          </div>
        </div>
      )}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080808]/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="SM Power Solutions home">
            <img src="/smps-logo.png" alt="" className="h-11 w-auto shadow-[0_0_24px_rgba(255,196,0,0.22)]" />
            <span className="font-heading text-base font-black tracking-[0.14em] text-[#FFC400] sm:text-lg">
              SM POWER SOLUTIONS
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-xs uppercase tracking-[0.22em] transition-colors hover:text-[#D4AF37] ${
                  currentPath === link.href ? 'text-[#D4AF37]' : 'text-white/60'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="https://wa.me/919611951518" className="rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-bold text-[#090909] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(255,215,0,0.32)]">
              Get Quote
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        <div
          className={`md:hidden overflow-hidden border-t border-white/10 bg-[#080808]/96 transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mx-auto grid max-w-7xl gap-2 px-5 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-colors ${
                  currentPath === link.href ? 'bg-[#D4AF37] text-[#080808]' : 'text-white/68 hover:bg-white/5 hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main>
        {isHomePage ? (
          <>
        <section id="home" className="relative isolate min-h-screen overflow-hidden pt-16 lg:pt-20">
          <img src="/hero_control_room.jpg" alt="MEP control room" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(0,0,0,0.94),rgba(17,17,17,0.86),rgba(0,0,0,0.72))]" />
          <div className="energy-lines absolute inset-0 -z-10 opacity-55" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-[#080808] to-transparent" />

          <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center gap-10 px-5 py-14 text-center lg:px-8">
            <div className="mx-auto max-w-5xl">
              <img src="/smps-logo.png" alt="SM Power Solutions logo" className="mx-auto h-28 w-auto drop-shadow-[0_0_34px_rgba(255,215,0,0.28)] sm:h-36" />
              <h1 className="mt-8 font-heading text-4xl font-black uppercase leading-[0.95] tracking-[0.08em] text-white sm:text-6xl lg:text-7xl">
                SM <span className="text-[#FFD700]">POWER</span> SOLUTIONS
              </h1>
              <p className="mx-auto mt-5 max-w-3xl font-heading text-xl font-semibold text-[#FFD700] sm:text-2xl">
                Power Rules the World. We Rule Power.
              </p>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                Premium MEP services for HVAC, electrical, plumbing, networking, solar, backup power and maintenance, delivered with clean planning and dependable site execution.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="https://wa.me/919611951518?text=Hi%20SM%20Power%20Solutions%2C%20I%20need%20a%20free%20quote." className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-8 py-4 font-bold text-black shadow-[0_0_34px_rgba(255,215,0,0.24)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_44px_rgba(255,215,0,0.42)]">
                  Get Free Quote <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FFD700]/55 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-[#FFD700] hover:text-[#FFD700]">
                  Explore Services
                </a>
              </div>
              <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
                {trustStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-5">
                    <p className="font-heading text-2xl font-black text-[#FFD700]">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-white/56">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-black/42 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {heroSupportTiles.map((item) => (
                  <div key={item.label} className="flex min-h-24 min-w-0 flex-col items-center justify-center rounded-xl border border-[#FFD700]/25 bg-[#FFD700]/10 px-2 py-4 text-center">
                    <p className={`w-full whitespace-nowrap font-heading font-black uppercase leading-none tracking-normal text-[#FFD700] ${item.className}`}>{item.label}</p>
                    <p className="mt-1 text-xs text-white/55">MEP Support</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#080808] py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img src="/about_team.jpg" alt="SM Power Solutions team" className="h-full min-h-[380px] w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-mono text-xs uppercase tracking-[0.36em] text-[#D4AF37]">About SMPS</p>
              <h2 className="mt-4 max-w-2xl font-heading text-4xl font-black leading-tight sm:text-5xl">
                Practical engineering for homes, offices and commercial projects.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                From MEP drawings and load calculation to site execution and approval support, SMPS keeps every stage organized so customers get clear communication and reliable workmanship.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['Design', 'MEP drawings, SLD and calculation'],
                  ['Install', 'HVAC, wiring, lighting, plumbing and networks'],
                  ['Approve', 'Power sanction and coordination support'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                    <CheckCircle2 className="h-6 w-6 text-[#D4AF37]" />
                    <h3 className="mt-4 font-heading text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/58">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="why-smps" className="relative overflow-hidden bg-[#0d0d0d] py-20 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.18),transparent_34%),radial-gradient(circle_at_80%_30%,rgba(212,175,55,0.1),transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.36em] text-[#D4AF37]">Why Choose SMPS</p>
                <h2 className="mt-4 max-w-3xl font-heading text-4xl font-black leading-tight sm:text-5xl">
                  Rich finish, careful planning and dependable MEP support.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
                  Every project is handled with a balance of technical clarity, neat execution and responsive support, from first discussion to final handover.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {whyChoose.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-white/10 bg-[#080808]/80 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.25)]">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/58">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whyCounters.map((counter) => (
                <div key={counter.label} className="rounded-2xl border border-[#FFD700]/20 bg-black/55 p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
                  <p className="font-heading text-4xl font-black text-[#FFD700]">
                    <CountUp value={counter.value} suffix={counter.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white/70">{counter.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/20">
                <img src="/capabilities_analysis.jpg" alt="MEP planning and analysis" className="h-full min-h-[420px] w-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 lg:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#D4AF37]">Our Process</p>
                <div className="mt-7 grid gap-5">
                  {processSteps.map((step, index) => (
                    <div key={step.title} className="grid gap-4 rounded-2xl border border-white/10 bg-[#080808]/70 p-5 sm:grid-cols-[auto_1fr]">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#D4AF37] font-heading font-black text-[#080808]">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-white">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/58">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#111111] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.36em] text-[#D4AF37]">Core Services</p>
                <h2 className="mt-4 font-heading text-4xl font-black leading-tight sm:text-5xl">
                  Complete HVAC, electrical, plumbing, networking and approval support.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/56">
                A single point of support for MEP planning, installation, HVAC coordination, power systems, networking, plumbing, automation, maintenance and sanction work.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {servicePillars.map((service) => (
                <article key={service.title} className="group rounded-2xl border border-white/10 bg-[#080808] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD700]/50 hover:shadow-[0_0_34px_rgba(255,215,0,0.16)]">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#FFD700]/10 text-[#FFD700] transition-transform duration-300 group-hover:scale-105">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{service.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {detailedServices.map((service) => (
                <article key={service.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6">
                  <h3 className="font-heading text-2xl font-bold text-white">{service.title}</h3>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-white/68">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.07] p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#D4AF37]">Industries Served</p>
                  <h3 className="mt-3 font-heading text-2xl font-bold text-white">Built for residential, commercial and industrial MEP service needs.</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {industries.map((industry) => (
                    <span key={industry} className="rounded-full border border-white/10 bg-[#080808]/70 px-4 py-2 text-sm text-white/72">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ResidentialSection />

        <Gallery />

        <section id="contact" className="relative overflow-hidden bg-[#111111] py-20 lg:py-28">
          <img src="/contact_office.jpg" alt="SM Power Solutions contact office" className="absolute inset-0 h-full w-full object-cover opacity-18" />
          <div className="absolute inset-0 bg-[#080808]/88" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.36em] text-[#D4AF37]">Contact</p>
              <h2 className="mt-4 max-w-3xl font-heading text-4xl font-black leading-tight sm:text-5xl">
                Ready to discuss your MEP requirement?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                Call, mail or message directly on WhatsApp for HVAC, electrical, plumbing, networking, ELV or approval support.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-4 border-b border-white/10 pb-6">
                <img src="/smps-logo.png" alt="" className="h-14 w-auto" />
                <div>
                  <p className="font-heading text-xl font-black uppercase text-[#FFC400]">SM Power Solutions</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.12em] text-[#FFC400]/80">Power Rules The World We Rule The Power</p>
                </div>
              </div>
              <div className="grid gap-4">
                <a href="tel:+919611951518" className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#080808]/60 p-4 transition-colors hover:border-[#D4AF37]/45">
                  <Phone className="h-5 w-5 text-[#D4AF37]" />
                  <span className="font-semibold">+91 96119 51518</span>
                </a>
                <a href="mailto:prithviraj.smps@gmail.com" className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#080808]/60 p-4 transition-colors hover:border-[#D4AF37]/45">
                  <Mail className="h-5 w-5 text-[#D4AF37]" />
                  <span className="break-all font-semibold">prithviraj.smps@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#080808]/60 p-4">
                  <MapPin className="h-5 w-5 text-[#D4AF37]" />
                  <span className="font-semibold">Shivamogga, Karnataka</span>
                </div>
              </div>
              <form onSubmit={handleConsultationSubmit} className="mt-6 rounded-xl border border-[#FFD700]/20 bg-black/35 p-4">
                <h3 className="font-heading text-xl font-black text-white">Get Your Free Consultation Today</h3>
                <div className="mt-4 grid gap-3">
                  <input
                    name="name"
                    required
                    placeholder="Name"
                    className="h-12 rounded-xl border border-white/10 bg-[#080808]/70 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/38 focus:border-[#FFD700]/70"
                  />
                  <input
                    name="phone"
                    required
                    inputMode="tel"
                    placeholder="Phone"
                    className="h-12 rounded-xl border border-white/10 bg-[#080808]/70 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/38 focus:border-[#FFD700]/70"
                  />
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us your requirement"
                    className="resize-none rounded-xl border border-white/10 bg-[#080808]/70 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/38 focus:border-[#FFD700]/70"
                  />
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-6 py-3 font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_rgba(255,215,0,0.34)]">
                    Send on WhatsApp <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </form>
              <dl className="mt-5 grid gap-3 rounded-xl border border-white/10 bg-[#080808]/50 p-4">
                {businessDetails.map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <dt className="text-xs uppercase tracking-[0.22em] text-white/42">{label}</dt>
                    <dd className="text-sm font-semibold text-white/78 sm:text-right">{value}</dd>
                  </div>
                ))}
              </dl>
              <a href="https://wa.me/919611951518" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-4 font-bold text-[#080808] transition-transform hover:-translate-y-0.5">
                WhatsApp Enquiry <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
          </>
        ) : (
          routePage
        )}
      </main>

      <footer className="border-t border-white/10 bg-[#080808] px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-sm text-white/52 sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/smps-logo.png" alt="" className="h-10 w-auto" />
            <span>SM Power Solutions. Power Rules The World We Rule The Power.</span>
          </div>
          <a href="mailto:prithviraj.smps@gmail.com" className="transition-colors hover:text-[#D4AF37]">
            prithviraj.smps@gmail.com
          </a>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}

export default App;
