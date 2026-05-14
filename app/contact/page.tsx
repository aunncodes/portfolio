export default function Contact() {
  return (
    <main className="page-wrap min-h-[calc(100vh-10rem)] py-14 text-white sm:py-20">
      <header className="max-w-3xl">
        <p className="section-kicker">~/contact</p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">
          Have a project, extension, or support question?
        </h1>
      </header>

      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        <a
          className="glass-panel interactive-lift min-h-44 p-7 sm:p-8"
          href="mailto:choprasahil.sc@gmail.com"
        >
          <p className="font-mono text-xs font-bold uppercase text-[var(--mist-500)]">
            Email
          </p>
          <p className="mt-4 break-words text-2xl font-black text-[var(--mist-100)]">
            choprasahil.sc@gmail.com
          </p>
        </a>

        <a
          className="glass-panel interactive-lift min-h-44 p-7 sm:p-8"
          href="mailto:support@choprasahil.com"
        >
          <p className="font-mono text-xs font-bold uppercase text-[var(--mist-500)]">
            Support
          </p>
          <p className="mt-4 break-words text-2xl font-black text-[var(--mist-100)]">
            support@choprasahil.com
          </p>
        </a>

        <a
          className="glass-panel interactive-lift min-h-44 p-7 sm:p-8"
          href="https://github.com/aunncodes"
          rel="noreferrer"
          target="_blank"
        >
          <p className="font-mono text-xs font-bold uppercase text-[var(--mist-500)]">
            GitHub
          </p>
          <p className="mt-4 break-words text-2xl font-black text-[var(--mist-100)]">
            github.com/aunncodes
          </p>
        </a>

        <a
          className="glass-panel interactive-lift min-h-44 p-7 sm:p-8"
          href="https://discord.com/users/682054289031823382"
          rel="noreferrer"
          target="_blank"
        >
          <p className="font-mono text-xs font-bold uppercase text-[var(--mist-500)]">
            Discord
          </p>
          <p className="mt-4 break-words text-2xl font-black text-[var(--mist-100)]">
            aunn.exe
          </p>
        </a>
      </section>
    </main>
  );
}
