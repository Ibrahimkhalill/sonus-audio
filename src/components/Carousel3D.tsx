import { useEffect, useRef } from 'react';
import { CAROUSEL } from '../data/site';

const STEP = 360 / CAROUSEL.length;
/** Ring radius in px. With 8 cards this leaves ~35px between neighbours.
 *  Front-card magnification is perspective/(perspective - RADIUS), so this
 *  pairs with the 1500px perspective below for a 1.29x front card. */
const RADIUS = 340;
/** Degrees advanced per frame while idling. */
const IDLE_SPIN = 0.12;

export default function Carousel3D() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId = 0;

    const render = () => {
      // Idle spin, plus whatever momentum a drag left behind.
      if (!draggingRef.current && !hoverRef.current) {
        rotationRef.current += IDLE_SPIN;
      }
      rotationRef.current += velocityRef.current;
      velocityRef.current *= 0.94; // friction

      track.style.transform = `translateZ(-${RADIUS}px) rotateY(${rotationRef.current}deg)`;

      // Fade and desaturate cards as they travel to the back of the ring.
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const angle = ((i * STEP + rotationRef.current) % 360 + 360) % 360;
        // 0deg = facing the viewer, 180deg = directly behind.
        const facing = Math.cos((angle * Math.PI) / 180);
        const t = (facing + 1) / 2; // 0 at back, 1 at front
        card.style.opacity = String(0.18 + t * 0.82);
        card.style.filter = `saturate(${0.55 + t * 0.45})`;
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    // --- drag to spin -----------------------------------------------------
    let lastX = 0;

    const onDown = (e: PointerEvent) => {
      draggingRef.current = true;
      lastX = e.clientX;
      velocityRef.current = 0;
      track.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      rotationRef.current += dx * 0.25;
      velocityRef.current = dx * 0.25;
    };
    const onUp = () => {
      draggingRef.current = false;
    };

    const onEnter = () => (hoverRef.current = true);
    const onLeave = () => (hoverRef.current = false);

    track.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    track.addEventListener('pointerenter', onEnter);
    track.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frameId);
      track.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      track.removeEventListener('pointerenter', onEnter);
      track.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div
      className="relative h-[260px] w-full select-none sm:h-[300px] lg:h-[340px]"
      style={{ perspective: '1500px', perspectiveOrigin: '50% 44%' }}
    >
      {/* Centring lives on this wrapper - the track's own transform is the
          3D rotation, so it cannot also carry -translate-x-1/2. */}
      <div className="absolute left-1/2 top-0 h-full w-[176px] -translate-x-1/2 sm:w-[204px] lg:w-[232px]">
        <div
          ref={trackRef}
          className="h-full w-full cursor-grab active:cursor-grabbing"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
        {CAROUSEL.map((item, i) => (
          <div
            key={item.src}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="absolute inset-0"
            style={{
              transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src={item.src}
              alt={item.name}
              draggable={false}
              className="h-full w-full rounded-[1.6rem] object-cover shadow-soft"
            />
            <p className="mt-3 text-center text-xs font-medium tracking-wide text-muted">
              {item.name}
            </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
