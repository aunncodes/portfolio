export default function Privacy() {
  return (
    <main className="page-wrap py-14 text-white sm:py-20">
      <header className="max-w-3xl">
        <p className="section-kicker">privacy</p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--mist-300)]">
          Last updated: May 14, 2026
        </p>
      </header>

      <section className="mt-10 grid gap-5">
        <article className="glass-panel p-6">
          <h2 className="text-2xl font-black">What We Collect</h2>
          <p className="mt-4 leading-8 text-[var(--mist-300)]">
            Sahil Chopra and NuTab Studios do not collect, store, sell, share, track, or use your personal data. We do not ask for account information, and our websites and browser extensions are not designed to collect information about you.
          </p>
        </article>

        <article className="glass-panel p-6">
          <h2 className="text-2xl font-black">Browser Extension Data</h2>
          <p className="mt-4 leading-8 text-[var(--mist-300)]">
            Some extension features may save information locally in your browser so the extension can work properly. For example, Homebase may save quick links, notes, theme preferences, or weather settings on your own device. Sahil Chopra and NuTab Studios do not receive or use that information.
          </p>
        </article>

        <article className="glass-panel p-6">
          <h2 className="text-2xl font-black">Third-Party Services</h2>
          <p className="mt-4 leading-8 text-[var(--mist-300)]">
            Some features may rely on third-party services, such as weather providers, browser stores, hosting providers, or other tools needed to make a website or extension work. Those services may handle requests according to their own privacy policies.
          </p>
        </article>

        <article className="glass-panel p-6">
          <h2 className="text-2xl font-black">Advertising and Analytics</h2>
          <p className="mt-4 leading-8 text-[var(--mist-300)]">
            Sahil Chopra and NuTab Studios do not use your personal data for advertising, analytics, profiling, marketing, or tracking.
          </p>
        </article>

        <article className="glass-panel p-6">
          <h2 className="text-2xl font-black">Changes To This Policy</h2>
          <p className="mt-4 leading-8 text-[var(--mist-300)]">
            If this policy changes, the updated version will be posted on this page with a new last updated date.
          </p>
        </article>

        <article className="glass-panel p-6">
          <h2 className="text-2xl font-black">Contact</h2>
          <p className="mt-4 leading-8 text-[var(--mist-300)]">
            Questions about privacy or support can be sent to support@choprasahil.com.
          </p>
        </article>
      </section>
    </main>
  );
}
