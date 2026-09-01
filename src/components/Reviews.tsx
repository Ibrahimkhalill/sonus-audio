import { Star } from 'lucide-react';
import { REVIEWS } from '../data/site';
import { useReveal } from '../lib/useReveal';

export default function Reviews() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="border-y border-line bg-cream/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 lg:px-12 lg:py-28">
        <h2
          className="font-display mb-12 font-extrabold text-ink"
          style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
        >
          What people hear
        </h2>

        <div ref={ref} className="reveal grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.name}
              className="a-fade-up rounded-2xl border border-line bg-cream p-7"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-coral text-coral" />
                ))}
              </div>
              <blockquote className="mt-5 text-base leading-relaxed text-ink">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-xs font-bold text-on-coral">
                  {r.name.slice(0, 1)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{r.name}</span>
                  <span className="block text-xs text-muted">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
