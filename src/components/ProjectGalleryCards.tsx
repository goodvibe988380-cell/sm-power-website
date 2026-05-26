import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { CompletedProjectGallery } from '../data/projectGalleries';

function CoverImage({ src, alt, eager }: { src: string; alt: string; eager: boolean }) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      onError={() => setImageSrc('/project_1.jpg')}
    />
  );
}

export default function ProjectGalleryCards({ projects }: { projects: CompletedProjectGallery[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <a
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] text-left shadow-[0_20px_60px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-[0_24px_80px_rgba(212,175,55,0.12)]"
          aria-label={`View ${project.title} gallery`}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-[#080808]">
            <CoverImage src={project.coverImage} alt={project.title} eager={index < 2} />
          </div>
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#D4AF37]">{project.category}</p>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
                {project.photos.length} Photos
              </span>
            </div>
            <h3 className="mt-3 font-heading text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-1 line-clamp-1 text-sm text-white/58">{project.location}</p>
            <p className="mt-3 min-h-[3rem] text-sm leading-6 text-white/62">{project.summary}</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-bold text-[#080808] transition-transform group-hover:-translate-y-0.5">
              View Project <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
