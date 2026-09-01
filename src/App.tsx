import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Products from './components/Products';
import Showcase3D from './components/Showcase3D';
import Stats from './components/Stats';
import Editorial from './components/Editorial';
import Reviews from './components/Reviews';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-blush text-ink" style={{ overflowX: 'clip' }}>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <Showcase3D />
        <Stats />
        <Editorial />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
