import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <main className="page-wrap py-14 text-white sm:py-20">
      <header className="max-w-3xl">
        <p className="section-kicker">~/projects</p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">
          Projects with a <span className="gradient-text">browser-home base.</span>
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--mist-300)]">
          A small collection of things I have built. Homebase is the main public project right now.
        </p>
      </header>

      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        <Link className="glass-panel interactive-lift group min-h-80 p-6 sm:p-7" href="https://www.nutabstudios.com/homebase" target="_blank" rel="noopener noreferrer">
          <div className="flex h-full flex-col justify-between gap-8">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-xl border border-[rgba(94,234,212,0.26)] bg-[rgba(94,234,212,0.11)]">
                  <Image
                    alt="Homebase logo"
                    className="object-cover"
                    fill
                    sizes="4rem"
                    src="/homebase-icon.png"
                  />
                </div>
                <div>
                  <p className="section-kicker">Custom new tab extension</p>
                  <h2 className="mt-1 text-3xl font-black">Homebase</h2>
                </div>
              </div>

              <p className="text-lg leading-8 text-[var(--mist-300)]">
                Weather, quick links, notes, and themes in a simple new tab page.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                <span className="pill">new tab</span>
                <span className="pill">personal</span>
                <span className="pill">minimalistic</span>
                <span className="pill">Chrome extension</span>
              </div>
              <p className="mt-6 font-mono text-sm font-bold text-[var(--accent-300)] transition duration-300 group-hover:translate-x-1 group-hover:text-white">
                View Homebase -&gt;
              </p>
            </div>
          </div>
        </Link>

        <article className="glass-panel min-h-80 p-6 sm:p-7">
          <div className="flex h-full flex-col justify-between gap-8">
            <div>
              <div className="grid h-16 w-16 place-items-center rounded-xl border border-white/10 bg-white/[0.045] font-mono text-2xl font-black text-[var(--mist-500)]">
                +
              </div>
              <p className="section-kicker mt-6">next up</p>
              <h2 className="mt-2 text-3xl font-black">More coming soon...</h2>
              <p className="mt-4 text-lg leading-8 text-[var(--mist-300)]">
                I&#39;m always working on projects, so be prepared for something to be here soon!
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
