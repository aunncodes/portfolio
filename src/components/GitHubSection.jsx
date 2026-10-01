import { useEffect, useRef } from 'react'
import { assets } from '../data'
import useGitHubStats from '../hooks/useGitHubStats'

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function relativeDate(value) {
  if (!value) return null
  const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.max(1, Math.round(days / 30))
  return `${months} month${months === 1 ? '' : 's'} ago`
}

export default function GitHubSection() {
  const { stats } = useGitHubStats()
  const pointerRef = useRef(null)
  const latest = stats?.latestRepoName
  const lastPush = relativeDate(stats?.latestPush)

  useEffect(() => {
    const element = pointerRef.current
    if (!element || window.matchMedia('(pointer: coarse)').matches) return undefined

    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let active = true

    function updateTarget(event) {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      targetX = clamp((event.clientX - centerX) / Math.max(window.innerWidth * 0.42, rect.width), -1, 1)
      targetY = clamp((event.clientY - centerY) / Math.max(window.innerHeight * 0.48, rect.height), -1, 1)

      const localX = clamp((event.clientX - rect.left) / rect.width, 0, 1)
      const localY = clamp((event.clientY - rect.top) / rect.height, 0, 1)
      element.style.setProperty('--github-glare-x', `${(localX * 100).toFixed(1)}%`)
      element.style.setProperty('--github-glare-y', `${(localY * 100).toFixed(1)}%`)
    }

    function animate() {
      if (!active) return
      currentX += (targetX - currentX) * 0.075
      currentY += (targetY - currentY) * 0.075
      element.style.setProperty('--github-pointer-x', currentX.toFixed(4))
      element.style.setProperty('--github-pointer-y', currentY.toFixed(4))
      frame = window.requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', updateTarget, { passive: true })
    frame = window.requestAnimationFrame(animate)

    return () => {
      active = false
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updateTarget)
    }
  }, [])

  return (
    <section className="github-section" id="githubSection">
      <div className="github-section__copy">
        <h2>GitHub</h2>
        <p>I started programming with Python and still use it most often for backend work, automation, and games.</p>
        <dl className="github-facts">
          <div>
            <dt>Active public repositories this year</dt>
            <dd>{stats?.activeRepos ?? '...'}</dd>
          </div>
          <div>
            <dt>Primary languages across public repositories</dt>
            <dd>{stats?.languageCount ?? '...'}</dd>
          </div>
          <div>
            <dt>Most recent public activity</dt>
            <dd>{latest ? `${latest}${lastPush ? ` · ${lastPush}` : ''}` : '...'}</dd>
          </div>
        </dl>
        <a href="https://github.com/aunncodes" target="_blank" rel="noreferrer" className="button button--primary magnetic">Open profile ↗</a>
      </div>

      <div className="github-card-wrap" id="githubCardWrap">
        <div className="github-card-scroll">
          <div className="github-card-pointer" ref={pointerRef} data-interactive>
            <a className="github-card-link" href="https://github.com/aunncodes" target="_blank" rel="noreferrer" aria-label="Open aunncodes on GitHub">
              <div className="github-card-frame">
                <div className="github-card-glow" aria-hidden="true" />
                <img className="github-card" src={assets.githubProfile} alt="Animated GitHub profile for aunncodes" loading="lazy" draggable="false" />
                <span className="github-card-pointer-glare" aria-hidden="true" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
