import Carousel3D from './Carousel3D';

/**
 * Built on the Aethera hero system: one centred axis for every element, and a
 * single full-bleed image melting into the page background. No floating cards,
 * no chips, no badges - the type and the photograph carry it alone.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-73px)] w-full flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* ---- centred copy ---- */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-10 text-center md:px-8 md:pt-14">
        <h1
          className="font-display w-full font-normal text-ink"
          style={{
            fontSize: 'clamp(38px, 6.4vw, 104px)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
          }}
        >
          <span className="a-word-pop d-100 mr-[0.22em] inline-block">Sound</span>{' '}
          <span className="a-word-pop d-200 mr-[0.22em] inline-block italic text-muted">
            without
          </span>{' '}
          <span className="a-word-pop d-300 inline-block">limits.</span>
        </h1>

        <p className="a-fade-up d-500 mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Beryllium drivers, forty-two decibels of active silence, and sixty
          hours between charges. Built for people who listen closely.
        </p>

        <button
          type="button"
          className="a-fade-up d-600 mt-9 rounded-full bg-ink px-12 py-4 text-base font-medium text-on-coral transition-opacity hover:opacity-90"
        >
          Shop the range
        </button>
      </div>

      {/* ---- 3D product ring ---- */}
      <div className="a-fade-up d-700 relative z-0 mt-8 w-full md:mt-10">
        <Carousel3D />
        {/* Melt the ring's outer cards into the blush ground. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #F4E3DE 0%, rgba(244,227,222,0) 18%, rgba(244,227,222,0) 82%, #F4E3DE 100%)',
          }}
        />
      </div>

    </section>
  );
}
