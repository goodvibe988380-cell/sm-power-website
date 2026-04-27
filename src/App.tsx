import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardList,
  Images,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Sun,
} from 'lucide-react';
import WhatsAppButton from './sections/WhatsAppButton';
import ResidentialSection from './sections/ResidentialSection';
import Gallery from './components/Gallery';
import './App.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Why SMPS', href: '#why-smps' },
  { label: 'Services', href: '#services' },
  { label: 'Residential', href: '#residential' },
  { label: 'Gallery', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const servicePillars = [
  {
    icon: ClipboardList,
    title: 'Design & Consultation',
    description: 'SLD, panel designing, looping drawing, switch box schedule, load calculation and power sanction.',
  },
  {
    icon: PlugZap,
    title: 'Electrical Services',
    description: 'House wiring, earthing, lightning arrestor, solar panels, lighting, automation, panels, EV points and AMC.',
  },
  {
    icon: Camera,
    title: 'Extra Low Voltage',
    description: 'Camera installation, data and access points, intercom, speakers, FA and PA systems and AMC.',
  },
  {
    icon: Building2,
    title: 'ESCOM Office Works',
    description: 'Temporary and permanent power sanction, load changes, HT sanction, name changing and meter replacement.',
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
    title: 'ESCOM Office Works',
    items: ['Temporary power sanction', 'Permanent power sanction', 'Load enhancement / reduction', 'HT power sanction', 'Name changing', 'Meter replacement'],
  },
];

const trustStats = [
  { value: '4', label: 'Core service verticals' },
  { value: '360', label: 'Design to handover support' },
  { value: '24/7', label: 'WhatsApp enquiry access' },
];

const processSteps = [
  {
    title: 'Site Visit & Requirement Study',
    text: 'We understand the site, load needs, electrical scope, safety requirements and approval path before execution begins.',
  },
  {
    title: 'Design, Estimate & Documentation',
    text: 'SLD, panel planning, switch box schedule, load calculation and material planning are prepared with clarity.',
  },
  {
    title: 'Installation & Coordination',
    text: 'Wiring, panel termination, ELV, lighting, earthing, automation and site work are coordinated cleanly.',
  },
  {
    title: 'Testing, Handover & AMC',
    text: 'Final checks, customer handover and maintenance support help keep the installation dependable after completion.',
  },
];

const whyChoose = [
  {
    icon: ShieldCheck,
    title: 'Safety-first execution',
    text: 'Practical electrical work with attention to protection, neatness and long-term reliability.',
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
    text: 'Solar, EV charging, ELV, access points and automation options planned for evolving needs.',
  },
];

const industries = ['Homes', 'Apartments', 'Offices', 'Retail Spaces', 'Commercial Buildings', 'Industrial Sites'];

const businessDetails = [
  ['Proprietor', 'Prithviraj S P'],
  ['Service Area', 'Shivamogga and nearby Karnataka regions'],
  ['Website', 'smpowersolutions.in'],
];

const projectCards = [
  {
    title: 'Electrical Execution',
    category: 'Electrical',
    image: '/electrical_services.jpg',
    text: 'Clean wiring, terminations and installation support for residential and commercial spaces.',
  },
  {
    title: 'Design Consultation',
    category: 'Design',
    image: '/design_consultation.jpg',
    text: 'Documentation-first planning for load calculation, layouts, SLD and approvals.',
  },
  {
    title: 'ELV Systems',
    category: 'ELV',
    image: '/elv_services.jpg',
    text: 'Security, access, communication and building low-voltage infrastructure.',
  },
  {
    title: 'ESCOM Office Support',
    category: 'Approvals',
    image: '/escom_office.jpg',
    text: 'Power sanction, meter replacement and load change coordination support.',
  },
  {
    title: 'Panel Quality Work',
    category: 'Panels',
    image: '/quality_panel.jpg',
    text: 'Neat panel work, reliable protection and site-ready electrical finishing.',
  },
  {
    title: 'Site Coordination',
    category: 'Site Work',
    image: '/project_1.jpg',
    text: 'On-site electrical progress, coordination and handover-focused execution.',
  },
  {
    title: 'Solar & Lighting',
    category: 'Installation',
    image: '/project_2.jpg',
    text: 'Lighting, solar and service installation for modern building requirements.',
  },
  {
    title: 'Commercial Systems',
    category: 'Commercial',
    image: '/project_3.jpg',
    text: 'Electrical and ELV support for offices, shops and commercial interiors.',
  },
];

function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080808]/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="SM Power Solutions home">
            <img src="/smps-logo.svg" alt="" className="h-11 w-11 rounded-2xl shadow-[0_0_24px_rgba(212,175,55,0.18)]" />
            <span className="font-heading text-base font-black tracking-[0.14em] sm:text-lg">
              SM <span className="text-[#D4AF37]">POWER</span> SOLUTIONS
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="font-mono text-xs uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-[#D4AF37]">
                {link.label}
              </a>
            ))}
            <a href="#contact" className="rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-bold text-[#090909] transition-transform hover:-translate-y-0.5">
              Get Quote
            </a>
          </div>

          <a href="#services" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white md:hidden" aria-label="Open services">
            <Menu className="h-5 w-5" />
          </a>
        </nav>
      </header>

      <main>
        <section className="relative isolate min-h-screen overflow-hidden pt-16 lg:pt-20">
          <img src="/hero_control_room.jpg" alt="Electrical control room" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080808] via-[#080808]/82 to-[#080808]/30" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-[#080808] to-transparent" />

          <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_0.78fr] lg:px-8">
            <div className="max-w-3xl">
              <img src="/smps-logo.svg" alt="SM Power Solutions logo" className="mb-6 h-20 w-20 rounded-3xl shadow-[0_0_38px_rgba(212,175,55,0.28)]" />
              <p className="font-mono text-xs uppercase tracking-[0.36em] text-[#D4AF37]">Shivamogga electrical and ELV specialists</p>
              <h1 className="mt-5 font-heading text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Premium electrical work for modern spaces.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                SM Power Solutions delivers design consultation, electrical execution, ELV systems and ESCOM office support with clean planning, safe installation and dependable site work.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-4 font-bold text-[#080808] transition-transform hover:-translate-y-0.5">
                  Explore Services <ArrowRight className="h-5 w-5" />
                </a>
                <a href="tel:+919611951518" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]">
                  <Phone className="h-5 w-5" /> Call Now
                </a>
              </div>
              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                {trustStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-5">
                    <p className="font-heading text-2xl font-black text-[#D4AF37]">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-white/56">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-sm">
              <img src="/quality_panel.jpg" alt="Electrical panel quality work" className="h-64 w-full rounded-xl object-cover sm:h-80" />
              <div className="grid grid-cols-3 gap-3">
                {['SLD', 'ELV', 'ESCOM'].map((item) => (
                  <div key={item} className="rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-4 text-center">
                    <p className="font-heading text-lg font-black text-[#D4AF37]">{item}</p>
                    <p className="mt-1 text-xs text-white/55">Support</p>
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
                From drawings and load calculation to site execution and approval support, SMPS keeps every stage organized so customers get clear communication and reliable workmanship.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['Design', 'Drawings, SLD and calculation'],
                  ['Install', 'Wiring, lighting and panels'],
                  ['Approve', 'ESCOM coordination support'],
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
                  Rich finish, careful planning and dependable electrical support.
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

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/20">
                <img src="/capabilities_analysis.jpg" alt="Electrical planning and analysis" className="h-full min-h-[420px] w-full object-cover" loading="lazy" />
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
                  Complete electrical, ELV and approval support.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/56">
                A single point of support for planning, installation, low-voltage systems, lighting, automation, maintenance and power sanction work.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {servicePillars.map((service) => (
                <article key={service.title} className="group rounded-2xl border border-white/10 bg-[#080808] p-6 transition-colors hover:border-[#D4AF37]/45">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
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
                  <h3 className="mt-3 font-heading text-2xl font-bold text-white">Built for residential, commercial and industrial electrical needs.</h3>
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
                Ready to discuss your electrical requirement?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                Call, mail or message directly on WhatsApp for design, installation, ELV or ESCOM support.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-4 border-b border-white/10 pb-6">
                <img src="/smps-logo.svg" alt="" className="h-14 w-14 rounded-2xl" />
                <div>
                  <p className="font-heading text-xl font-black">SM Power Solutions</p>
                  <p className="mt-1 text-sm text-white/56">Electrical services, ELV and ESCOM works</p>
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
      </main>

      <footer className="border-t border-white/10 bg-[#080808] px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-sm text-white/52 sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/smps-logo.svg" alt="" className="h-10 w-10 rounded-xl" />
            <span>SM Power Solutions. Electrical Services, ELV and ESCOM Office Works.</span>
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
