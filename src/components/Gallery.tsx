import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Images,
  Search,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode, type TouchEvent } from 'react';

type CategoryKey =
  | 'Solar'
  | 'Panels'
  | 'Wiring'
  | 'Maintenance'
  | 'LT/HT'
  | 'Transformer';

type ProjectStatus = 'Completed' | 'Ongoing';

type ProjectPhoto = {
  src: string;
  alt: string;
};

type WorkCategory = {
  key: CategoryKey;
  title: string;
  description: string;
  photos: ProjectPhoto[];
};

type ProjectItem = {
  id: number;
  title: string;
  category: CategoryKey;
  status: ProjectStatus;
  location: string;
  image: string;
  progress?: number;
};

type GalleryFilter = 'All' | CategoryKey;

const fallbackImage = '/project_1.jpg';

const sharedPhotos = {
  solar: [
    { src: '/project_2.jpg', alt: 'Commercial solar installation by SM Power Solutions' },
    { src: '/services_mechanical.jpg', alt: 'MEP roof service planning for solar project' },
    { src: '/industries_ceiling.jpg', alt: 'Industrial service area prepared for power work' },
  ],
  panels: [
    { src: '/quality_panel.jpg', alt: 'Electrical panel quality inspection' },
    { src: '/project_3.jpg', alt: 'Electrical panel work at commercial site' },
    { src: '/capabilities_analysis.jpg', alt: 'Power system design and panel planning' },
  ],
  wiring: [
    { src: '/electrical_services.jpg', alt: 'Electrical wiring installation project' },
    { src: '/project_1.jpg', alt: 'Commercial electrical work in progress' },
    { src: '/images/apartment_complex.jpg', alt: 'Apartment electrical wiring project' },
  ],
  maintenance: [
    { src: '/lifecycle_site.jpg', alt: 'Electrical maintenance work at customer site' },
    { src: '/elv_services.jpg', alt: 'ELV maintenance and network service work' },
    { src: '/images/plumbing_3.jpg', alt: 'Site service and maintenance support' },
  ],
  ltHt: [
    { src: '/escom_office.jpg', alt: 'LT and HT electrical approval support' },
    { src: '/design_consultation.jpg', alt: 'Electrical load planning and consultation' },
    { src: '/project_3.jpg', alt: 'HT electrical panel and power work' },
  ],
  transformer: [
    { src: '/project_1.jpg', alt: 'Transformer service site work' },
    { src: '/quality_panel.jpg', alt: 'Transformer and panel inspection' },
    { src: '/capabilities_analysis.jpg', alt: 'Transformer service planning and testing' },
  ],
};

const categories: WorkCategory[] = [
  {
    key: 'Solar',
    title: 'Solar Installation',
    description: 'Solar planning, mounting, cabling and commissioning support for homes, offices and commercial rooftops.',
    photos: sharedPhotos.solar,
  },
  {
    key: 'Panels',
    title: 'Electrical Panel Work',
    description: 'Neat panel installation, termination, inspection and load distribution for dependable power control.',
    photos: sharedPhotos.panels,
  },
  {
    key: 'Wiring',
    title: 'Industrial Wiring',
    description: 'Structured wiring, earthing, lighting and power routing for production floors and commercial facilities.',
    photos: sharedPhotos.wiring,
  },
  {
    key: 'Maintenance',
    title: 'Maintenance Services',
    description: 'Responsive AMC, preventive checks, troubleshooting and repair support to keep systems reliable.',
    photos: sharedPhotos.maintenance,
  },
  {
    key: 'LT/HT',
    title: 'LT/HT Electrical Work',
    description: 'Load calculation, sanction support, LT/HT coordination and site-ready electrical documentation.',
    photos: sharedPhotos.ltHt,
  },
  {
    key: 'Transformer',
    title: 'Transformer Services',
    description: 'Transformer inspection, coordination, service planning and connected power system support.',
    photos: sharedPhotos.transformer,
  },
];

const completedProjects: ProjectItem[] = [
  {
    id: 101,
    title: 'Atrium Electrical Completion',
    category: 'Wiring',
    status: 'Completed',
    location: 'Institutional Campus',
    image: '/images/completed-projects/atrium-finished-electrical.jpg',
  },
  {
    id: 102,
    title: 'Event Canopy Power Setup',
    category: 'Wiring',
    status: 'Completed',
    location: 'Outdoor Venue',
    image: '/images/completed-projects/event-canopy-power-lighting.jpg',
  },
  {
    id: 103,
    title: 'Facade Window Lighting',
    category: 'Wiring',
    status: 'Completed',
    location: 'Hospitality Block',
    image: '/images/completed-projects/facade-window-lighting.jpg',
  },
  {
    id: 104,
    title: 'Palm Landscape Lighting',
    category: 'Maintenance',
    status: 'Completed',
    location: 'Resort Landscape',
    image: '/images/completed-projects/landscape-palm-lighting.jpg',
  },
  {
    id: 105,
    title: 'Banquet Ring Lighting',
    category: 'Wiring',
    status: 'Completed',
    location: 'Banquet Hall',
    image: '/images/completed-projects/banquet-ring-lighting.jpg',
  },
  {
    id: 106,
    title: 'Temple Feature Lighting',
    category: 'Wiring',
    status: 'Completed',
    location: 'Outdoor Feature Area',
    image: '/images/completed-projects/temple-feature-lighting.jpg',
  },
  {
    id: 107,
    title: 'Hospitality Pavilion Lighting',
    category: 'Wiring',
    status: 'Completed',
    location: 'Resort Pavilion',
    image: '/images/completed-projects/hospitality-pavilion-lighting.jpg',
  },
  {
    id: 108,
    title: 'Garden Tree Lighting',
    category: 'Maintenance',
    status: 'Completed',
    location: 'Garden Area',
    image: '/images/completed-projects/garden-tree-lighting.jpg',
  },
  {
    id: 109,
    title: 'Landscape Completion',
    category: 'Maintenance',
    status: 'Completed',
    location: 'Resort Campus',
    image: '/images/completed-projects/landscape-daytime-completion.jpg',
  },
  {
    id: 110,
    title: 'Resort Entry Chandelier',
    category: 'Wiring',
    status: 'Completed',
    location: 'Kimmane Resort',
    image: '/images/completed-projects/resort-entry-chandelier.jpg',
  },
  {
    id: 111,
    title: 'Campus Aerial Completion',
    category: 'Maintenance',
    status: 'Completed',
    location: 'Resort Campus',
    image: '/images/completed-projects/aerial-campus-view-1.jpg',
  },
  {
    id: 112,
    title: 'Resort Campus Overview',
    category: 'Maintenance',
    status: 'Completed',
    location: 'Resort Campus',
    image: '/images/completed-projects/aerial-campus-view-2.jpg',
  },
  {
    id: 113,
    title: 'Atrium Structure Electrical Work',
    category: 'Wiring',
    status: 'Completed',
    location: 'Institutional Campus',
    image: '/images/completed-projects/atrium-structure-work.jpg',
  },
  {
    id: 114,
    title: 'Transformer Lifting Work',
    category: 'Transformer',
    status: 'Completed',
    location: 'Commercial Site',
    image: '/images/completed-projects/transformer-lifting-site.jpg',
  },
  {
    id: 115,
    title: 'Transformer Yard Installation',
    category: 'Transformer',
    status: 'Completed',
    location: 'Power Yard',
    image: '/images/completed-projects/transformer-yard-installation.jpg',
  },
  {
    id: 116,
    title: 'Panel Delivery and Placement',
    category: 'Panels',
    status: 'Completed',
    location: 'Project Site',
    image: '/images/completed-projects/panel-delivery-site.jpg',
  },
  {
    id: 117,
    title: 'Building Facade Completion',
    category: 'Wiring',
    status: 'Completed',
    location: 'Commercial Building',
    image: '/images/completed-projects/building-facade-completion.jpg',
  },
  {
    id: 118,
    title: 'Building Night Lighting',
    category: 'Wiring',
    status: 'Completed',
    location: 'Commercial Building',
    image: '/images/completed-projects/building-night-lighting.jpg',
  },
];

const ongoingProjects: ProjectItem[] = [
  {
    id: 5,
    title: 'Vasavi School Electrical Works',
    category: 'Wiring',
    status: 'Ongoing',
    location: 'Shimoga',
    image: '/project_1.jpg',
    progress: 84,
  },
  {
    id: 6,
    title: 'LT/HT Approval Support',
    category: 'LT/HT',
    status: 'Ongoing',
    location: 'Customer Office',
    image: '/escom_office.jpg',
    progress: 68,
  },
  {
    id: 7,
    title: 'Preventive AMC Visit',
    category: 'Maintenance',
    status: 'Ongoing',
    location: 'Commercial Facility',
    image: '/lifecycle_site.jpg',
    progress: 52,
  },
];

const customerReferenceItems: ProjectItem[] = [
  {
    id: 201,
    title: 'Sink Plumbing Repair Reference',
    category: 'Maintenance',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/sink-plumbing-repair.jpg',
  },
  {
    id: 202,
    title: 'Bathroom Pipe Fitting Reference',
    category: 'Maintenance',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/bathroom-pipe-fitting.jpg',
  },
  {
    id: 203,
    title: 'Copper Plumbing Layout Reference',
    category: 'Maintenance',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/copper-plumbing-layout.jpg',
  },
  {
    id: 204,
    title: 'Panel Wiring Reference',
    category: 'Panels',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/panel-wiring-reference.png',
  },
  {
    id: 205,
    title: 'Solar Panel Maintenance Reference',
    category: 'Solar',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/solar-panel-maintenance-reference.png',
  },
  {
    id: 206,
    title: 'Residential Wiring Reference',
    category: 'Wiring',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/residential-wiring-reference.png',
  },
  {
    id: 207,
    title: 'Kitchen Plumbing Reference',
    category: 'Maintenance',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/kitchen-plumbing-reference.png',
  },
  {
    id: 208,
    title: 'Rooftop Solar Reference',
    category: 'Solar',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/rooftop-solar-reference.png',
  },
  {
    id: 209,
    title: 'Meter Panel Reference',
    category: 'Panels',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/meter-panel-reference.png',
  },
  {
    id: 210,
    title: 'Plumbing Pipe Reference',
    category: 'Maintenance',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/plumbing-pipe-reference.png',
  },
  {
    id: 211,
    title: 'Kitchen Electrical Reference',
    category: 'Wiring',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/kitchen-electrical-reference.png',
  },
  {
    id: 212,
    title: 'Electrical Panel Inspection Reference',
    category: 'Panels',
    status: 'Completed',
    location: 'Customer Reference',
    image: '/images/customer-reference/electrical-panel-inspection-reference.jpg',
  },
];

const galleryItems: ProjectItem[] = [
  ...completedProjects,
  ...ongoingProjects,
  ...customerReferenceItems,
  {
    id: 9,
    title: 'ELV Network Service',
    category: 'Maintenance',
    status: 'Ongoing',
    location: 'Retail Site',
    image: '/elv_services.jpg',
    progress: 76,
  },
];

function ImageWithFallback({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  className: string;
  eager?: boolean;
}) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      onError={() => setImageSrc(fallbackImage)}
    />
  );
}

function CategoryCarouselCard({ category, index }: { category: WorkCategory; index: number }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((value) => (value + 1) % category.photos.length);
    }, 3200 + index * 180);

    return () => window.clearInterval(timer);
  }, [category.photos.length, index, isPaused]);

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    setIsPaused(true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    window.setTimeout(() => setIsPaused(false), 900);

    if (startX == null || endX == null || Math.abs(startX - endX) < 35) {
      return;
    }

    setActiveIndex((value) =>
      endX < startX
        ? (value + 1) % category.photos.length
        : (value - 1 + category.photos.length) % category.photos.length
    );
  };

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] shadow-[0_24px_70px_rgba(0,0,0,0.26)] transition-all duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/45 hover:shadow-[0_30px_90px_rgba(212,175,55,0.13)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/4.6]">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {category.photos.map((photo, photoIndex) => (
            <div key={photo.src} className="relative h-full min-w-full overflow-hidden bg-[#080808]">
              <ImageWithFallback
                src={photo.src}
                alt={photo.alt}
                eager={index < 2 && photoIndex === 0}
                className={`h-full w-full object-cover transition-transform [transition-duration:1800ms] ease-out ${
                  photoIndex === activeIndex ? 'scale-105' : 'scale-100'
                } group-hover:scale-110`}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/52 to-transparent" />

        <div className="absolute left-5 top-5 flex gap-2">
          {category.photos.map((photo, photoIndex) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Show ${category.title} photo ${photoIndex + 1}`}
              onClick={() => setActiveIndex(photoIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                photoIndex === activeIndex ? 'w-8 bg-[#D4AF37]' : 'w-3 bg-white/38 hover:bg-white/65'
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">
            Working Category
          </p>
          <h3 className="mt-3 font-heading text-2xl font-black text-white">{category.title}</h3>
          <p className="mt-3 min-h-[4.6rem] text-sm leading-6 text-white/70">{category.description}</p>
          <a
            href="#project-gallery"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/55 bg-[#D4AF37]/12 px-4 py-2.5 text-sm font-bold text-[#FFD700] transition-all duration-300 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-black"
          >
            View Projects <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function RevealCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const isCompleted = project.status === 'Completed';

  return (
    <RevealCard>
      <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_20px_60px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#080808]">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/24 to-transparent" />
          <span
            className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${
              isCompleted
                ? 'border-emerald-400/35 bg-emerald-400/14 text-emerald-300'
                : 'border-[#D4AF37]/40 bg-[#D4AF37]/14 text-[#FFD700]'
            }`}
          >
            {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Activity className="h-3.5 w-3.5" />}
            {project.status}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#D4AF37]">{project.category}</p>
            <h3 className="mt-2 font-heading text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-1 text-sm text-white/62">{project.location}</p>
          </div>
        </div>
        {project.progress != null && (
          <div className="border-t border-white/10 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
              <span>Progress</span>
              <span className="text-[#D4AF37]">{project.progress}%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.38)] transition-all duration-700"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        )}
      </article>
    </RevealCard>
  );
}

function Lightbox({
  item,
  onClose,
  onNext,
  onPrevious,
}: {
  item: ProjectItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowRight') {
        onNext();
      }
      if (event.key === 'ArrowLeft') {
        onPrevious();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onNext, onPrevious]);

  if (!item) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/92 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} project photo`}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close gallery preview"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Previous project photo"
        className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-2xl text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] sm:grid"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
      >
        {'<'}
      </button>
      <button
        type="button"
        aria-label="Next project photo"
        className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-2xl text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] sm:grid"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
      >
        {'>'}
      </button>

      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#080808]" onClick={(event) => event.stopPropagation()}>
        <div className="relative max-h-[76vh] bg-black">
          <ImageWithFallback src={item.image} alt={item.title} eager className="mx-auto max-h-[76vh] w-full object-contain" />
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-[#D4AF37]">{item.category}</p>
            <h3 className="mt-2 font-heading text-xl font-bold text-white">{item.title}</h3>
          </div>
          <span className="self-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/62 sm:self-center">
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryFilter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery = useMemo(
    () => galleryItems.filter((item) => filter === 'All' || item.category === filter),
    [filter]
  );

  const selectedItem = lightboxIndex == null ? null : filteredGallery[lightboxIndex] ?? null;

  const showNext = () => {
    setLightboxIndex((value) => {
      if (value == null || filteredGallery.length === 0) {
        return value;
      }
      return (value + 1) % filteredGallery.length;
    });
  };

  const showPrevious = () => {
    setLightboxIndex((value) => {
      if (value == null || filteredGallery.length === 0) {
        return value;
      }
      return (value - 1 + filteredGallery.length) % filteredGallery.length;
    });
  };

  return (
    <section id="projects" className="bg-[#0f0f0f] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.36em] text-[#D4AF37]">Working Categories</p>
            <h2 className="mt-4 font-heading text-4xl font-black leading-tight text-white sm:text-5xl">
              Project expertise shown through real site work.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/58">
            Explore SMPS electrical, solar, LT/HT, panel, wiring and maintenance categories with active project visuals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCarouselCard key={category.key} category={category} index={index} />
          ))}
        </div>

        <div className="mt-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Completed Projects</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">Delivered with clean execution.</h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              <CheckCircle2 className="h-4 w-4" /> Completed
            </span>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {completedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Ongoing Projects</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">Active work with live progress.</h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700]">
              <Activity className="h-4 w-4" /> Ongoing
            </span>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {ongoingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div id="project-gallery" className="mt-20 scroll-mt-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Gallery</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">Project photo archive.</h2>
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
              {(['All', ...categories.map((category) => category.key)] as GalleryFilter[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setFilter(item);
                    setLightboxIndex(null);
                  }}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    filter === item
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#080808]'
                      : 'border-white/10 bg-white/5 text-white/62 hover:border-[#D4AF37]/45 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filteredGallery.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] text-left shadow-[0_20px_58px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40"
              >
                <div className={`relative overflow-hidden bg-[#080808] ${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/12 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition-colors group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">
                    <Search className="h-4 w-4" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#D4AF37]">{item.category}</p>
                    <h3 className="mt-2 font-heading text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/58">{item.location}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredGallery.length === 0 && (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.045] p-10 text-center text-white/58">
              <Images className="mx-auto h-8 w-8 text-[#D4AF37]" />
              <p className="mt-3">No project photos found for this category.</p>
            </div>
          )}
        </div>
      </div>

      <Lightbox item={selectedItem} onClose={() => setLightboxIndex(null)} onNext={showNext} onPrevious={showPrevious} />
    </section>
  );
}
