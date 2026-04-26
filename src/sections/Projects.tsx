import { useEffect, useMemo, useState } from 'react'

const projects = [
  {
    title: 'Vasavi School',
    category: 'Live',
    status: 'Running project',
    progress: 84,
    location: 'Shimoga',
    image: '/project_1.jpg',
    type: 'commercial',
  },
  {
    title: 'Commercial Solar Array',
    category: 'Ongoing',
    status: 'Installation stage',
    progress: 62,
    location: 'Karnataka',
    image: '/project_2.jpg',
    type: 'commercial',
  },
  {
    title: 'Industrial ELV Upgrade',
    category: 'Live',
    status: 'Commissioning soon',
    progress: 91,
    location: 'Industrial Zone',
    image: '/project_3.jpg',
    type: 'commercial',
  },
  {
    title: 'Lighting Retrofit',
    category: 'Completed',
    status: 'Delivered',
    progress: 100,
    location: 'Commercial Complex',
    image: '/electrical_services.jpg',
    type: 'commercial',
  },
  {
    title: 'Design Consultation',
    category: 'Ongoing',
    status: 'Planning phase',
    progress: 38,
    location: 'Customer Office',
    image: '/design_consultation.jpg',
    type: 'commercial',
  },
  {
    title: 'CCTV Network',
    category: 'Live',
    status: 'Active monitoring',
    progress: 76,
    location: 'Retail Site',
    image: '/elv_services.jpg',
    type: 'commercial',
  },
  // Residential Projects
  {
    title: 'Luxury Villa Lighting',
    category: 'Completed',
    status: 'Delivered',
    progress: 100,
    location: 'Whitefield, Bangalore',
    image: '/residential_villa.svg',
    type: 'residential',
  },
  {
    title: 'Apartment Complex ELV',
    category: 'Ongoing',
    status: 'Installation stage',
    progress: 55,
    location: 'Koramangala, Bangalore',
    image: '/apartment_elv.svg',
    type: 'residential',
  },
  {
    title: 'Home Interior Lighting',
    category: 'Live',
    status: 'In progress',
    progress: 72,
    location: 'MG Road, Bangalore',
    image: '/home_interior.svg',
    type: 'residential',
  },
  {
    title: 'Bungalow Electrical Setup',
    category: 'Completed',
    status: 'Delivered',
    progress: 100,
    location: 'Jayanagar, Bangalore',
    image: '/bungalow_electrical.svg',
    type: 'residential',
  },
  {
    title: 'Penthouse Smart Lighting',
    category: 'Ongoing',
    status: 'Wiring phase',
    progress: 45,
    location: 'Indiranagar, Bangalore',
    image: '/penthouse_lighting.svg',
    type: 'residential',
  },
] as const

type FilterKey = 'All' | 'Live' | 'Ongoing' | 'Completed' | 'Residential'

export default function Projects() {
  const [filter, setFilter] = useState<FilterKey>('All')
  const [featured, setFeatured] = useState(0)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 1000)
    const rotate = setInterval(() => setFeatured((value) => (value + 1) % projects.length), 4000)
    return () => {
      clearInterval(clock)
      clearInterval(rotate)
    }
  }, [])

  const visibleProjects = useMemo(
    () => {
      if (filter === 'Residential') {
        return projects.filter((project) => project.type === 'residential')
      }
      return projects.filter((project) => filter === 'All' || project.category === filter)
    },
    [filter]
  )

  const featuredProject = visibleProjects[featured % visibleProjects.length] ?? visibleProjects[0] ?? projects[0]

  return (
    <section id="projects" className="bg-[#070708] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Real-time project gallery</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Show customers your running projects in a premium way</h2>
            <p className="mt-4 text-white/65 leading-8">
              This gallery updates automatically, highlights live work, and helps visitors trust your active job flow.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
            Last sync: <span className="text-[#D4AF37]">{now.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {(['All', 'Live', 'Ongoing', 'Completed', 'Residential'] as FilterKey[]).map((item) => (
            <button
              key={item}
              onClick={() => {
                setFilter(item)
                setFeatured(0)
              }}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                filter === item
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-[#070708]'
                  : 'border-white/10 bg-white/5 text-white/70 hover:border-[#D4AF37]/40 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/20 bg-white/5 shadow-[0_0_60px_rgba(212,175,55,0.08)]">
            <div className="relative min-h-[420px]">
              <img src={featuredProject.image} alt={featuredProject.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="inline-flex rounded-full border border-[#D4AF37]/30 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                  {featuredProject.category} project
                </div>
                <h3 className="mt-4 text-3xl font-bold text-white">{featuredProject.title}</h3>
                <p className="mt-2 text-white/70">{featuredProject.status} • {featuredProject.location}</p>
                <div className="mt-5 h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-[#D4AF37] transition-all duration-700"
                    style={{ width: `${featuredProject.progress}%` }}
                  />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.28em] text-white/55">
                  {featuredProject.progress}% complete
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            {visibleProjects.map((project, index) => (
              <button
                key={project.title}
                onClick={() => setFeatured(index)}
                className={`group overflow-hidden rounded-[1.6rem] border p-4 text-left transition-all duration-300 ${
                  featuredProject.title === project.title
                    ? 'border-[#D4AF37]/50 bg-white/[0.08]'
                    : 'border-white/10 bg-white/5 hover:border-[#D4AF37]/30'
                }`}
              >
                <div className="flex gap-4">
                  <img src={project.image} alt={project.title} className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="truncate text-base font-semibold text-white">{project.title}</h4>
                      <span className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                        {project.category}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-white/65">{project.status}</p>
                    <div className="mt-3 h-1.5 rounded-full bg-white/10">
                      <div className="h-1.5 rounded-full bg-[#D4AF37]" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
