# Prompt: SONUS — Premium Audio Store Landing Page

## 1. Brief

Build a single-page **"SONUS"** premium headphone/audio store landing page using **React + Vite + TypeScript + Tailwind CSS + Three.js + Lucide React**. Viewport-height hero followed by a long-scroll page. Warm, soft, high-key editorial aesthetic — blush ground, near-black ink, one coral accent. Three breakpoints (mobile, `md`, `lg+`). Every section below the hero reveals on scroll via IntersectionObserver — never all at once on load.

---

## 2. Fonts (Google Fonts)

- **Fraunces** (weights 400, 600, 700, optical sizing on) — display: logo, headline, section headings, stat numbers. Sentence case, never all-caps: the soft serif is what reads as premium.
- **DM Sans** (weights 400, 500, 700) — body, nav, labels, buttons

Load via `<link>` in `index.html`:

```
https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap
```

Apply with `.font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }` and `body { font-family: 'DM Sans', sans-serif; }`.

---

## 3. Color Palette

| Role | Hex |
|---|---|
| Background (page) | `#F4E3DE` blush |
| Surface (cards) | `#FCF3F0` cream |
| Secondary panel | `#EBCEC6` rose |
| Hairline / border | `#E2C7BF` |
| Text primary / dark buttons | `#1B1513` ink |
| Text muted | `#8E7B76` |
| Accent | `#D25B45` coral |
| Accent hover | `#BC4E39` |
| Text on dark/accent | `#FFF7F4` |

One accent only. No gradients on text, no glow. Dark pills carry `#FFF7F4` text — never ink-on-coral, the contrast fails.

---

## 4. Assets (all external, do not download)

**3D model** — none. The headphones in the showcase section are built from Three.js primitives at runtime (torus headband, capsule ear cups, torus fabric pads) with a rose-gold `MeshPhysicalMaterial` at `metalness: 0.95, roughness: 0.28`. Nothing to download, the materials match the palette exactly, and it cannot fail on a slow connection.

**Photography** — Unsplash, pattern `https://images.unsplash.com/photo-{id}?w={w}&q=80&auto=format&fit=crop`:

| Slot | Photo id |
|---|---|
| Hero product (rose gold on pink) | `1613040809024-b4ef7ba99bc3` |
| Product 01 — Aura Max | `1628202926206-c63a34b1618f` |
| Product 02 — Studio One | `1618366712010-f4ae9c647dcb` |
| Product 03 — Mist Edition | `1628116709703-c1c9ad550d36` |
| Product 04 — Mono White | `1577174881658-0f30ed549adc` |
| Editorial split | `1484704849700-f032a568e944` |
| Collection band | `1567928513899-997d98489fbd` |
| Lifestyle / desk | `1546435770-a3e426bf472b` |
| Dark ambience | `1520170350707-b2da59970118` |

---

## 5. Section-by-Section

1. **Nav** — sticky top, `backdrop-blur`, hairline bottom. Logo `SONUS` (display 600, tracking `-0.03em`) + superscript `®`. Links: Shop, Technology, Reviews, Support. Right: Search, Cart (badge `2`), dark pill button "Buy Now".
2. **Hero** — one centred axis, nothing else. Headline, sub-paragraph and a single CTA stack down the middle; a 3D product ring sits beneath them. No eyebrow chips, no floating stat cards, no bordered image card — the restraint is the design.
   - Headline: `Sound without limits.` — display 400, `clamp(38px, 6.4vw, 104px)`, `line-height: 1.02`, `letter-spacing: -0.03em`. The middle word is *italic* in muted grey; the outer words are ink. Each word gets `.a-word-pop`, 100 ms apart.
   - `inline-block` siblings collapse the JSX whitespace between them — space the words with `mr-[0.22em]`, not a text node.
   - **3D ring** (`Carousel3D`): 8 product cards on a CSS cylinder, each at `rotateY(i * 45deg) translateZ(340px)` inside a `perspective: 1500px` stage. Idles at `0.12deg`/frame, pauses on hover, and is drag-spinnable with momentum (`velocity *= 0.94`). Card opacity and saturation track `cos(angle)` so the back of the ring recedes: `opacity = 0.18 + t * 0.82`.
   - **Geometry rule:** front-card magnification is `perspective / (perspective - radius)`. 1500/340 gives 1.29x — enough depth to read as 3D, small enough that the card still fits the section. Drop the perspective and it overflows; raise it and the ring goes flat.
   - Left and right gradient masks melt the outer cards into the blush ground.

3. **Marquee** — infinite horizontal strip of feature words separated by `◆`, ink on blush with coral diamonds, 2 rows counter-scrolling.
4. **Products** — 4-card grid (`1 / 2 / 4` cols). Each: image `aspect-[4/5]`, hover scale 1.04, name, coral price, dark circular "Add" button appearing on hover.
5. **3D Showcase** — Three.js canvas, procedural rose-gold headphones. Rotates continuously, drifts up and down, **and** tilts with scroll progress. The Three.js chunk is lazy-imported only when the section is within `400px` of the viewport. Text left, canvas right.
6. **Specs** — 3 stat columns, huge display numbers `clamp(48px, 6vw, 96px)`, count-up on reveal.
7. **Editorial** — 50/50 split, tall image + long-form copy, coral underline link.
8. **Reviews** — 3 quote cards, coral avatar initials, 5 coral stars.
9. **CTA band** — full-width ink panel, `#FFF7F4` text, coral submit button, email capture.
10. **Footer** — 4 columns, hairline top, fine print.

---

## 6. Breakpoints

- **lg+ (1024px+)** — hero headline up to 420px with the product absolutely centred in front of it; floating stat cards visible; products 4-up; showcase side-by-side.
- **md (768–1023px)** — hero headline still `23vw`; product in normal flow under the headline; floating stat cards hidden; products 2-up; showcase stacks, canvas 420px tall.
- **< md** — single column; hero headline floors at 64px; product `w-[74vw]` in flow; products 1-up; marquee single row; stats stack; canvas 320px tall.

---

## 7. Animations

Two easing curves only — everything enters on the first, exactly one element overshoots on the second.

| Class | Transform | Duration | Easing |
|---|---|---|---|
| `.a-fade-up` | `translateY(32px)` → 0, opacity 0→1 | 0.8s | `cubic-bezier(0.16,1,0.3,1)` |
| `.a-fade-in` | opacity 0→1 | 0.6s | `ease-out` |
| `.a-slide-left` | `translateX(-40px)` → 0 | 0.8s | `cubic-bezier(0.16,1,0.3,1)` |
| `.a-slide-right` | `translateX(40px)` → 0 | 0.8s | `cubic-bezier(0.16,1,0.3,1)` |
| `.a-word-pop` | `translateY(64px) scale(0.72) rotate(-4deg) blur(10px)` → overshoot → settle | 0.9s | `cubic-bezier(0.34,1.56,0.64,1)` |
| `.a-photo-reveal` | `translateY(72px) scale(1.03)` → normal | 1.1s | `cubic-bezier(0.16,1,0.3,1)` |
| `.a-scale-in` | `scale(0.88)` → 1 | 0.7s | `cubic-bezier(0.16,1,0.3,1)` |
| `.marquee-l` / `.marquee-r` | `translateX(0 → -50%)` / reverse | 32s linear infinite | `linear` |

All use `animation-fill-mode: both`. `.a-word-pop` starts at `opacity: 0`.
Delay utilities `.d-100` … `.d-1000` in 100 ms steps.
Wrap every keyframe class in `@media (prefers-reduced-motion: reduce) { animation: none }`.

---

## 8. Stagger Order

**On load (hero only):**

| ms | What |
|---|---|
| 0 | Nav fades in |
| 100–500 | Headline words pop in, 100 ms apart |
| 100–300 | Headline words pop in, 100 ms apart |
| 500 | Sub-paragraph fades up |
| 600 | CTA fades up |
| 700 | 3D product ring fades up |

**On scroll (every other section):** IntersectionObserver at `threshold: 0.15`, fires once, children stagger 80 ms apart in DOM order.

---

## 9. Key Technical Details

- Reveal is **IntersectionObserver adding a class**, not a scroll listener — no per-frame work.
- Three.js is **code-split** (`React.lazy`) and only imported when the showcase section is within `400px` of the viewport, keeping it out of the main bundle. Render a fallback message if WebGL is unavailable.
- Three.js render loop **stops when the canvas leaves the viewport** (`IntersectionObserver` → cancel `requestAnimationFrame`) so it never burns GPU off-screen.
- `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` — capping at 2 avoids melting high-DPR laptops.
- Every `<img>` below the fold gets `loading="lazy"` and an explicit `aspect-ratio` so nothing shifts.
- Marquee duplicates its content once and translates `-50%`, so the loop is seamless with no gap.
- Responsive via `hidden lg:flex` show/hide, not CSS-only media queries.
- Page must not scroll horizontally at any width: `overflow-x: clip` on the wrapper.
- **Tailwind v3 loads `tailwind.config.js` once at startup** — restart the dev server after changing tokens, or you will keep seeing the old palette.
- Anything given an entrance animation — or a 3D rotation — must not also rely on a Tailwind translate class for positioning: the animation writes an inline `transform` and wins. Put positioning on a wrapper element. This bites the hero ring and any revealed image.
