import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import {
  completedProjectImages,
  galleryImages,
  ongoingProjectImages,
  type GeneratedImage,
} from '../data/imageManifest';

type LightboxImage = {
  title: string;
  category: string;
  location?: string;
  description?: string;
  src: string;
};

const serviceCards = [
  {
    title: 'Solar Installation',
    category: 'Solar',
    image: '/images/customer-reference/rooftop-solar-reference.png',
    description: 'Rooftop solar planning, panel installation, DC/AC cabling and commissioning support.',
  },
  {
    title: 'Electrical Panel Work',
    category: 'Panels',
    image: '/images/customer-reference/panel-wiring-reference.png',
    description: 'Panel installation, termination, meter panels, DB work and clean load distribution.',
  },
  {
    title: 'Industrial Wiring',
    category: 'Wiring',
    image: '/images/customer-reference/residential-wiring-reference.png',
    description: 'Structured power routing, lighting circuits, earthing and site-ready industrial wiring.',
  },
  {
    title: 'LT/HT Electrical Work',
    category: 'LT/HT',
    image: '/escom_office.jpg',
    description: 'LT/HT coordination, load sanction support, documentation and power approval guidance.',
  },
  {
    title: 'Maintenance Services',
    category: 'Maintenance',
    image: '/lifecycle_site.jpg',
    description: 'AMC, preventive inspection, troubleshooting, repairs and dependable post-handover support.',
  },
  {
    title: 'Transformer Services',
    category: 'Transformer',
    image: '/images/completed-projects/transformer-yard-installation.jpg',
    description: 'Transformer placement, inspection coordination, service planning and connected panel support.',
  },
];

const aboutCounters = [
  { value: 500, suffix: '+', label: 'Projects handled' },
  { value: 10, suffix: '+', label: 'Expert team members' },
  { value: 24, suffix: '/7', label: 'Support mindset' },
  { value: 100, suffix: '%', label: 'Customer focus' },
];

function useAutoIndex(length: number, delay = 3600) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % length);
    }, delay);

    return () => window.clearInterval(timer);
  }, [delay, length]);

  return [index, setIndex] as const;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 56;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (frame >= totalFrames) {
        window.clearInterval(timer);
      }
    }, 22);

    return () => window.clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-28 lg:pt-32">
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(0,0,0,0.94),rgba(8,8,8,0.88),rgba(0,0,0,0.72))]" />
      <div className="energy-lines absolute inset-0 -z-10 opacity-35" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.36em] text-[#D4AF37]">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-black leading-tight text-white sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">{text}</p>
      </div>
    </section>
  );
}

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setImageSrc('/project_1.jpg')}
    />
  );
}

function Lightbox({
  item,
  onClose,
}: {
  item: LightboxImage | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/92 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#080808]" onClick={(event) => event.stopPropagation()}>
        <ImageWithFallback src={item.src} alt={item.title} className="max-h-[76vh] w-full object-contain" />
        <div className="border-t border-white/10 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-[#D4AF37]">{item.category}</p>
          <h3 className="mt-2 font-heading text-xl font-bold text-white">{item.title}</h3>
          {item.location && <p className="mt-1 text-sm font-semibold text-white/58">{item.location}</p>}
          {item.description && <p className="mt-3 text-sm leading-6 text-white/68">{item.description}</p>}
        </div>
      </div>
    </div>
  );
}

function filterImages(images: GeneratedImage[], filter: string) {
  return images.filter((item) => filter === 'All' || item.category === filter);
}

function GalleryGrid({ images }: { images: GeneratedImage[] }) {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<LightboxImage | null>(null);
  const categories = useMemo(() => ['All', ...Array.from(new Set(images.map((item) => item.category)))], [images]);
  const visibleImages = useMemo(() => filterImages(images, filter), [filter, images]);

  return (
    <>
      <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              filter === category
                ? 'border-[#D4AF37] bg-[#D4AF37] text-[#080808]'
                : 'border-white/10 bg-white/5 text-white/62 hover:border-[#D4AF37]/45 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {visibleImages.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setSelected(item)}
            className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] text-left shadow-[0_20px_58px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40"
          >
            <div className={`relative overflow-hidden bg-[#080808] ${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
              <ImageWithFallback src={item.src} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/12 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition-colors group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">
                <Search className="h-4 w-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#D4AF37]">{item.category}</p>
                <h3 className="mt-2 font-heading text-lg font-bold text-white">{item.title}</h3>
                {item.description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/68">{item.description}</p>}
              </div>
            </div>
          </button>
        ))}
      </div>

      {visibleImages.length === 0 && (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.045] p-10 text-center text-white/58">
          Drop images into the matching public folder and run the site again to refresh this gallery.
        </div>
      )}

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SMPS"
        title="Practical power engineering for modern homes, businesses and sites."
        text="SM Power Solutions brings electrical, solar, panel, maintenance, plumbing, networking and approval support into one dependable execution partner."
        image="/about_team.jpg"
      />
      <section className="bg-[#080808] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img src="/capabilities_analysis.jpg" alt="SMPS engineering planning" className="h-full min-h-[420px] w-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.36em] text-[#D4AF37]">Vision and Mission</p>
            <h2 className="mt-4 font-heading text-4xl font-black leading-tight text-white sm:text-5xl">
              Clean execution, clear communication and reliable long-term power systems.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/66">
              Our vision is to make dependable MEP and electrical services accessible with a premium finish. Our mission is to plan carefully, execute neatly and support customers after handover.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Safety-first site work', 'Neat premium finishing', 'Approval and documentation support', 'Responsive maintenance'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                  <CheckCircle2 className="h-6 w-6 text-[#D4AF37]" />
                  <p className="mt-4 font-heading text-lg font-bold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-14 grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {aboutCounters.map((counter) => (
            <div key={counter.label} className="rounded-2xl border border-[#FFD700]/20 bg-black/55 p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
              <p className="font-heading text-4xl font-black text-[#FFD700]">
                <Counter value={counter.value} suffix={counter.suffix} />
              </p>
              <p className="mt-2 text-sm font-semibold text-white/70">{counter.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#111111] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.36em] text-[#D4AF37]">Experience</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {['Residential and villa projects', 'Commercial and hospitality sites', 'Industrial and LT/HT support'].map((item) => (
              <article key={item} className="rounded-2xl border border-white/10 bg-[#080808] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40">
                <ShieldCheck className="h-7 w-7 text-[#D4AF37]" />
                <h3 className="mt-5 font-heading text-xl font-bold text-white">{item}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">
                  Planned with practical engineering, reliable manpower and clear execution milestones.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Complete electrical, solar, panel and maintenance execution."
        text="Premium service capabilities for homes, apartments, commercial spaces, hospitality projects and industrial sites."
        image="/services_mechanical.jpg"
      />
      <section className="bg-[#080808] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 xl:grid-cols-3 lg:px-8">
          {serviceCards.map((service) => (
            <article key={service.title} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45 hover:shadow-[0_24px_80px_rgba(212,175,55,0.12)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#080808]">
                <ImageWithFallback src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/24 to-transparent" />
                <p className="absolute left-5 top-5 rounded-full border border-[#D4AF37]/30 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                  {service.category}
                </p>
              </div>
              <div className="p-6">
                <h2 className="font-heading text-2xl font-black text-white">{service.title}</h2>
                <p className="mt-3 min-h-[4.5rem] text-sm leading-7 text-white/62">{service.description}</p>
                <a href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-bold text-[#080808] transition-transform hover:-translate-y-0.5">
                  View details <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectSection({ title, images, status }: { title: string; images: GeneratedImage[]; status: 'Completed' | 'Ongoing' }) {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<LightboxImage | null>(null);
  const visibleImages = useMemo(() => filterImages(images, filter), [filter, images]);
  const categories = useMemo(() => ['All', ...Array.from(new Set(images.map((item) => item.category)))], [images]);
  const [activeIndex, setActiveIndex] = useAutoIndex(visibleImages.length);
  const activeImage = visibleImages[activeIndex % Math.max(visibleImages.length, 1)];

  useEffect(() => {
    setActiveIndex(0);
  }, [filter, setActiveIndex]);

  return (
    <section className="bg-[#080808] py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-[#D4AF37]">{status} Projects</p>
            <h2 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">{title}</h2>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  filter === category
                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#080808]'
                    : 'border-white/10 bg-white/5 text-white/62 hover:border-[#D4AF37]/45 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {activeImage && (
          <button
            type="button"
            onClick={() => setSelected(activeImage)}
            className="group mt-8 block w-full overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-white/[0.045] text-left shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
          >
            <div className="relative aspect-[16/8] min-h-[320px] overflow-hidden">
              <ImageWithFallback src={activeImage.src} alt={activeImage.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/28 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/12 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[#FFD700]">
                  {status === 'Completed' ? <CheckCircle2 className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                  {status}
                </span>
                <h3 className="mt-4 font-heading text-3xl font-black text-white">{activeImage.title}</h3>
                {activeImage.location && <p className="mt-2 text-sm font-semibold text-white/68">{activeImage.location}</p>}
                {activeImage.description && <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">{activeImage.description}</p>}
              </div>
            </div>
          </button>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {visibleImages.map((item) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setSelected(item)}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback src={item.src} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#D4AF37]">{item.category}</p>
                <h3 className="mt-2 font-heading text-lg font-bold text-white">{item.title}</h3>
                {item.location && <p className="mt-1 text-sm font-semibold text-white/50">{item.location}</p>}
                {item.description && <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/62">{item.description}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>
      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

export function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Completed and ongoing work with real project visuals."
        text="Browse project photos loaded from the public project folders with filters, sliders and fullscreen preview."
        image="/project_1.jpg"
      />
      <ProjectSection title="Delivered projects ready for customer reference." images={completedProjectImages} status="Completed" />
      <ProjectSection title="Active project work and live execution references." images={ongoingProjectImages} status="Ongoing" />
    </>
  );
}

export function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Project and customer-reference photo archive."
        text="A responsive gallery system that automatically reads uploaded photos from the public gallery folder."
        image="/hero_control_room.jpg"
      />
      <section className="bg-[#080808] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </>
  );
}

export function ContactPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = encodeURIComponent(
      `Hi SM Power Solutions, I need a consultation.\nName: ${String(formData.get('name') || '').trim()}\nPhone: ${String(formData.get('phone') || '').trim()}\nRequirement: ${String(formData.get('message') || '').trim()}`
    );
    window.open(`https://wa.me/919611951518?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Discuss your electrical, solar or MEP requirement."
        text="Reach SM Power Solutions by call, WhatsApp, email or the enquiry form."
        image="/contact_office.jpg"
      />
      <section className="bg-[#080808] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="grid gap-4">
            {[
              { icon: Phone, label: 'Call', value: '+91 96119 51518', href: 'tel:+919611951518' },
              { icon: Mail, label: 'Email', value: 'prithviraj.smps@gmail.com', href: 'mailto:prithviraj.smps@gmail.com' },
              { icon: MapPin, label: 'Location', value: 'Shivamogga, Karnataka', href: 'https://maps.google.com/?q=Shivamogga,Karnataka' },
              { icon: Clock, label: 'Office timings', value: 'Mon - Sat, 9:00 AM - 7:00 PM', href: '#contact-form' },
            ].map((item) => (
              <a key={item.label} href={item.href} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition-colors hover:border-[#D4AF37]/45">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <item.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.24em] text-white/42">{item.label}</span>
                  <span className="mt-1 block font-semibold text-white">{item.value}</span>
                </span>
              </a>
            ))}
            <a href="https://wa.me/919611951518" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-4 font-bold text-[#080808] transition-transform hover:-translate-y-0.5">
              WhatsApp Now <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <form id="contact-form" onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
            <h2 className="font-heading text-3xl font-black text-white">Get Your Free Consultation Today</h2>
            <div className="mt-6 grid gap-4">
              <input name="name" required placeholder="Name" className="h-12 rounded-xl border border-white/10 bg-[#080808]/70 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/38 focus:border-[#FFD700]/70" />
              <input name="phone" required inputMode="tel" placeholder="Phone" className="h-12 rounded-xl border border-white/10 bg-[#080808]/70 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/38 focus:border-[#FFD700]/70" />
              <textarea name="message" required rows={5} placeholder="Tell us your requirement" className="resize-none rounded-xl border border-white/10 bg-[#080808]/70 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/38 focus:border-[#FFD700]/70" />
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-6 py-3 font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_rgba(255,215,0,0.34)]">
                Send on WhatsApp <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-5 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045]">
            <iframe
              title="SM Power Solutions service area map"
              src="https://www.google.com/maps?q=Shivamogga%2C%20Karnataka&output=embed"
              loading="lazy"
              className="h-[360px] w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
