import { ShieldCheck, Star, UserCircle2 } from 'lucide-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

const reviewText =
  '“Excellent experience working with SM Power Solutions. The team handled our electrical, HVAC, lighting, and MEP works with professional planning and neat execution. Their workmanship, safety standards, clean finishing, and timely project completion were truly impressive. From wiring and lighting installation to HVAC systems and maintenance support, everything was managed smoothly and professionally. The staff was responsive, technically skilled, and committed to delivering high-quality results throughout the project. Highly recommended for residential, commercial, and industrial electrical and MEP services.”';

function FadeInSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </section>
  );
}

export default function ClientReviewSection() {
  return (
    <FadeInSection>
      <div className="bg-[#080808] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.36em] text-[#D4AF37]">Trusted Client Feedback</p>
            <h2 className="mt-5 font-heading text-4xl font-black text-white sm:text-5xl">Trusted Client Feedback</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Real feedback from clients who choose SM Power Solutions for electrical, HVAC, lighting and MEP work.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-10">
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#D4AF37]/12 to-transparent" aria-hidden="true" />
            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              <div className="space-y-6">
                <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#080808]/70 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="grid h-16 w-16 place-items-center rounded-3xl bg-[#D4AF37]/10 text-[#D4AF37]">
                      <UserCircle2 className="h-9 w-9" />
                    </span>
                    <div>
                      <p className="font-heading text-xl font-bold text-white">Verified Google Review</p>
                      <p className="text-sm text-white/50">Residential, commercial and industrial MEP services</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#FFD700]">
                    <ShieldCheck className="h-4 w-4" /> Verified Google Review
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 text-[#FFD700]" />
                  ))}
                  <span className="text-sm uppercase tracking-[0.24em] text-white/45">5.0 rating</span>
                </div>

                <p className="text-sm leading-7 text-white/70 sm:text-lg">{reviewText}</p>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0f0f0f]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-[#D4AF37]/10 blur-2xl" aria-hidden="true" />
                <div className="relative rounded-[1.5rem] bg-[#111111]/90 p-6">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-3xl bg-[#D4AF37]/10 text-[#D4AF37]">
                      <UserCircle2 className="h-8 w-8" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">Client Name</p>
                      <p className="text-sm text-white/50">Google review</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 rounded-3xl border border-white/10 bg-[#080808]/60 p-4 text-sm text-white/60">
                    <div className="flex items-center justify-between">
                      <span className="uppercase tracking-[0.24em] text-white/40">Source</span>
                      <span className="font-semibold text-white">Google</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="uppercase tracking-[0.24em] text-white/40">Rating</span>
                      <span className="font-semibold text-[#FFD700]">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50">
              <div className="flex items-center gap-4">
                <span>Review slider support ready for future customer feedback.</span>
                <a
                  href="https://www.google.com/search?sca_esv=6ffa0214e63e6e25&sxsrf=ANbL-n5pkwB3flHISHnM047aa19u3lYq8Q:1779368547070&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qORIWEv1Y3o-kF1v64g5xu_MMM1q2--N8hmeMPVNG5LkdnqiE3nv-xoxvr6ffRXSVDsrAXOsvcosW7KY9g-aP8gW-tfrrKA0D_guERovZDfWdE3_zVg%3D%3D&q=SM+POWER+SOLUTIONS+Reviews&sa=X&ved=2ahUKEwjpvbCxuMqUAxUgTGcHHU8_BKYQ0bkNegQIOxAH&biw=1536&bih=730&dpr=1.25"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View more reviews on Google"
                  className="google-review-btn inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-4 py-2 font-semibold text-[#080808] transition-transform hover:-translate-y-0.5"
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" focusable="false">
                      <path fill="#4285F4" d="M12 11.5v2.9h3.9c-.17 1.02-.99 2.99-3.9 4.4-2.35-1.14-3.9-3.28-3.9-5.6 0-2.38 1.55-4.42 3.9-5.6 1.63.72 2.63 1.99 3.02 2.61l2.06-2.06C17.51 6.04 14.98 4.5 12 4.5 7.58 4.5 4 8.08 4 12.5S7.58 20.5 12 20.5c5.23 0 8.98-3.67 8.98-8.64 0-.58-.06-1.02-.16-1.46H12z" />
                      <path fill="#34A853" d="M6.3 14.3c.42 1.3 1.49 2.45 3.04 3.2 1.76.83 3.88.72 5.5.02l-2.05-1.98c-1.02.57-2.45.63-3.56.18-1.1-.44-1.98-1.4-2.4-2.56l-0.53-1.12-0.01.26z" />
                      <path fill="#FBBC05" d="M12 4.5c1.98 0 3.51 1.54 3.98 2.86l1.99-1.99C16.63 3.09 14.52 2 12 2 8.12 2 4.9 4.2 3.2 7.54l2.6 2.02C7.52 7.1 9.59 4.5 12 4.5z" />
                      <path fill="#EA4335" d="M20.98 12.5c0-.58-.06-1.02-.16-1.46l-8.82 6.79c1.62.7 3.74.81 5.5-.02 1.55-.75 2.62-1.9 3.04-3.2l.44-2.11z" />
                    </svg>
                  </span>
                  <span>View More Reviews on Google</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
