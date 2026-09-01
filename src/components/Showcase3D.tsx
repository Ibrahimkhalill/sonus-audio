import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';

// Three.js lives in its own chunk, fetched only when this section nears view.
const Scene3D = lazy(() => import('./Scene3D'));

const SPECS: [string, string][] = [
  ['Driver', '40mm beryllium'],
  ['Housing', 'CNC aluminium'],
  ['Weight', '268 g'],
  ['Impedance', '32 Ω'],
];

export default function Showcase3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');

  const handleReady = useCallback(() => setStatus('ready'), []);
  const handleFail = useCallback(() => setStatus('failed'), []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-line bg-cream/40">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-32">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-coral">
            Inside the build
          </p>
          <h2
            className="font-display mt-5 font-extrabold text-ink"
            style={{
              fontSize: 'clamp(34px, 5vw, 72px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            Every part earns its place.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Machined aluminium housing, a beryllium-coated diaphragm, and a
            chamber tuned by ear over eleven revisions. Keep scrolling &mdash;
            the model turns with you.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:max-w-md">
            {SPECS.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
                <dd className="font-display mt-1 text-lg font-bold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-line bg-cream md:h-[420px] lg:h-[560px]">
          {near && (
            <Suspense fallback={null}>
              <Scene3D
                progressRef={sectionRef}
                onReady={handleReady}
                onFail={handleFail}
              />
            </Suspense>
          )}

          {status !== 'ready' && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-muted">
                {status === 'failed'
                  ? '3D preview unavailable on this device'
                  : 'Loading 3D model…'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
