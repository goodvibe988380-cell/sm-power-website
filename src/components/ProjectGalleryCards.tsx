import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
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
  const [selectedProject, setSelectedProject] = useState<CompletedProjectGallery | null>(null);
  const [lightboxImageSrc, setLightboxImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setLightboxImageSrc(selectedProject.coverImage);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => setSelectedProject(project)}
            className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] text-left shadow-[0_20px_60px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#080808]">
              <CoverImage src={project.coverImage} alt={project.title} eager={index < 2} />
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#D4AF37]">{project.category}</p>
              </div>
              <h3 className="mt-3 font-heading text-xl font-bold text-white">{project.title}</h3>
              <p className="mt-1 line-clamp-1 text-sm text-white/58">{project.location}</p>
              <p className="mt-3 min-h-[3rem] text-sm leading-6 text-white/62">{project.summary}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/92 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} project cover photo`}
          onClick={() => setSelectedProject(null)}
        >
          <button
            type="button"
            aria-label="Close preview"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            onClick={() => setSelectedProject(null)}
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#080808] shadow-[0_0_80px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative max-h-[76vh] bg-black">
              <img
                src={lightboxImageSrc || selectedProject.coverImage}
                alt={selectedProject.title}
                className="mx-auto max-h-[76vh] w-full object-contain"
                onError={() => setLightboxImageSrc('/project_1.jpg')}
              />
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.26em] text-[#D4AF37]">{selectedProject.category}</p>
                <h3 className="mt-2 font-heading text-xl font-bold text-white">{selectedProject.title}</h3>
                <p className="mt-1 text-sm font-semibold text-white/58">{selectedProject.location}</p>
                {selectedProject.summary && <p className="mt-3 text-sm leading-6 text-white/68">{selectedProject.summary}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
