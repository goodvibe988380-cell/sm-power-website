import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'

const contacts = [
  { icon: Phone, title: 'Call', detail: '9611951518 / 8197220118 / 9538553223', href: 'tel:9611951518' },
  { icon: Mail, title: 'Email', detail: 'reachus@smpowersolutions.in', href: 'mailto:reachus@smpowersolutions.in' },
  { icon: MapPin, title: 'Visit', detail: 'HKM Complex, Park Extension Road, Shivamogga', href: '#' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = encodeURIComponent(`Hello SM Power Solutions,\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`)
    window.open(`https://wa.me/919611951518?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="border-t border-white/10 bg-[#09090a] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Contact</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Turn visitors into enquiries instantly</h2>
          <p className="mt-4 text-white/65 leading-8">
            Keep the enquiry process simple with phone, email, map location, and a WhatsApp lead form.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            {contacts.map((item) => {
              const Icon = item.icon
              return (
                <a key={item.title} href={item.href} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 transition-colors hover:border-[#D4AF37]/30">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]"><Icon className="h-5 w-5" /></div>
                    <div>
                      <div className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]/85">{item.title}</div>
                      <div className="mt-2 text-white/80">{item.detail}</div>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          <form onSubmit={submit} className="rounded-[2rem] border border-[#D4AF37]/20 bg-white/5 p-6 shadow-[0_0_60px_rgba(212,175,55,0.07)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-2xl border border-white/10 bg-[#070708] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#D4AF37]/50"
                placeholder="Your name"
                required
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-2xl border border-white/10 bg-[#070708] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#D4AF37]/50"
                placeholder="Phone number"
                required
              />
            </div>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-4 min-h-36 w-full rounded-2xl border border-white/10 bg-[#070708] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#D4AF37]/50"
              placeholder="Tell us what you need"
              required
            />
            <button className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#D4AF37] px-6 py-4 text-sm font-semibold text-[#070708] transition-transform hover:scale-[1.01]">
              Send enquiry on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
