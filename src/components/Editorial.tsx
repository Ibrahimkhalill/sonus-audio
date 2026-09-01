import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/site';
import { useReveal } from '../lib/useReveal';

export default function Editorial() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 lg:px-12 lg:py-32">
      <div ref={ref} className="reveal grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <img
          src={IMAGES.editorial}
          alt="Headphones on a desk"
          loading="lazy"
          className="a-slide-left aspect-[4/5] w-full rounded-3xl object-cover"
        />

        <div className="a-slide-right" style={{ animationDelay: '120ms' }}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-coral">Our approach</p>
          <h2
            className="font-display mt-5 font-extrabold text-ink"
            style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
          >
            Built to be kept, not replaced.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Every SONUS headphone opens with a standard driver. Ear pads, headband
            and battery are all user-replaceable, and we publish the service manual
            the day a product ships.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We would rather sell you one pair that lasts a decade than four that
            do not.
          </p>
          <a
            href="#"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-coral underline-offset-8 transition-colors hover:text-coral"
          >
            Read the repair promise
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
