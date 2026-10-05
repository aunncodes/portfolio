import { useEffect, useRef, useState } from 'react'
import useGitHubStats from '../hooks/useGitHubStats'

function easeOutQuart(value) {
  return 1 - (1 - value) ** 4
}

function Stat({ value, label, active }) {
  const ref = useRef(null)
  const [displayValue, setDisplayValue] = useState(value == null ? null : 0)

  useEffect(() => {
    if (!active || value == null || !ref.current) {
      if (value == null) setDisplayValue(null)
      return undefined
    }

    const element = ref.current
    let frame = 0
    let started = false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const run = () => {
      if (reduceMotion) {
        setDisplayValue(value)
        return
      }

      const start = performance.now()
      const duration = 1120 + Math.min(700, Number(value) * 5)

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration)
        setDisplayValue(Math.round(Number(value) * easeOutQuart(progress)))
        if (progress < 1) frame = window.requestAnimationFrame(tick)
      }

      frame = window.requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver((entries) => {
      if (!started && entries.some((entry) => entry.isIntersecting)) {
        started = true
        observer.disconnect()
        run()
      }
    }, { threshold: 0.35 })

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [active, value])

  return (
    <div className="stat" ref={ref}>
      <strong>{displayValue == null ? '...' : Number(displayValue).toLocaleString()}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function Hero({ active = true }) {
  const yearsCoding = new Date().getFullYear() - 2016
  const heroRef = useRef(null)
  const stageRef = useRef(null)
  const cardRef = useRef(null)
  const copyRef = useRef(null)
  const { stats } = useGitHubStats()

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let targetX = 34
    let targetY = 42
    let currentX = targetX
    let currentY = targetY

    function tick() {
      const ease = reduceMotion ? 1 : 0.1
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease
      hero.style.setProperty('--title-x', `${currentX.toFixed(2)}%`)
      hero.style.setProperty('--title-y', `${currentY.toFixed(2)}%`)
      hero.style.setProperty('--title-x-2', `${(100 - currentX * 0.62).toFixed(2)}%`)
      hero.style.setProperty('--title-y-2', `${Math.max(18, Math.min(82, currentY + 8)).toFixed(2)}%`)
      frame = window.requestAnimationFrame(tick)
    }

    function move(event) {
      const rect = hero.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / Math.min(rect.height, window.innerHeight)) * 100
      targetX = Math.max(5, Math.min(95, x))
      targetY = Math.max(12, Math.min(88, y))
    }

    function leave() {
      targetX = 34
      targetY = 42
    }

    hero.addEventListener('pointermove', move, { passive: true })
    hero.addEventListener('pointerleave', leave)
    frame = window.requestAnimationFrame(tick)

    return () => {
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', leave)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    const card = cardRef.current
    const copy = copyRef.current
    if (!stage || !card) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let pointerX = 0
    let pointerY = 0
    let frame = 0

    function update() {
      frame = 0
      const rect = stage.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.82 - rect.top) / (window.innerHeight * 1.2)))
      const lift = reduceMotion ? 0 : progress * -62
      const rotateX = reduceMotion ? 0 : pointerY * -5 + progress * 3
      const rotateY = reduceMotion ? 0 : pointerX * 7 - progress * 5
      const rotateZ = reduceMotion ? 0 : progress * -1.6
      card.style.transform = `translate3d(0, ${lift}px, ${progress * 70}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      stage.style.setProperty('--portrait-progress', progress.toFixed(3))
      if (copy && !reduceMotion) {
        copy.style.transform = `translate3d(0, ${progress * -28}px, 0)`
        copy.style.opacity = String(1 - progress * 0.12)
      }
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    function move(event) {
      const rect = stage.getBoundingClientRect()
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      schedule()
    }

    function leave() {
      pointerX = 0
      pointerY = 0
      schedule()
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    stage.addEventListener('pointermove', move, { passive: true })
    stage.addEventListener('pointerleave', leave)
    update()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerleave', leave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__copy" ref={copyRef}>
        <h1><span>Sahil</span><span>Chopra</span></h1>
        <p className="hero__summary">Developer building productivity tools, web apps, Chrome extensions, game systems, and security projects.</p>
        <p className="hero__languages" aria-label="Primary languages">Python <i>/</i> TypeScript <i>/</i> Java</p>
        <div className="hero__actions">
          <a href="#projects" className="button button--primary magnetic">View projects</a>
          <a href="mailto:choprasahil.sc@gmail.com" className="button button--ghost magnetic">Email me</a>
        </div>
      </div>

      <div className="portrait-stage" ref={stageRef}>
        <div className="portrait-backdrop portrait-backdrop--a" aria-hidden="true" />
        <div className="portrait-backdrop portrait-backdrop--b" aria-hidden="true" />
        <div className="portrait-card" ref={cardRef}>
          <img src="/portrait.webp" alt="Sahil Chopra" />
          <div className="portrait-card__shine" aria-hidden="true" />
        </div>
      </div>

      <div className="hero__roles">
        <span>DevRev intern</span>
        <span>ASDRP researcher</span>
        <span>Competitive Programming Initiative web developer</span>
      </div>

      <div className="hero__stats" id="stats">
        <Stat active={active} value={yearsCoding} label="years coding" />
        <Stat active={active} value={stats?.repoCount} label="public repositories" />
        <Stat active={active} value={stats?.pullRequests} label="public pull requests" />
        <Stat active={active} value={stats?.activeRepos} label="public repos active this year" />
      </div>
    </section>
  )
}
