import { Plus } from 'lucide-react';
import TiltCard from './TiltCard';
import { PRODUCTS } from '../data/site';
import { useReveal } from '../lib/useReveal';

export default function Products() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 lg:px-12 lg:py-32">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <h2
          className="font-display font-extrabold text-ink"
          style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
        >
          The range
        </h2>
        <a href="#" className="text-sm font-medium text-muted underline decoration-line underline-offset-8 transition-colors hover:text-coral hover:decoration-coral">
          View all 12 models
        </a>
      </div>

      <div ref={ref} className="reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p, i) => (
          <article
            key={p.id}
            className="a-fade-up group"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <TiltCard>
              <div className="relative overflow-hidden rounded-2xl border border-line bg-cream shadow-card">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                {/* Lifted off the card face so it reads as a separate plane. */}
                <span
                  className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-medium text-ink backdrop-blur"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  {p.tag}
                </span>
                <button
                  type="button"
                  aria-label={`Add ${p.name} to cart`}
                  className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-on-coral opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ transform: 'translateZ(56px)' }}
                >
                  <Plus className="h-5 w-5" strokeWidth={2.2} />
                </button>
              </div>
            </TiltCard>

            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-ink">{p.name}</h3>
              <p className="font-display text-lg font-bold text-coral">{p.price}</p>
            </div>
            <p className="mt-1 text-xs text-muted">Model {p.id}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
