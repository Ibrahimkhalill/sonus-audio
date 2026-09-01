import { useRef } from 'react';
import type { ReactNode } from 'react';

/** How far the card leans, in degrees, at the very edge. */
const MAX_TILT = 12;

/**
 * Leans the card toward the cursor in real 3D perspective, and lifts a
 * specular sheen that tracks the same point. Pure CSS transforms — no
 * WebGL context per card.
 */
export default function TiltCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = outerRef.current;
    const inner = innerRef.current;
    if (!node || !inner) return;

    const rect = node.getBoundingClientRect();
    // -0.5 .. 0.5 across the card
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    inner.style.transform =
      `rotateY(${px * MAX_TILT * 2}deg) rotateX(${-py * MAX_TILT * 2}deg) scale(1.03)`;

    if (sheenRef.current) {
      sheenRef.current.style.opacity = '1';
      sheenRef.current.style.background =
        `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.42), rgba(255,255,255,0) 55%)`;
    }
  };

  const handleLeave = () => {
    const inner = innerRef.current;
    if (inner) inner.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    if (sheenRef.current) sheenRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={outerRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
      style={{ perspective: '900px' }}
    >
      <div
        ref={innerRef}
        className="relative transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {children}
        <div
          ref={sheenRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
