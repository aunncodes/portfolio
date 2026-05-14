import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[rgba(5,10,19,0.48)] backdrop-blur-xl">
      <div className="page-wrap flex flex-col gap-4 py-8 text-sm text-[var(--mist-300)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-[var(--mist-100)]">Sahil Chopra</p>
          <p className="mt-1">
            Support: <a
              className="text-[var(--accent-300)] transition hover:text-white"
              href="mailto:support@choprasahil.com"
            >
              support@choprasahil.com
            </a>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 font-mono text-xs font-bold">
          <a
            className="nav-link"
            href="https://nutabstudios.com"
            rel="noreferrer"
            target="_blank"
          >
            nutabstudios.com
          </a>
          <Link className="nav-link" href="/privacy">
            privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
