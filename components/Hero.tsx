import Link from "next/link";

export default function Hero() {
  return (
    <section className="page-wrap grid min-h-[calc(100vh-4.75rem)] items-center gap-10 py-14 text-white lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
      <div>
        <p className="section-kicker">Backend / web apps / Chrome extensions</p>

        <h1 className="mt-4 text-5xl font-black leading-[1.02] sm:text-6xl">
          Sahil Chopra
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--mist-300)]">
          Hi! I&#39;m a young coder who has been coding for their entire life. Check out some of my projects!
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="primary-action">
            View Projects
          </Link>

          <Link href="/contact" className="secondary-action">
            Contact Me
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <span className="pill">Backend</span>
          <span className="pill">Web apps</span>
          <span className="pill">Chrome extensions</span>
        </div>
      </div>

      <aside className="glass-panel interactive-lift p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase text-[var(--accent-300)]">
              currently...
            </p>
            <h2 className="mt-1 text-2xl font-black">Working on Homebase</h2>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-lg border border-[rgba(103,232,249,0.24)] bg-[rgba(103,232,249,0.1)] font-mono text-lg font-black text-[var(--wave-300)]">
            ~/ 
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <div className="rounded-lg border border-[rgba(196,181,253,0.18)] bg-[rgba(196,181,253,0.08)] p-4">
            <p className="section-kicker">studio</p>
            <h3 className="mt-2 text-xl font-black text-white">NuTab Studios</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--mist-300)]">
              I created <a
                className="font-bold text-[var(--violet-300)] transition hover:text-white"
                href="https://nutabstudios.com"
                rel="noreferrer"
                target="_blank"
              >
                NuTab Studios
              </a>
              , a small studio that hosts the Homebase project.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <p className="section-kicker">socials</p>
            <h3 className="mt-2 text-xl font-black text-white">GitHub</h3>
            <a
              className="mt-3 inline-flex font-mono text-sm font-bold text-[var(--accent-300)] transition hover:translate-x-1 hover:text-white"
              href="https://github.com/aunncodes"
              rel="noreferrer"
              target="_blank"
            >
              github.com/aunncodes -&gt;
            </a>
          </div>
        </div>
      </aside>
    </section>
  );
}
