import { MARQUEE_A, MARQUEE_B } from '../data/site';

function Row({ items, dir }: { items: string[]; dir: 'l' | 'r' }) {
  // Content is duplicated once and translated -50%, so the loop has no seam.
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div className={`flex shrink-0 items-center gap-8 pr-8 ${dir === 'l' ? 'marquee-l' : 'marquee-r'}`}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-8">
            <span className="font-display whitespace-nowrap text-lg font-semibold text-ink md:text-2xl">
              {item}
            </span>
            <span className="text-coral">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="border-y border-line py-6 md:py-8" aria-hidden="true">
      <Row items={MARQUEE_A} dir="l" />
      <div className="mt-4 hidden md:block">
        <Row items={MARQUEE_B} dir="r" />
      </div>
    </section>
  );
}
