import { useEffect, useRef, useState } from 'react';
import { STATS } from '../data/site';

/** Counts 0 -> value once, when the row first scrolls into view. */
function useCountUp(target: number, run: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // expo-out, matching the CSS easing used elsewhere
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, run, duration]);

  return value;
}

function Stat({ value, suffix, label, run }: { value: number; suffix: string; label: string; run: boolean }) {
  const n = useCountUp(value, run);
  const isDecimal = !Number.isInteger(value);

  return (
    <div className="border-t border-line pt-6">
      <p
        className="font-display font-extrabold text-ink"
        style={{ fontSize: 'clamp(44px, 6vw, 96px)', lineHeight: 1, letterSpacing: '-0.04em' }}
      >
        {isDecimal ? n.toFixed(1) : Math.round(n)}
        <span className="text-coral">{suffix}</span>
      </p>
      <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted">{label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 lg:px-12 lg:py-28">
      <div ref={ref} className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
        {STATS.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} run={run} />
        ))}
      </div>
    </section>
  );
}
