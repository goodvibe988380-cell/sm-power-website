const bullets = [
  'House wiring and rewiring',
  'Lighting and power installation',
  'Solar panel installation',
  'Earthing and lightning protection',
  'Maintenance for homes, offices, and industry',
]

export default function ElectricalServices() {
  return (
    <section id="electrical" className="bg-[#070708]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Electrical services</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Reliable work for residential, commercial, and industrial needs</h2>
          <p className="mt-5 max-w-2xl text-white/65 leading-8">
            Show customers the full scope of your core electrical work with a premium presentation and clear service cards.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {bullets.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/75">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#D4AF37]/20 bg-white/5 p-4 shadow-[0_0_60px_rgba(212,175,55,0.08)]">
          <img src="/electrical_services.jpg" alt="Electrical services" className="h-full min-h-[360px] w-full rounded-[1.6rem] object-cover" />
          <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur-md">
            <div className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">24/7 support</div>
            <div className="mt-2 text-lg font-semibold text-white">Fast response. Clean finish. Quality guaranteed.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
