import { useMemo, useState } from 'react'

const groups = ['All', 'Languages', 'Frameworks', 'Tools']
const devicon = (path) => 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/' + path

const skills = [
  {
    id: 'scratch',
    name: 'Scratch',
    group: 'Languages',
    start: new Date(2016, 0, 1),
    icons: ['https://cdn.simpleicons.org/scratch/F7A83E'],
    description: 'Where I started programming, building games and learning the fundamentals of logic, state, and interaction.',
    projects: ['Early games', 'Programming fundamentals'],
  },
  {
    id: 'python',
    name: 'Python',
    group: 'Languages',
    start: new Date(2016, 0, 1),
    icons: [devicon('python/python-original.svg')],
    description: 'Backends, automation, interpreters, algorithms, AI experiments, and general-purpose tooling.',
    projects: ['Town of Salem', 'Arithma', 'Snake AI'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    group: 'Languages',
    start: new Date(2017, 0, 1),
    icons: [devicon('javascript/javascript-original.svg')],
    description: 'Interactive web applications, browser tooling, frontend systems, and quick prototypes.',
    projects: ['Homebase', 'Portfolio', 'Web projects'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    group: 'Languages',
    start: new Date(2025, 10, 1),
    icons: [devicon('typescript/typescript-original.svg')],
    description: 'Typed application development for larger React, Vite, and Next.js codebases.',
    projects: ['Cue', 'Galactic Domination', 'USACO Guide'],
  },
  {
    id: 'java',
    name: 'Java',
    group: 'Languages',
    start: new Date(2021, 0, 1),
    icons: [devicon('java/java-original.svg')],
    description: 'Object-oriented programming, robotics software, and larger Java codebases.',
    projects: ['Sentinels FTC', 'FTC robot code'],
  },
  {
    id: 'csharp',
    name: 'C#',
    group: 'Languages',
    start: new Date(2022, 8, 1),
    icons: [devicon('csharp/csharp-original.svg')],
    description: 'Gameplay systems, Unity scripting, movement, combat, UI, and game prototypes.',
    projects: ['Survival Game', 'Just Shapes and Guns'],
  },
  {
    id: 'cplusplus',
    name: 'C++',
    group: 'Languages',
    start: new Date(2023, 0, 1),
    icons: [devicon('cplusplus/cplusplus-original.svg')],
    description: 'Systems-oriented programming, performance-focused code, and lower-level problem solving.',
    projects: ['Programming experiments'],
  },
  {
    id: 'html-css',
    name: 'HTML & CSS',
    group: 'Languages',
    start: new Date(2017, 0, 1),
    icons: [devicon('html5/html5-original.svg'), devicon('css3/css3-original.svg')],
    description: 'Semantic web structure, responsive layouts, animation, and custom visual systems.',
    projects: ['Portfolio', 'Sentinels FTC', 'Sentinel Hacks'],
  },
  {
    id: 'react',
    name: 'React',
    group: 'Frameworks',
    start: new Date(2025, 3, 1),
    icons: [devicon('react/react-original.svg')],
    description: 'Interactive product interfaces, games, extensions, and component-driven web applications.',
    projects: ['Cue', 'Homebase', 'Galactic Domination'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    group: 'Frameworks',
    start: new Date(2026, 1, 1),
    icons: [devicon('nextjs/nextjs-original.svg')],
    mono: true,
    description: 'Production React applications, server routes, content systems, and open-source web work.',
    projects: ['CPI', 'USACO Guide'],
  },
  {
    id: 'unity',
    name: 'Unity',
    group: 'Frameworks',
    start: new Date(2022, 0, 1),
    icons: [devicon('unity/unity-original.svg')],
    mono: true,
    description: '2D gameplay, input, animation, physics, UI, particles, and WebGL builds.',
    projects: ['Survival Game', 'Just Shapes and Guns'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    group: 'Frameworks',
    start: new Date(2025, 11, 1),
    icons: [devicon('fastapi/fastapi-original.svg')],
    description: 'Python APIs with typed validation, clean routing, and structured backend logic.',
    projects: ['Town of Salem'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    group: 'Frameworks',
    start: new Date(2026, 1, 1),
    icons: [devicon('tailwindcss/tailwindcss-original.svg')],
    description: 'Utility-first styling for larger component-driven sites and shared UI systems.',
    projects: ['CPI', 'USACO Guide', 'Sentinels FTC'],
  },
  {
    id: 'node',
    name: 'Node.js',
    group: 'Tools',
    start: new Date(2022, 0, 1),
    icons: [devicon('nodejs/nodejs-original.svg')],
    description: 'JavaScript tooling, package ecosystems, build pipelines, scripts, and server-side workflows.',
    projects: ['Cue', 'Galactic Domination', 'USACO Guide'],
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    group: 'Tools',
    start: new Date(2020, 3, 29),
    icons: [devicon('git/git-original.svg'), devicon('github/github-original.svg')],
    monoLast: true,
    description: 'Version control, pull requests, reviews, issue tracking, and collaborative open-source development.',
    projects: ['CPI', 'USACO Guide', 'Personal projects'],
  },
  {
    id: 'vite',
    name: 'Vite',
    group: 'Tools',
    start: new Date(2025, 10, 1),
    icons: [devicon('vitejs/vitejs-original.svg')],
    description: 'Fast development and production builds for React and TypeScript applications.',
    projects: ['Cue', 'Portfolio', 'Galactic Domination'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    group: 'Tools',
    start: new Date(2026, 8, 1),
    icons: [devicon('vercel/vercel-original.svg')],
    mono: true,
    description: 'Preview and production deployment workflows for modern web applications.',
    projects: ['Cue', 'Portfolio'],
  },
  {
    id: 'firebase',
    name: 'Firebase',
    group: 'Tools',
    start: new Date(2023, 6, 1),
    icons: [devicon('firebase/firebase-original.svg')],
    description: 'Cloud-backed application features, configuration, data, and web infrastructure.',
    projects: ['Family Tree', 'CPI'],
  },
]

function formatDuration(start) {
  const now = new Date()
  let months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth()
  if (now.getDate() < start.getDate()) months -= 1
  months = Math.max(0, months)

  const years = Math.floor(months / 12)
  const remainder = months % 12
  if (years && remainder) return '~' + years + 'y ' + remainder + 'mo'
  if (years) return '~' + years + 'y'
  return '~' + (remainder || 1) + 'mo'
}

function formatSince(start) {
  return start.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function SkillIcon({ skill, large = false }) {
  return (
    <span className={[large ? 'skill-icon skill-icon--large' : 'skill-icon', skill.icons.length > 1 ? 'skill-icon--multiple' : ''].filter(Boolean).join(' ')} aria-hidden="true">
      {skill.icons.map((icon, index) => (
        <img
          key={icon}
          src={icon}
          alt=""
          loading="lazy"
          className={(skill.mono || (skill.monoLast && index === skill.icons.length - 1)) ? 'is-mono' : ''}
        />
      ))}
    </span>
  )
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
    if (nextGroup === 'All') return

    const current = skills.find((skill) => skill.id === selectedId)
    if (!current || current.group !== nextGroup) {
      setSelectedId(skills.find((skill) => skill.group === nextGroup)?.id || 'python')
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
                <SkillIcon skill={skill} />
                <span className="skill-card__copy">
                  <strong>{skill.name}</strong>
                  <span>{formatDuration(skill.start)}</span>
                </span>
              </button>
            )
          })}
        </div>

        <aside className="skills__detail" aria-live="polite">
          <span className="skills__detail-kicker">{selected.group}</span>
          <div className="skills__detail-title">
            <SkillIcon skill={selected} large />
            <div>
              <h3>{selected.name}</h3>
              <span>{formatDuration(selected.start)} using it</span>
            </div>
          </div>

          <p>{selected.description}</p>

          <dl className="skills__detail-facts">
            <div>
              <dt>Using since</dt>
              <dd>{formatSince(selected.start)}</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>{formatDuration(selected.start)}</dd>
            </div>
          </dl>

          <div className="skills__projects">
            <span>Used in</span>
            <div>
              {selected.projects.map((project) => <b key={project}>{project}</b>)}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
