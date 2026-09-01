# SONUS — Premium Audio Store Landing Page

A long-scroll landing page for a fictional headphone brand. Warm blush palette, soft serif display type, a drag-spinnable 3D product ring in the hero, and a second WebGL section with headphones built from primitives at runtime.

[**PROMPT.md**](PROMPT.md) contains the full nine-block specification this page was built from — fonts, exact hex values, every asset URL, the animation table with easing curves, and the stagger timeline. It is reusable as a template for other pages.

## Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 3.4 |
| 3D | Three.js (code-split) |
| Icons | lucide-react |
| Fonts | [Fraunces](https://fonts.google.com/specimen/Fraunces) (display) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) (body) |

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # typecheck + production build
npm run preview  # serve the build locally
```

> Tailwind v3 reads `tailwind.config.js` once at startup. **Restart the dev server after changing design tokens**, or you will keep seeing the old palette.

## Project structure

```
src/
├── App.tsx                        # section order
├── index.css                      # reset, base colours
├── data/site.ts                   # every image URL, product and copy string
├── lib/useReveal.ts               # IntersectionObserver reveal hook
├── styles/
│   ├── fonts.css
│   └── theme.css                  # keyframes, delay utilities, reduced-motion
└── components/
    ├── Hero.tsx                   # centred type + 3D ring
    ├── Carousel3D.tsx             # CSS 3D product ring
    ├── Scene3D.tsx                # Three.js headphones (lazy chunk)
    ├── Showcase3D.tsx             # section shell around Scene3D
    ├── Nav.tsx  Marquee.tsx  Products.tsx
    ├── Stats.tsx  Editorial.tsx  Reviews.tsx
    └── CTA.tsx  Footer.tsx
```

## Palette

| Role | Hex |
|---|---|
| Page background | `#F4E3DE` blush |
| Cards | `#FCF3F0` cream |
| Hairline | `#E2C7BF` |
| Text / dark buttons | `#1B1513` |
| Muted text | `#8E7B76` |
| Accent | `#D25B45` coral |
| Text on dark | `#FFF7F4` |

One accent only. Dark pills carry `#FFF7F4` text — ink-on-coral fails contrast.

## The hero ring

Eight product cards on a CSS cylinder: each sits at `rotateY(i * 45deg) translateZ(340px)` inside a `perspective: 1500px` stage. It idles at `0.12deg` per frame, pauses on hover, and can be dragged with momentum (`velocity *= 0.94`). Opacity and saturation follow `cos(angle)`, so the back of the ring recedes to `0.18`.

**Sizing rule:** front-card magnification is `perspective / (perspective − radius)`. At 1500/340 that is **1.29×** — enough depth to read as 3D, small enough that the card still fits its section. A shorter perspective overflows the viewport; a longer one flattens the ring into a plain row.

## The WebGL section

`Scene3D` builds the headphones from Three.js primitives at runtime — a torus headband, capsule ear cups, torus fabric pads, rose-gold `MeshPhysicalMaterial` at `metalness: 0.95, roughness: 0.28`. Nothing is downloaded, the materials match the palette exactly, and it cannot fail on a slow connection.

Three.js is code-split via `React.lazy` and only imported once the section is within `400px` of the viewport, keeping it out of the main bundle:

```
index.js    219 kB   (68 kB gzip)
Scene3D.js  492 kB  (124 kB gzip)  ← loaded on demand
```

The render loop stops whenever the canvas leaves the viewport, and `setPixelRatio` is capped at 2 so high-DPR screens do not render 9× the pixels.

## Animation system

Two easing curves carry the whole page:

- `cubic-bezier(0.16, 1, 0.3, 1)` — expo-out, for everything that enters
- `cubic-bezier(0.34, 1.56, 0.64, 1)` — overshoot, used on the headline words **only**

That contrast is what makes the motion feel authored rather than generic. Sections below the fold reveal through an IntersectionObserver that adds a class — no scroll listener, no per-frame work. Every keyframe is disabled under `prefers-reduced-motion`.

## Gotcha worth knowing

Anything with an entrance animation or a 3D rotation cannot also use a Tailwind translate class for positioning — the animation writes an inline `transform` and wins, so `-translate-x-1/2` is silently dropped and the element sits off-centre. Put positioning on a wrapper element. This affects the hero ring and every revealed image.

## Assets

Photography is hotlinked from Unsplash. Swap the ids in `src/data/site.ts` for your own product shots.
