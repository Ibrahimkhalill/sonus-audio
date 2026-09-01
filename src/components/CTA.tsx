import { ArrowRight } from 'lucide-react';
import { useReveal } from '../lib/useReveal';

export default function CTA() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 lg:px-12 lg:py-28">
      <div ref={ref} className="reveal rounded-[32px] bg-ink px-6 py-14 text-on-coral md:px-14 md:py-20">
        <div className="a-fade-up mx-auto max-w-3xl text-center">
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(32px, 5.5vw, 80px)', lineHeight: 0.92, letterSpacing: '-0.035em' }}
          >
            Hear the difference yourself.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-on-coral/60">
            Thirty days at home. If it does not change how you listen, send it
            back and we pay the return.
          </p>

          <form
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-full border border-on-coral/20 bg-on-coral/5 px-6 py-4 text-sm text-on-coral outline-none placeholder:text-on-coral/40 focus:border-on-coral/50"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-coral px-7 py-4 text-sm font-semibold text-on-coral transition-opacity hover:opacity-90"
            >
              Get early access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
