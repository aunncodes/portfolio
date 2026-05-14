import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(5,10,19,0.68)] shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-none transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span className="gradient-text text-lg font-black sm:text-xl">
            Sahil Chopra
          </span>
          <span className="mt-1 hidden font-mono text-[0.65rem] font-semibold uppercase text-[var(--mist-500)] sm:block">
            backend / web / extensions
          </span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-3 font-mono text-xs font-bold sm:gap-6 sm:text-sm">
            <li>
              <Link href="/about" className="nav-link">
                ~/about
              </Link>
            </li>
            <li>
              <Link href="/projects" className="nav-link">
                ~/projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="nav-link">
                ~/contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
