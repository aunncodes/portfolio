import { useEffect, useRef } from 'react'
import TiltCard from './TiltCard'

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function pointWithin(element, panel) {
  const rect = element.getBoundingClientRect()
  const panelRect = panel.getBoundingClientRect()
  return {
    x: rect.left - panelRect.left + rect.width * 0.08,
    y: rect.top - panelRect.top + rect.height / 2,
  }
}

export default function Contact() {
  const panelRef = useRef(null)
  const canvasRef = useRef(null)
  const emailRef = useRef(null)
  const githubRef = useRef(null)

  useEffect(() => {
    const panel = panelRef.current
    const canvas = canvasRef.current
    const email = emailRef.current
    const github = githubRef.current
    if (!panel || !canvas || !email || !github) return undefined

    const context = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const particles = []
    let width = 0
    let height = 0
    let dpr = 1
    let frame = 0
    let lastTime = performance.now()
    let spawnAccumulator = 0

    function resize() {
      const rect = panel.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function spawnParticle() {
      if (reduceMotion || particles.length > 20) return
      const start = {
        x: 30 + Math.random() * Math.max(1, width - 60),
        y: 28 + Math.random() * Math.max(1, height - 56),
      }
      const emailPoint = pointWithin(email, panel)
      const githubPoint = pointWithin(github, panel)
      const emailDistance = Math.hypot(start.x - emailPoint.x, start.y - emailPoint.y)
      const githubDistance = Math.hypot(start.x - githubPoint.x, start.y - githubPoint.y)
      const target = emailDistance <= githubDistance ? emailPoint : githubPoint
      const duration = 1250 + Math.random() * 1300

      particles.push({
        start,
        target,
        startedAt: performance.now(),
        duration,
        radius: 1.7 + Math.random() * 2.1,
        drift: (Math.random() - 0.5) * 22,
      })
    }

    function draw(now) {
      const delta = Math.min(50, now - lastTime)
      lastTime = now
      spawnAccumulator += delta
      if (spawnAccumulator > 520 + Math.random() * 360) {
        spawnAccumulator = 0
        spawnParticle()
      }

      context.clearRect(0, 0, width, height)

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]
        const progress = clamp((now - particle.startedAt) / particle.duration, 0, 1)
        const eased = 1 - (1 - progress) ** 3
        const arc = Math.sin(progress * Math.PI) * particle.drift
        const x = particle.start.x + (particle.target.x - particle.start.x) * eased
        const y = particle.start.y + (particle.target.y - particle.start.y) * eased + arc
        const previousProgress = Math.max(0, progress - 0.055)
        const previousEased = 1 - (1 - previousProgress) ** 3
        const previousArc = Math.sin(previousProgress * Math.PI) * particle.drift
        const px = particle.start.x + (particle.target.x - particle.start.x) * previousEased
        const py = particle.start.y + (particle.target.y - particle.start.y) * previousEased + previousArc
        const fade = Math.sin(progress * Math.PI)

        const gradient = context.createLinearGradient(px, py, x, y)
        gradient.addColorStop(0, 'rgba(111, 196, 255, 0)')
        gradient.addColorStop(1, `rgba(159, 224, 255, ${0.42 * fade})`)
        context.strokeStyle = gradient
        context.lineWidth = 1
        context.beginPath()
        context.moveTo(px, py)
        context.lineTo(x, y)
        context.stroke()

        context.fillStyle = `rgba(184, 235, 255, ${0.78 * fade})`
        context.shadowBlur = 12
        context.shadowColor = 'rgba(87, 175, 255, 0.72)'
        context.beginPath()
        context.arc(x, y, particle.radius * (0.76 + fade * 0.24), 0, Math.PI * 2)
        context.fill()
        context.shadowBlur = 0

        if (progress >= 1) particles.splice(index, 1)
      }

      frame = window.requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(panel)
    resize()
    for (let i = 0; i < 7; i += 1) spawnParticle()
    frame = window.requestAnimationFrame(draw)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="contact" id="contact">
      <TiltCard className="contact__panel contact__panel--particles" strength={3}>
        <div className="contact__measure" ref={panelRef} aria-hidden="true" />
        <canvas className="contact__particle-canvas" ref={canvasRef} aria-hidden="true" />

        <div className="contact__copy">
          <h2>Contact</h2>
          <p>Email is the easiest way to reach me. Discord is <strong>aunn.exe</strong>.</p>
        </div>

        <div className="contact__links">
          <a ref={emailRef} href="mailto:choprasahil.sc@gmail.com" className="magnetic">choprasahil.sc@gmail.com ↗</a>
          <a ref={githubRef} href="https://github.com/aunncodes" target="_blank" rel="noreferrer" className="magnetic">github.com/aunncodes ↗</a>
        </div>
      </TiltCard>
    </section>
  )
}
