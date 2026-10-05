import { useMemo, useState } from 'react'

const groups = ['All', 'Languages', 'Frameworks', 'Tools']
const devicon = (path) => 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/' + path

const skills = [
  {
    id: 'python',
    name: 'Python',
    group: 'Languages',
    start: new Date(2016, 0, 1),
    icons: [devicon('python/python-original.svg')],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    group: 'Languages',
    start: new Date(2017, 0, 1),
    icons: [devicon('javascript/javascript-original.svg')],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    group: 'Languages',
    start: new Date(2023, 9, 1),
    icons: [devicon('typescript/typescript-original.svg')],
  },
  {
    id: 'java',
    name: 'Java',
    group: 'Languages',
    start: new Date(2021, 0, 1),
    icons: [devicon('java/java-original.svg')],
  },
  {
    id: 'csharp',
    name: 'C#',
    group: 'Languages',
    start: new Date(2022, 8, 1),
    icons: [devicon('csharp/csharp-original.svg')],
  },
  {
    id: 'cplusplus',
    name: 'C++',
    group: 'Languages',
    start: new Date(2023, 0, 1),
    icons: [devicon('cplusplus/cplusplus-original.svg')],
  },
  {
    id: 'html-css',
    name: 'HTML & CSS',
    group: 'Languages',
    start: new Date(2017, 0, 1),
    icons: [devicon('html5/html5-original.svg'), devicon('css3/css3-original.svg')],
  },
  {
    id: 'react',
    name: 'React',
    group: 'Frameworks',
    start: new Date(2025, 3, 1),
    icons: [devicon('react/react-original.svg')],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    group: 'Frameworks',
    start: new Date(2026, 1, 1),
    icons: [devicon('nextjs/nextjs-original.svg')],
    mono: true,
  },
  {
    id: 'unity',
    name: 'Unity',
    group: 'Frameworks',
    start: new Date(2022, 0, 1),
    icons: [devicon('unity/unity-original.svg')],
    mono: true,
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    group: 'Frameworks',
    start: new Date(2025, 11, 1),
    icons: [devicon('fastapi/fastapi-original.svg')],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    group: 'Frameworks',
    start: new Date(2026, 1, 1),
    icons: [devicon('tailwindcss/tailwindcss-original.svg')],
  },
  {
    id: 'node',
    name: 'Node.js',
    group: 'Tools',
    start: new Date(2022, 0, 1),
    icons: [devicon('nodejs/nodejs-original.svg')],
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    group: 'Tools',
    start: new Date(2020, 3, 29),
    icons: [devicon('git/git-original.svg'), devicon('github/github-original.svg')],
    monoLast: true,
  },
  {
    id: 'vite',
    name: 'Vite',
    group: 'Tools',
    start: new Date(2025, 10, 1),
    icons: [devicon('vitejs/vitejs-original.svg')],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    group: 'Tools',
    start: new Date(2025, 9, 1),
    icons: [devicon('vercel/vercel-original.svg')],
    mono: true,
  },
  {
    id: 'firebase',
    name: 'Firebase',
    group: 'Tools',
    start: new Date(2023, 6, 1),
    icons: [devicon('firebase/firebase-original.svg')],
  },
]

function formatDuration(start) {
  const now = new Date()
  let months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth()
  if (now.getDate() < start.getDate()) months -= 1
  months = Math.max(0, months)

  const years = Math.floor(months / 12)
  const remainder = months % 12
  if (years && remainder) return years + 'y ' + remainder + 'mo'
  if (years) return years + 'y'
  return (remainder || 1) + 'mo'
}

function SkillIcon({ skill }) {
  return (
    <span className={'skill-icon' + (skill.icons.length > 1 ? ' skill-icon--multiple' : '')} aria-hidden="true">
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

  const visibleSkills = useMemo(
    () => (group === 'All' ? skills : skills.filter((skill) => skill.group === group)),
    [group],
  )

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
            onClick={() => setGroup(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="skills__grid">
        {visibleSkills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <SkillIcon skill={skill} />
            <span className="skill-card__copy">
              <strong>{skill.name}</strong>
              <span>{formatDuration(skill.start)}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
