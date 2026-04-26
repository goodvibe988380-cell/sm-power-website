import { Home, Building2, Lamp, Zap } from 'lucide-react'

const residentialServices = [
  {
    icon: Home,
    title: 'Villa & Bungalow',
    body: 'Complete electrical setup for luxury villas and independent houses.',
    image: '/residential_villa.svg',
  },
  {
    icon: Building2,
    title: 'Apartments & Flats',
    body: 'ELV systems, lighting, and power distribution for residential complexes.',
    image: '/apartment_elv.svg',
  },
  {
    icon: Lamp,
    title: 'Interior Lighting',
    body: 'Designer lighting solutions for living rooms, bedrooms, and kitchens.',
    image: '/home_interior.svg',
  },
  {
    icon: Zap,
    title: 'Smart Home Setup',
    body: 'Home automation, smart lighting, and modern electrical solutions.',
    image: '/penthouse_lighting.svg',
  },
]

export default function ResidentialSection() {
  return (
    <section id="residential" className="border-y border-white/10 bg-[#080809]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Residential Services</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Expert Electrical Solutions for Your Home</h2>
          <p className="mt-4 text-white/65">
            From luxury villas to apartment complexes, we bring the same expertise and quality to residential projects as we do to commercial work.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {residentialServices.map((service) => {
            const Icon = service.icon
            return (
              <article key={service.title} className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/62">{service.body}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6 md:p-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Need a Quote for Your Home?</h3>
              <p className="mt-2 text-white/65">Contact us for free consultation on residential electrical projects.</p>
            </div>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#D4AF37] px-6 py-3 text-sm font-medium text-[#070708] transition-all hover:bg-[#c9a227]"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}