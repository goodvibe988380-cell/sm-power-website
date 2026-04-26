import { ArrowRight, Clock3, ShieldCheck, Sparkles } from 'lucide-react'

const stats = [
  { label: 'Established', value: '2019' },
  { label: '24/7 Response', value: 'Always' },
  { label: 'Coverage', value: 'Karnataka' },
]

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_35%),linear-gradient(180deg,#0d0d10_0%,#070708_50%,#050505_100%)]" />
      <div className="absolute left-1/2 top-40 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[#D4AF37]">
            <Sparkles className="h-4 w-4" /> Premium electrical contractor
          </p>
          <h1 className="max-w-4xl text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Power rules the world — we rule the power
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            Design, installation, maintenance, ELV systems, and ESCOM office works with a premium black and gold brand experience.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 py-4 text-sm font-semibold text-[#070708] transition-transform duration-300 hover:scale-[1.02]"
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/30 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#D4AF37]/70 hover:bg-white/[0.08]"
            >
              View Live Projects
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-[#D4AF37]">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.28em] text-white/55">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] border border-[#D4AF37]/15 bg-white/5 shadow-[0_0_60px_rgba(212,175,55,0.08)] backdrop-blur-sm" />
          <div className="relative grid gap-4 p-5 sm:grid-cols-2">
            <div className="rounded-[1.6rem] border border-white/10 bg-black/50 p-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37]"><Clock3 className="h-5 w-5" /></div>
              <h2 className="text-lg font-semibold text-white">24/7 Emergency Service</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">Fast response for homes, offices, and industrial sites.</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-black/50 p-5 sm:mt-8">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37]"><ShieldCheck className="h-5 w-5" /></div>
              <h2 className="text-lg font-semibold text-white">Safe & Certified Work</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">Professional execution with neat finishing and attention to detail.</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-black/50 p-5 sm:-mt-8">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37]"><Sparkles className="h-5 w-5" /></div>
              <h2 className="text-lg font-semibold text-white">Premium Brand Look</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">Black and gold styling that feels modern, rich, and trustworthy.</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-black/50 p-5">
              <img src="/electrical_services.jpg" alt="Electrical service preview" className="h-44 w-full rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
