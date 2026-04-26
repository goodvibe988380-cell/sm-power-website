const bullets = [
  'Single line diagrams and layout planning',
  'Panel design and load balancing',
  'Project estimation and consultation',
  'Execution support and documentation',
]

export default function DesignConsultation() {
  return (
    <section id="design" className="border-y border-white/10 bg-[#09090a]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div className="order-2 lg:order-1 relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4">
          <img src="/design_consultation.jpg" alt="Design consultation" className="h-full min-h-[360px] w-full rounded-[1.6rem] object-cover" />
          <div className="absolute inset-x-8 top-8 rounded-2xl border border-[#D4AF37]/20 bg-black/70 p-5 backdrop-blur-md">
            <div className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">Planning first</div>
            <div className="mt-2 text-lg font-semibold text-white">Strong design gives clean execution.</div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Design & consultation</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Make project planning look premium and professional</h2>
          <p className="mt-5 max-w-2xl text-white/65 leading-8">
            This section explains your design expertise and builds trust before the customer even asks for a quote.
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
