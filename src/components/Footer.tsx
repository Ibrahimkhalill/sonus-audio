import { FOOTER_LINKS } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display flex items-start text-2xl font-extrabold tracking-[-0.03em] text-ink">
              SONUS<span className="ml-0.5 mt-0.5 text-[0.4em] font-semibold">®</span>
            </p>
            <p className="mt-4 max-w-[14rem] text-sm leading-relaxed text-muted">
              Audio equipment for people who listen closely.
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted transition-colors hover:text-ink">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line pt-8 text-xs text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} SONUS Audio. All rights reserved.</p>
          <p>
            Designed &amp; built by{' '}
            <a
              href="https://github.com/Ibrahimkhalill"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ink underline decoration-coral underline-offset-4 transition-colors hover:text-coral"
            >
              Ibrahim Khalil
            </a>{' '}
            &middot; Photography via Unsplash
          </p>
        </div>
      </div>
    </footer>
  );
}
