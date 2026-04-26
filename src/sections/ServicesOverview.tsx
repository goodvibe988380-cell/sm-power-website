import { Building2, Camera, PenTool, Zap } from 'lucide-react'

const services = [
  {
    icon: PenTool,
    title: 'Design & Consultation',
    body: 'SLD, panel design, load calculation, and clear project planning.',
  },
  {
    icon: Zap,
    title: 'Electrical Services',
    body: 'Wiring, lighting, solar, earthing, automation, and maintenance.',
  },
  {
    icon: Camera,
    title: 'ELV Systems',
    body: 'CCTV, data, intercom, speaker, fire alarm, and access systems.',
  },
  {
    icon: Building2,
    title: 'ESCOM Works',
    body: 'Power sanction, load enhancement, meter replacement, name change.',
  },
]

export default function ServicesOverview() {
  return (
    <section id="services" className="border-y border-white/10 bg-[#09090a]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Services</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Everything under one trusted electrical brand</h2>
          <p className="mt-4 text-white/65">
            Build a premium website that clearly shows your core service pillars and makes enquiry easy.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article key={service.title} className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] transition-colors group-hover:bg-[#D4AF37]/15">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{service.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
