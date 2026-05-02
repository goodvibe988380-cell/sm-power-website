import { useState } from 'react';
import { gallery } from '../data/gallery';

type FilterType = 'All' | 'Completed' | 'Running';

function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  
  return (
    <img
      src={error ? '/images/plumbing_1.jpg' : src}
      alt={alt}
      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      onError={() => setError(true)}
    />
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<FilterType>('All');

  const filteredGallery = filter === 'All' 
    ? gallery 
    : gallery.filter(item => item.status === filter);

  return (
    <section id="projects" className="py-20 bg-[#0f0f0f]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Plumbing & Project Gallery
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore completed and ongoing work, including visible plumbing repair, bathroom installation and water supply projects.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          {(['All', 'Completed', 'Running'] as FilterType[]).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === item
                  ? 'bg-[#d4af37] text-[#0f0f0f]'
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#d4af37]/20 hover:text-[#d4af37]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback src={item.image} alt={item.title} />
                
                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Title + Status on Hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <span
                    className={`inline-block self-start px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                      item.status === 'Completed'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                </div>

                {/* Status Badge (always visible) */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium transition-opacity duration-300 ${
                    item.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  } ${filter !== 'All' ? 'opacity-100' : 'group-hover:opacity-0'}`}
                >
                  {item.status}
                </span>
              </div>

              {/* Content (visible when not hovering) */}
              <div className="p-5 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-lg font-semibold text-white group-hover:text-[#d4af37] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {item.status === 'Completed' ? 'Project completed successfully' : 'Currently in progress'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
