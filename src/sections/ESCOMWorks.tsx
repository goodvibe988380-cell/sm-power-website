const bullets = [
  'Power sanction and approvals',
  'Load enhancement and reduction',
  'Meter replacement and name change',
  'Utility coordination and office works',
]

export default function ESCOMWorks() {
  return (
    <section id="escom" className="border-y border-white/10 bg-[#09090a]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div className="order-2 lg:order-1 relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4">
          <img src="/escom_office.jpg" alt="ESCOM works" className="h-full min-h-[360px] w-full rounded-[1.6rem] object-cover" />
          <div className="absolute inset-x-8 top-8 rounded-2xl border border-[#D4AF37]/20 bg-black/70 p-5 backdrop-blur-md">
            <div className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">Official works</div>
            <div className="mt-2 text-lg font-semibold text-white">Simplify approvals and utility documentation.</div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">ESCOM office works</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Show business clients that you handle the paperwork too</h2>
          <p className="mt-5 max-w-2xl text-white/65 leading-8">
            This section communicates the office-side work customers often need before installation and commissioning.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {bullets.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/75">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
