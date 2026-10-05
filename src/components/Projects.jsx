import TiltCard from './TiltCard'
import { assets, compactProjects } from '../data'

function ProjectLinks({ children }) {
  return <div className="project-links">{children}</div>
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="section-heading"><h2>Projects</h2></div>

      <article className="feature-project feature-project--cue" data-project-card>
        <div className="feature-project__copy">
          <h3>Cue</h3>
          <p>Local-first task capture that turns natural-language entries into structured tasks and events, with optional AI refinement.</p>
          <div className="project-facts"><span>React</span><span>TypeScript</span><span>Dexie</span><span>OpenAI</span><span>Clerk</span></div>
          <ProjectLinks>
            <a href="https://cue-blond-one.vercel.app" target="_blank" rel="noreferrer" className="magnetic">Live ↗</a>
            <a href="https://github.com/aunncodes/Cue" target="_blank" rel="noreferrer" className="magnetic">GitHub ↗</a>
          </ProjectLinks>
        </div>
        <TiltCard className="project-frame">
          <div className="project-frame__rim" />
          <img src={assets.cue} alt="Cue productivity app dashboard" loading="lazy" />
          <span className="project-frame__glare" aria-hidden="true" />
        </TiltCard>
      </article>

      <article className="feature-project feature-project--homebase" data-project-card>
        <div className="feature-project__copy">
          <h3>Homebase</h3>
          <p>Custom new-tab extension with weather, quick links, notes, timers, and multiple visual themes.</p>
          <div className="project-facts"><span>React</span><span>TypeScript</span><span>Chrome</span><span>Firefox</span></div>
          <ProjectLinks>
            <a href="https://github.com/aunncodes/Homebase" target="_blank" rel="noreferrer" className="magnetic">GitHub ↗</a>
          </ProjectLinks>
        </div>
        <TiltCard className="project-frame project-frame--homebase">
          <div className="project-frame__rim" />
          <img src={assets.homebase} alt="Homebase dark dashboard" loading="lazy" />
          <span className="project-frame__glare" aria-hidden="true" />
        </TiltCard>
      </article>

      <article className="feature-project feature-project--duck" data-project-card>
        <div className="feature-project__copy">
          <h3>Galactic Domination</h3>
          <p>A Sort the Court!-style strategy game about conquering space, built with React and Vite with music, a custom introduction, and 15+ characters.</p>
          <div className="project-facts"><span>React</span><span>Vite</span><span>Game design</span></div>
          <ProjectLinks>
            <a href="https://github.com/aunncodes/Galactic-Domination" target="_blank" rel="noreferrer" className="magnetic">GitHub ↗</a>
          </ProjectLinks>
        </div>
        <TiltCard className="duck-scene" strength={5}>
          <img className="duck-scene__background" src={assets.duckBackground} alt="" loading="lazy" />
          <img className="duck-scene__side duck-scene__side--left" src={assets.duckJester} alt="" loading="lazy" />
          <img className="duck-scene__main" src={assets.duckThrone} alt="Warlord duck character from the game" loading="lazy" />
          <img className="duck-scene__side duck-scene__side--right" src={assets.duckGeneral} alt="" loading="lazy" />
          <span className="project-frame__glare" aria-hidden="true" />
        </TiltCard>
      </article>

      <article className="feature-project feature-project--sentinel" data-project-card>
        <div className="feature-project__copy">
          <h3>Sentinels FTC</h3>
          <p><strong>Team Lead / Programmer.</strong> Built and maintain the FTC team website and the Sentinel Hacks website.</p>
          <ProjectLinks>
            <a href="https://www.sentinelsftc.tech/" target="_blank" rel="noreferrer" className="magnetic">FTC site ↗</a>
            <a href="https://sentinelhacks.tech/" target="_blank" rel="noreferrer" className="magnetic">Hackathon site ↗</a>
          </ProjectLinks>
        </div>
        <TiltCard className="sentinel-media">
          <div className="sentinel-media__photo sentinel-media__photo--one"><img src={assets.sentinelOne} alt="Sentinels FTC at competition" loading="lazy" /></div>
          <div className="sentinel-media__photo sentinel-media__photo--two"><img src={assets.sentinelTwo} alt="Sentinels FTC team during competition" loading="lazy" /></div>
          <div className="sentinel-media__card"><img src={assets.sentinelHacks} alt="Sentinel Hacks social card" loading="lazy" /></div>
        </TiltCard>
      </article>

      <div className="project-index">
        {compactProjects.map((project) => (
          <a key={project.name} href={project.href} target="_blank" rel="noreferrer" className="project-row magnetic">
            <span>{project.name}</span>
            <p>{project.description}</p>
            <b>{project.tech} ↗</b>
          </a>
        ))}
      </div>
    </section>
  )
}
