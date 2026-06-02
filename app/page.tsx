import Image from 'next/image';

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">aunncodes</p>
          <h1>Hey!</h1>

          <p className="intro">
            I&apos;m Sahil. I&apos;m a backend programmer who likes building games, websites, and Chrome extensions.
          </p>
        </div>

        <Image
          src="/img.png"
          alt="Picture of me"
          className="avatar"
          width={112}
          height={112}
          priority
        />
      </section>

      <section className="section">
        <h2>About</h2>

        <p>
          I always love finding new repositories to contribute to on GitHub, and I also love working on my own random side projects whenever I get time. I code primarily in Python, TypeScript, and C++.
        </p>
      </section>

      <section className="section">
        <h2>Projects</h2>

        <div className="projects">
          <a className="project" href="https://github.com/devilExE3/FactoryBuilder">
            <div>
              <h3>Factory Builder</h3>
              <p>A Minecraft Datapack for a fun incremental factory game.</p>
            </div>

            <span>View</span>
          </a>

          <a
            className="project"
            href="https://github.com/aunncodes/TownOfSalem"
          >
            <div>
              <h3>Town Of Salem</h3>
              <p>A recreation of the popular game Town Of Salem, using Python and Node.js.</p>
            </div>

            <span>View</span>
          </a>

          <a
            className="project"
            href="https://github.com/aunncodes/Homebase"
          >
            <div>
              <h3>Homebase</h3>
              <p>A simplistic Chrome extension for a custom new tab page, with a variety of themes and tools.</p>
            </div>

            <span>View</span>
          </a>
        </div>
      </section>

      <section className="section">
        <h2>Contact</h2>

        <ul className="contact-list">
          <li>You can email me through <a href="mailto:choprasahil.sc@gmail.com">choprasahil.sc@gmail.com</a>.</li>
          <li>You can message me on discord through <a href="https://discord.com/users/682054289031823382">aunn.exe</a>.</li>
          <li>You can find my work on <a href="https://github.com/aunncodes">GitHub</a>.</li>
        </ul>
      </section>
    </main>
  );
}