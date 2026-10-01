import { useEffect, useRef } from 'react'
import { experiences } from '../data'
import CpiLogo from './CpiLogo'

export default function Experience() {
  const stageRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0, scroll: 0 })

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    const current = { x: 0, y: 0, scroll: 0 }

    function updateScrollTarget() {
      const rect = stage.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      targetRef.current.scroll = Math.max(-1, Math.min(1, (viewportCenter - center) / window.innerHeight))
    }

    function tick() {
      const ease = reduceMotion ? 1 : 0.085
      current.x += (targetRef.current.x - current.x) * ease
      current.y += (targetRef.current.y - current.y) * ease
      current.scroll += (targetRef.current.scroll - current.scroll) * (reduceMotion ? 1 : 0.06)
      stage.style.setProperty('--exp-x', current.x.toFixed(4))
      stage.style.setProperty('--exp-y', current.y.toFixed(4))
      stage.style.setProperty('--exp-scroll', current.scroll.toFixed(4))
      frame = window.requestAnimationFrame(tick)
    }

    updateScrollTarget()
    window.addEventListener('scroll', updateScrollTarget, { passive: true })
    window.addEventListener('resize', updateScrollTarget)
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', updateScrollTarget)
      window.removeEventListener('resize', updateScrollTarget)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  function handleMove(event) {
    const stage = stageRef.current
    if (!stage || window.matchMedia('(pointer: coarse)').matches) return
    const rect = stage.getBoundingClientRect()
    targetRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    targetRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
  }

  function reset() {
    targetRef.current.x = 0
    targetRef.current.y = 0
  }

  return (
    <section className="experience" id="experience">
      <div className="section-heading"><h2>Experience</h2></div>
      <div className="experience-layout">
        <div className="experience-orbit" ref={stageRef} onPointerMove={handleMove} onPointerLeave={reset}>
          <svg className="experience-orbit__lines" viewBox="0 0 600 500" aria-hidden="true">
            <path className="experience-link-line experience-link-line--one" d="M155 125 C 255 64, 385 72, 466 154" />
            <path className="experience-link-line experience-link-line--two" d="M466 154 C 480 270, 392 386, 240 401" />
            <path className="experience-link-line experience-link-line--three" d="M240 401 C 114 350, 80 221, 155 125" />
            <circle cx="155" cy="125" r="3" />
            <circle cx="466" cy="154" r="3" />
            <circle cx="240" cy="401" r="3" />
          </svg>

          <a className="experience-logo experience-logo--devrev" href={experiences[0].href} target="_blank" rel="noreferrer" aria-label="DevRev">
            <span className="experience-logo__float">
              <span className="experience-logo__surface"><img src={experiences[0].logo} alt="DevRev" /></span>
            </span>
          </a>

          <a className="experience-logo experience-logo--asdrp" href={experiences[1].href} target="_blank" rel="noreferrer" aria-label="ASDRP">
            <span className="experience-logo__float">
              <span className="experience-logo__surface"><img src={experiences[1].logo} alt="ASDRP" /></span>
            </span>
          </a>

          <a className="experience-logo experience-logo--cpi" href={experiences[2].href} target="_blank" rel="noreferrer" aria-label="Competitive Programming Initiative">
            <span className="experience-logo__float">
              <span className="experience-logo__surface"><CpiLogo /></span>
            </span>
          </a>
        </div>

        <div className="experience-list experience-list--refined">
          {experiences.map((experience) => (
            <article className="experience-item" key={experience.id}>
              <time>{experience.dates}</time>
              <div>
                <h3>{experience.role}</h3>
                <p>{experience.company}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
