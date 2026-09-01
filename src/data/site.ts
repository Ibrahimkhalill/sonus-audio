const photo = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const IMAGES = {
  heroPrimary: photo('1613040809024-b4ef7ba99bc3', 1400),
  heroSecondary: photo('1545127398-14699f92334b', 800),
  editorial: photo('1484704849700-f032a568e944', 1200),
  collection: photo('1567928513899-997d98489fbd', 1600),
  lifestyle: photo('1546435770-a3e426bf472b', 1200),
  ambience: photo('1520170350707-b2da59970118', 1400),
};

/** Khronos glTF sample asset (CC-BY 4.0), served with CORS enabled. */
export const MODEL_URL =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BoomBox/glTF-Binary/BoomBox.glb';


/** Product shots that ride the hero's 3D ring. */
export const CAROUSEL: { src: string; name: string }[] = [
  { src: photo('1613040809024-b4ef7ba99bc3', 700), name: 'Aura Max · Rose' },
  { src: photo('1628202926206-c63a34b1618f', 700), name: 'Aura Max · Forest' },
  { src: photo('1618366712010-f4ae9c647dcb', 700), name: 'Studio One' },
  { src: photo('1577174881658-0f30ed549adc', 700), name: 'Mono White' },
  { src: photo('1628116709703-c1c9ad550d36', 700), name: 'Mist Edition' },
  { src: photo('1545127398-14699f92334b', 700), name: 'Blush Edition' },
  { src: photo('1484704849700-f032a568e944', 700), name: 'Heritage' },
  { src: photo('1505740420928-5e560c06d30e', 700), name: 'Studio One · Noir' },
];

export interface Product {
  id: string;
  name: string;
  tag: string;
  price: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: '01', name: 'Aura Max',      tag: 'Flagship',   price: '$549', image: photo('1628202926206-c63a34b1618f', 900) },
  { id: '02', name: 'Studio One',    tag: 'Reference',  price: '$389', image: photo('1618366712010-f4ae9c647dcb', 900) },
  { id: '03', name: 'Mist Edition',  tag: 'Limited',    price: '$429', image: photo('1628116709703-c1c9ad550d36', 900) },
  { id: '04', name: 'Mono White',    tag: 'Everyday',   price: '$249', image: photo('1577174881658-0f30ed549adc', 900) },
];

export const MARQUEE_A = [
  'Active Noise Cancelling', '40mm Beryllium Drivers', '60-Hour Battery',
  'Spatial Audio', 'Lossless over USB-C', 'Memory Foam Cups',
];

export const MARQUEE_B = [
  'Free 2-Day Shipping', '2-Year Warranty', '30-Day Returns',
  'Carbon Neutral', 'Repairable by Design', 'Hand Assembled',
];

export const STATS = [
  { value: 60,  suffix: 'h',   label: 'Battery on a single charge' },
  { value: 42,  suffix: 'dB',  label: 'Active noise reduction' },
  { value: 4.9, suffix: '/5',  label: 'Average across 12,400 reviews' },
];

export const REVIEWS = [
  { name: 'Mariam H.',  role: 'Mastering engineer', quote: 'The midrange is honest. I mixed a whole record on the Studio One and it translated to every system I tested.' },
  { name: 'Daniel O.',  role: 'Long-haul flyer',    quote: 'Forty-two decibels is not marketing. Engine noise on a red-eye simply stops existing.' },
  { name: 'Priya N.',   role: 'Producer',           quote: 'Sixty hours means I stopped carrying a charger. The cups still feel fine at hour nine.' },
];

export const FOOTER_LINKS = [
  { title: 'Shop',      items: ['Headphones', 'Earbuds', 'Speakers', 'Accessories'] },
  { title: 'Company',   items: ['About', 'Engineering', 'Careers', 'Press'] },
  { title: 'Support',   items: ['Help Centre', 'Warranty', 'Repairs', 'Contact'] },
  { title: 'Legal',     items: ['Privacy', 'Terms', 'Cookies', 'Accessibility'] },
];
