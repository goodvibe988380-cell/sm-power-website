import {
  Activity,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react';
import ProjectGalleryCards from './ProjectGalleryCards';
import { completedProjectGalleries } from '../data/projectGalleries';

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
  description?: string;
  progress?: number;
};

const fallbackImage = '/project_1.jpg';

const sharedPhotos = {
  solar: [
    { src: '/images/customer-reference/rooftop-solar-reference.png', alt: 'Rooftop solar reference work' },
    { src: '/images/customer-reference/solar-panel-maintenance-reference.png', alt: 'Solar panel maintenance reference' },
    { src: '/project_2.jpg', alt: 'Commercial solar installation by SM Power Solutions' },
  ],
  panels: [
    { src: '/images/customer-reference/panel-wiring-reference.png', alt: 'Panel wiring reference' },
    { src: '/images/customer-reference/meter-panel-reference.png', alt: 'Meter panel reference' },
    { src: '/images/customer-reference/electrical-panel-inspection-reference.jpg', alt: 'Electrical panel inspection reference' },
  ],
  wiring: [
    { src: '/electrical_services.jpg', alt: 'Electrical wiring installation project' },
    { src: '/images/customer-reference/residential-wiring-reference.png', alt: 'Residential wiring reference' },
    { src: '/projects/completed/office-linear-workstation-lighting.jpg', alt: 'Office linear workstation lighting completion' },
  ],
  maintenance: [
    { src: '/lifecycle_site.jpg', alt: 'Electrical maintenance work at customer site' },
    { src: '/images/customer-reference/sink-plumbing-repair.jpg', alt: 'Sink plumbing repair reference' },
    { src: '/images/customer-reference/copper-plumbing-layout.jpg', alt: 'Copper plumbing maintenance layout reference' },
  ],
  ltHt: [
    { src: '/escom_office.jpg', alt: 'LT and HT electrical approval support' },
    { src: '/design_consultation.jpg', alt: 'Electrical load planning and consultation' },
    { src: '/capabilities_analysis.jpg', alt: 'Power sanction and load planning support' },
  ],
  transformer: [
    { src: '/projects/completed/transformer-yard-installation.jpg', alt: 'Transformer yard installation' },
    { src: '/projects/completed/transformer-lifting-site.jpg', alt: 'Transformer lifting site work' },
    { src: '/projects/completed/panel-delivery-site.jpg', alt: 'Panel delivery at power site' },
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

const ongoingProjects: ProjectItem[] = [
  {
    id: 5,
    title: 'Commercial Office Electrical Works',
    category: 'Wiring',
    status: 'Ongoing',
    location: 'Shimoga',
    image: '/projects/ongoing/vasavi-school-electrical-work.jpg',
    progress: 84,
  },
  {
    id: 6,
    title: 'LT/HT Approval Support',
    category: 'LT/HT',
    status: 'Ongoing',
    location: 'Customer Office',
    image: '/projects/ongoing/lt-ht-approval-support.jpg',
    progress: 68,
  },
  {
    id: 7,
    title: 'Preventive AMC Visit',
    category: 'Maintenance',
    status: 'Ongoing',
    location: 'Commercial Facility',
    image: '/projects/ongoing/preventive-amc-visit.jpg',
    progress: 52,
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
      <div className="relative aspect-[4/3] overflow-hidden bg-[#080808]">
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
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex gap-2">
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

        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]">
          Working Category
        </p>
        <h3 className="mt-3 font-heading text-2xl font-black text-white">{category.title}</h3>
        <p className="mt-3 min-h-[4.6rem] text-sm leading-6 text-white/70">{category.description}</p>
        <a
          href="#completed-projects"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/55 bg-[#D4AF37]/12 px-4 py-2.5 text-sm font-bold text-[#FFD700] transition-all duration-300 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-black"
        >
          View Projects <ArrowRight className="h-4 w-4" />
        </a>
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

function ProjectCard({ project, onOpen }: { project: ProjectItem; onOpen: () => void }) {
  const isCompleted = project.status === 'Completed';

  return (
    <RevealCard>
      <button
        type="button"
        onClick={onOpen}
        className="group w-full text-left"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_20px_60px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#080808]">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#D4AF37]">{project.category}</p>
              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                  isCompleted
                    ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'
                    : 'border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#FFD700]'
                }`}
              >
                {project.status}
              </span>
            </div>
            <h3 className="mt-3 font-heading text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-1 line-clamp-1 text-sm text-white/58">{project.location ?? project.description}</p>
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
        </div>
      </button>
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

      <div
        className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#080808] shadow-[0_0_80px_rgba(0,0,0,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative max-h-[76vh] bg-black">
          <ImageWithFallback src={item.image} alt={item.title} eager className="mx-auto max-h-[76vh] w-full object-contain" />
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-[#D4AF37]">{item.category}</p>
            <h3 className="mt-2 font-heading text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-1 text-sm font-semibold text-white/58">{item.location}</p>
            {item.description && <p className="mt-3 text-sm leading-6 text-white/68">{item.description}</p>}
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
  const [lightboxList, setLightboxList] = useState<ProjectItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const selectedItem = lightboxIndex == null ? null : lightboxList[lightboxIndex] ?? null;

  const openLightbox = (items: ProjectItem[], index: number) => {
    setLightboxList(items);
    setLightboxIndex(index);
  };

  const showNext = () => {
    setLightboxIndex((value) => {
      if (value == null || lightboxList.length === 0) {
        return value;
      }
      return (value + 1) % lightboxList.length;
    });
  };

  const showPrevious = () => {
    setLightboxIndex((value) => {
      if (value == null || lightboxList.length === 0) {
        return value;
      }
      return (value - 1 + lightboxList.length) % lightboxList.length;
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

        <div id="completed-projects" className="mt-20 scroll-mt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Completed Projects</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">Delivered with clean execution.</h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              <CheckCircle2 className="h-4 w-4" /> Project-wise Gallery
            </span>
          </div>
          <div className="mt-8">
            <ProjectGalleryCards projects={completedProjectGalleries} />
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
            {ongoingProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} onOpen={() => openLightbox(ongoingProjects, index)} />
            ))}
          </div>
        </div>
      </div>

      <Lightbox item={selectedItem} onClose={() => setLightboxIndex(null)} onNext={showNext} onPrevious={showPrevious} />
    </section>
  );
}
