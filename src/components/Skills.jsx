import { useMemo, useState } from 'react'

const groups = ['All', 'Languages', 'Frameworks', 'Tools & services']

const skills = [
  {
    id: 'csharp',
    name: 'C#',
    mark: 'C#',
    group: 'Languages',
    since: '2022-09',
    description: 'Gameplay systems, Unity scripting, movement, combat, and game prototypes.',
    projects: ['Survival Game', 'Just Shapes and Guns'],
  },
  {
    id: 'dart',
    name: 'Dart',
    mark: 'Da',
    group: 'Languages',
    since: '2023-07',
    description: 'Mobile application development with Flutter, state management, and Firebase-backed features.',
    projects: ['Family Tree'],
  },
  {
    id: 'python',
    name: 'Python',
    mark: 'Py',
    group: 'Languages',
    since: '2024-11',
    description: 'Backends, automation, interpreters, AI experiments, algorithms, and tooling.',
    projects: ['Town of Salem', 'Arithma', 'Snake AI'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    mark: 'JS',
    group: 'Languages',
    since: '2025-04',
    description: 'Interactive web applications, browser tooling, and frontend product work.',
    projects: ['Exercise App', 'Homebase'],
  },
  {
    id: 'html',
    name: 'HTML',
    mark: '<>',
    group: 'Languages',
    since: '2025-04',
    description: 'Semantic application and website structure across personal, team, and open-source projects.',
    projects: ['Portfolio', 'Sentinels FTC', 'Sentinel Hacks'],
  },
  {
    id: 'css',
    name: 'CSS',
    mark: '{}',
    group: 'Languages',
    since: '2025-04',
    description: 'Responsive layout, animation, visual systems, and custom interface polish.',
    projects: ['Portfolio', 'Homebase', 'Sentinel Hacks'],
  },
  {
    id: 'mcfunction',
    name: 'mcfunction',
    mark: 'MC',
    group: 'Languages',
    since: '2025-07',
    description: 'Minecraft datapack systems, commands, game logic, and custom mechanics.',
    projects: ['Factory Builder'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    mark: 'TS',
    group: 'Languages',
    since: '2025-11',
    description: 'Typed frontend and full-stack development for larger React and Next.js codebases.',
    projects: ['Galactic Domination', 'Cue', 'USACO Guide'],
  },
  {
    id: 'java',
    name: 'Java',
    mark: 'Jv',
    group: 'Languages',
    since: '2026-01',
    description: 'FTC robot code and Java-based systems work.',
    projects: ['Sentinels FTC'],
  },
  {
    id: 'unity',
    name: 'Unity',
    mark: 'Un',
    group: 'Frameworks',
    since: '2022-09',
    description: '2D gameplay, input, animation, physics, UI, particles, and WebGL builds.',
    projects: ['Survival Game', 'Just Shapes and Guns'],
  },
  {
    id: 'flutter',
    name: 'Flutter',
    mark: 'Fl',
    group: 'Frameworks',
    since: '2023-07',
    description: 'Cross-platform app development with routing, state management, and generated models.',
    projects: ['Family Tree'],
  },
  {
    id: 'svelte',
    name: 'Svelte',
    mark: 'Sv',
    group: 'Frameworks',
    since: '2025-02',
    description: 'Reactive frontend development for collaborative developer tooling.',
    projects: ['Collaborative IDE'],
  },
  {
    id: 'react',
    name: 'React',
    mark: 'Re',
    group: 'Frameworks',
    since: '2025-04',
    description: 'Interactive product interfaces, games, extensions, and large open-source applications.',
    projects: ['Cue', 'Homebase', 'Galactic Domination'],
  },
  {
    id: 'vite',
    name: 'Vite',
    mark: 'Vi',
    group: 'Frameworks',
    since: '2025-11',
    description: 'Fast development and production builds for React, TypeScript, and Astro projects.',
    projects: ['Galactic Domination', 'Cue', 'Portfolio'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    mark: 'FA',
    group: 'Frameworks',
    since: '2025-12',
    description: 'Python APIs with typed validation and clean backend routing.',
    projects: ['Town of Salem'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    mark: 'Nx',
    group: 'Frameworks',
    since: '2026-02',
    description: 'Production React applications, server routes, content systems, and open-source web work.',
    projects: ['CPI', 'USACO Guide'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    mark: 'Tw',
    group: 'Frameworks',
    since: '2026-02',
    description: 'Utility-first styling for larger component-driven sites and applications.',
    projects: ['CPI', 'USACO Guide', 'Sentinels FTC'],
  },
  {
    id: 'astro',
    name: 'Astro',
    mark: 'As',
    group: 'Frameworks',
    since: '2026-08',
    description: 'Fast content-first sites with lightweight client-side behavior.',
    projects: ['Sentinels FTC', 'Sentinel Hacks'],
  },
  {
    id: 'git',
    name: 'Git',
    mark: 'Gt',
    group: 'Tools & services',
    since: '2020-04',
    description: 'Version control across personal projects, team codebases, and open-source contributions.',
    projects: ['GitHub', 'CPI', 'USACO Guide'],
  },
  {
    id: 'github',
    name: 'GitHub',
    mark: 'GH',
    group: 'Tools & services',
    since: '2020-04',
    description: 'Source control, pull requests, reviews, issue tracking, and collaborative development.',
    projects: ['aunncodes', 'CPI', 'USACO Guide'],
  },
  {
    id: 'firebase',
    name: 'Firebase',
    mark: 'Fb',
    group: 'Tools & services',
    since: '2023-07',
    description: 'App configuration, web data, authentication-adjacent workflows, and cloud-backed features.',
    projects: ['Family Tree', 'CPI'],
  },
  {
    id: 'node',
    name: 'Node.js',
    mark: 'Nd',
    group: 'Tools & services',
    since: '2025-11',
    description: 'JavaScript tooling, package ecosystems, build pipelines, and server-side project workflows.',
    projects: ['Galactic Domination', 'Cue', 'USACO Guide'],
  },
  {
    id: 'gradle',
    name: 'Gradle',
    mark: 'Gr',
    group: 'Tools & services',
    since: '2026-01',
    description: 'Java and Android build configuration for FTC robotics.',
    projects: ['Sentinels FTC'],
  },
  {
    id: 'android-studio',
    name: 'Android Studio',
    mark: 'An',
    group: 'Tools & services',
    since: '2026-01',
    description: 'FTC robot development, deployment, debugging, and Android-based tooling.',
    projects: ['Sentinels FTC'],
  },
  {
    id: 'ftc-sdk',
    name: 'FTC SDK',
    mark: 'FTC',
    group: 'Tools & services',
    since: '2026-01',
    description: 'Robot control, hardware integration, autonomous routines, and competition code.',
    projects: ['Sentinels FTC'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    mark: 'Vc',
    group: 'Tools & services',
    since: '2026-09',
    description: 'Preview and production deployments for modern web applications.',
    projects: ['Cue', 'Portfolio'],
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    mark: 'AI',
    group: 'Tools & services',
    since: '2026-09',
    description: 'Structured AI features and natural-language task refinement inside applications.',
    projects: ['Cue'],
  },
  {
    id: 'clerk',
    name: 'Clerk',
    mark: 'Cl',
    group: 'Tools & services',
    since: '2026-09',
    description: 'Account and authentication flows for web applications.',
    projects: ['Cue'],
  },
  {
    id: 'dexie',
    name: 'Dexie',
    mark: 'Dx',
    group: 'Tools & services',
    since: '2026-09',
    description: 'IndexedDB-backed local-first persistence and reactive client data.',
    projects: ['Cue'],
  },
  {
    id: 'upstash',
    name: 'Upstash Redis',
    mark: 'Up',
    group: 'Tools & services',
    since: '2026-09',
    description: 'Serverless Redis and rate limiting for lightweight web backends.',
    projects: ['Cue'],
  },
]

function formatDuration(since) {
  const [year, month] = since.split('-').map(Number)
  const now = new Date()
  const totalMonths = Math.max(1, (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month))
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years && months) return '~' + years + 'y ' + months + 'mo'
  if (years) return '~' + years + 'y'
  return '~' + totalMonths + 'mo'
}

function formatSince(since) {
  const [year, month] = since.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export default function Skills() {
  const [group, setGroup] = useState('All')
  const [selectedId, setSelectedId] = useState('python')

  const visibleSkills = useMemo(
    () => (group === 'All' ? skills : skills.filter((skill) => skill.group === group)),
    [group],
  )

  const selected = visibleSkills.find((skill) => skill.id === selectedId) || visibleSkills[0]

  function selectGroup(nextGroup) {
    setGroup(nextGroup)
    if (nextGroup !== 'All') {
      const current = skills.find((skill) => skill.id === selectedId)
      if (!current || current.group !== nextGroup) {
        setSelectedId(skills.find((skill) => skill.group === nextGroup)?.id || 'python')
      }
    }
  }

  return (
    <section className="skills" id="skills">
      <div className="section-heading">
        <h2>Skills</h2>
        <p>Languages, frameworks, and tools I use across web development, games, robotics, and backend work.</p>
      </div>

      <div className="skills__filters" aria-label="Filter skills">
        {groups.map((option) => (
          <button
            key={option}
            type="button"
            className={'skills__filter' + (group === option ? ' is-active' : '')}
            aria-pressed={group === option}
            onClick={() => selectGroup(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="skills__body">
        <div className="skills__catalog">
          <div className="skills__grid">
            {visibleSkills.map((skill) => {
              const isSelected = selected.id === skill.id
              return (
                <button
                  key={skill.id}
                  type="button"
                  className={'skill-card' + (isSelected ? ' is-selected' : '')}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(skill.id)}
                >
                  <span className="skill-card__mark" aria-hidden="true">{skill.mark}</span>
                  <span className="skill-card__copy">
                    <strong>{skill.name}</strong>
                    <span>{formatDuration(skill.since)}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <aside className="skills__detail" aria-live="polite">
          <span className="skills__detail-kicker">{selected.group}</span>
          <div className="skills__detail-title">
            <span className="skills__detail-mark" aria-hidden="true">{selected.mark}</span>
            <div>
              <h3>{selected.name}</h3>
              <span>{formatDuration(selected.since)} using it</span>
            </div>
          </div>

          <p>{selected.description}</p>

          <dl className="skills__detail-facts">
            <div>
              <dt>Using since</dt>
              <dd>{formatSince(selected.since)}</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>{formatDuration(selected.since)}</dd>
            </div>
          </dl>

          <div className="skills__projects">
            <span>Seen in</span>
            <div>
              {selected.projects.map((project) => <b key={project}>{project}</b>)}
            </div>
          </div>

          <small>Dates are approximate, inferred from the earliest matching project history I could verify.</small>
        </aside>
      </div>
    </section>
  )
}
