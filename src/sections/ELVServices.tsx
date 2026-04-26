const bullets = [
  'CCTV installation and monitoring',
  'Data and network cabling',
  'Intercom and access control',
  'Speaker, PA, and fire alarm systems',
]

export default function ELVServices() {
  return (
    <section id="elv" className="bg-[#070708]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">ELV systems</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Add smart systems to your electrical brand story</h2>
          <p className="mt-5 max-w-2xl text-white/65 leading-8">
            ELV work helps the site feel modern and complete, especially for commercial and industrial customers.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {bullets.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/75">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#D4AF37]/20 bg-white/5 p-4">
          <img src="/elv_services.jpg" alt="ELV services" className="h-full min-h-[360px] w-full rounded-[1.6rem] object-cover" />
          <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur-md">
            <div className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">ELV + security</div>
            <div className="mt-2 text-lg font-semibold text-white">CCTV, data, and access control in one place.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
