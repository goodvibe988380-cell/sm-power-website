import { useState } from 'react';
import { gallery } from '../data/gallery';

type FilterType = 'All' | 'Completed' | 'Running';

export default function Gallery() {
  const [filter, setFilter] = useState<FilterType>('All');

  const filteredGallery = filter === 'All' 
    ? gallery 
    : gallery.filter(item => item.status === filter);

  return (
    <section id="projects" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-gold mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Project Gallery
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our completed and ongoing projects showcasing quality craftsmanship
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
                  ? 'bg-gold text-dark'
                  : 'bg-dark-light text-gray-300 hover:bg-gold/20 hover:text-gold'
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
              className="group relative bg-dark-light rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Status Badge */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300">
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