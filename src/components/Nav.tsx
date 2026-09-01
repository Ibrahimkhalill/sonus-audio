import { Search, ShoppingBag } from 'lucide-react';

const LINKS = ['Shop', 'Technology', 'Reviews', 'Support'];

export default function Nav() {
  return (
    <header className="a-fade-in sticky top-0 z-50 border-b border-line bg-blush/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 md:px-8 lg:px-12">
        <a href="#top" className="font-display flex items-start text-2xl font-extrabold tracking-[-0.03em] text-ink lg:text-[1.75rem]">
          SONUS<span className="ml-0.5 mt-0.5 text-[0.4em] font-semibold">®</span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l}>
              <a href="#" className="text-sm font-medium text-muted transition-colors hover:text-ink">
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button type="button" aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink sm:flex">
            <Search className="h-4 w-4" strokeWidth={1.6} />
          </button>

          <button type="button" aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink">
            <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-blush bg-coral text-[10px] font-bold text-on-coral">
              2
            </span>
          </button>

          <button type="button"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-on-coral transition-colors hover:bg-coral-hover">
            Buy Now
          </button>
        </div>
      </nav>
    </header>
  );
}
