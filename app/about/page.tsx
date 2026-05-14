export default function About() {
  return (
    <main className="page-wrap py-14 text-white sm:py-20">
      <header className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
        <div>
          <p className="section-kicker">~/about</p>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            My name is <span className="gradient-text">Sahil Chopra.</span>
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--mist-300)]">
            I am in 9th grade, I have been coding since I was 4 years old, and I am USACO Gold. I like building backend systems, web apps, Chrome extensions, and projects that are actually useful.
          </p>
        </div>

      <div className="glass-panel interactive-lift overflow-hidden p-3">
        <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(103,232,249,0.18)] bg-[rgba(8,13,28,0.6)]">
          <img
            src="/selfie.jpeg"
            alt="Photo of Me"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
      </header>

      <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.72fr]">
        <article className="glass-panel interactive-lift p-6 sm:p-7">
          <p className="section-kicker">focus</p>
          <h2 className="mt-3 text-2xl font-black">What I build</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 transition duration-300 hover:-translate-y-1 hover:border-[rgba(103,232,249,0.32)]">
              <p className="font-mono text-xs font-bold uppercase text-[var(--mist-500)]">
                focus
              </p>
              <p className="mt-2 font-bold text-[var(--mist-100)]">Backend</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 transition duration-300 hover:-translate-y-1 hover:border-[rgba(103,232,249,0.32)]">
              <p className="font-mono text-xs font-bold uppercase text-[var(--mist-500)]">
                focus
              </p>
              <p className="mt-2 font-bold text-[var(--mist-100)]">Web apps</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 transition duration-300 hover:-translate-y-1 hover:border-[rgba(103,232,249,0.32)]">
              <p className="font-mono text-xs font-bold uppercase text-[var(--mist-500)]">
                focus
              </p>
              <p className="mt-2 font-bold text-[var(--mist-100)]">Extensions</p>
            </div>
          </div>
        </article>

        <article className="glass-panel interactive-lift p-6 sm:p-7">
          <p className="section-kicker">studio</p>
          <h2 className="mt-3 text-2xl font-black">NuTab Studios</h2>
          <p className="mt-4 leading-8 text-[var(--mist-300)]">
            I created <a
              className="font-bold text-[var(--accent-300)] transition hover:text-white"
              href="https://nutabstudios.com"
              rel="noreferrer"
              target="_blank"
            >
              nutabstudios.com
            </a>
            , a small studio that hosts Homebase and future browser extensions.
          </p>
        </article>
      </section>

      <section className="mt-10">
        <div className="mb-5">
          <p className="section-kicker">skills</p>
          <h2 className="mt-2 text-2xl font-black">What I work with</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <article className="glass-panel interactive-lift p-5">
            <h3 className="text-xl font-black">Backend</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="pill">REST APIs</span>
              <span className="pill">Auth</span>
              <span className="pill">Databases</span>
              <span className="pill">Caching</span>
              <span className="pill">Node.js</span>
              <span className="pill">Python</span>
              <span className="pill">FastAPI</span>
              <span className="pill">Django</span>
            </div>
          </article>

          <article className="glass-panel interactive-lift p-5">
            <h3 className="text-xl font-black">Web Apps</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="pill">Next.js</span>
              <span className="pill">React</span>
              <span className="pill">TypeScript</span>
              <span className="pill">Tailwind CSS</span>
            </div>
          </article>

          <article className="glass-panel interactive-lift p-5">
            <h3 className="text-xl font-black">Chrome Extensions</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="pill">Manifest V3</span>
              <span className="pill">New tab pages</span>
              <span className="pill">Content scripts</span>
              <span className="pill">Chrome storage</span>
              <span className="pill">Extension UI</span>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
