import { useEffect, useRef, useState } from 'react'
import { assets } from '../data'

const preload = [
  assets.cue,
  assets.homebase,
  assets.sentinelOne,
  assets.sentinelTwo,
  assets.sentinelHacks,
  assets.duckBackground,
  assets.duckThrone,
]

export default function Loader({ onReveal, onDone }) {
  const canvasRef = useRef(null)
  const [loaded, setLoaded] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    let finished = 0

    const mark = () => {
      finished += 1
      if (!cancelled) setLoaded(Math.min(finished, preload.length))
    }

    preload.forEach((src) => {
      const image = new Image()
      image.onload = mark
      image.onerror = mark
      image.src = src
    })

    const watchdog = window.setTimeout(() => {
      if (!cancelled) setLoaded(preload.length)
    }, 3600)

    return () => {
      cancelled = true
      window.clearTimeout(watchdog)
    }
  }, [])

  useEffect(() => {
    if (loaded < preload.length) return undefined
    const leaveTimer = window.setTimeout(() => {
      setLeaving(true)
      onReveal?.()
    }, 220)
    const doneTimer = window.setTimeout(onDone, 1500)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(doneTimer)
    }
  }, [loaded, onReveal, onDone])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let tick = 0
    const particles = Array.from({ length: 72 }, (_, index) => ({
      angle: (index / 72) * Math.PI * 2,
      radius: 70 + ((index * 47) % 350),
      speed: 0.12 + ((index * 19) % 100) / 620,
      size: 0.7 + ((index * 13) % 20) / 10,
      phase: index * 0.53,
    }))

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (!reduceMotion) tick += 0.008
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2

      context.save()
      context.translate(cx, cy)
      for (let ring = 0; ring < 5; ring += 1) {
        context.beginPath()
        context.ellipse(0, 0, 115 + ring * 72, 32 + ring * 18, tick * (0.22 + ring * 0.035) + ring, 0, Math.PI * 2)
        context.strokeStyle = `rgba(120, 205, 255, ${0.16 - ring * 0.022})`
        context.lineWidth = ring === 0 ? 1.25 : 0.7
        context.stroke()
      }
      context.restore()

      particles.forEach((particle, index) => {
        const angle = particle.angle + tick * particle.speed
        const wobble = Math.sin(tick * 2 + particle.phase) * 18
        const x = cx + Math.cos(angle) * (particle.radius + wobble)
        const y = cy + Math.sin(angle) * (particle.radius * 0.32 + wobble * 0.2)
        const pulse = 0.25 + Math.max(0, Math.sin(tick * 3 + index)) * 0.55
        context.beginPath()
        context.arc(x, y, particle.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(170, 224, 255, ${pulse})`
        context.fill()
      })

      frame = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = window.requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const percent = Math.round((loaded / preload.length) * 100)

  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <canvas className="loader__canvas" ref={canvasRef} />
      <div className="loader__media loader__media--one"><img src={assets.cue} alt="" /></div>
      <div className="loader__media loader__media--two"><img src={assets.homebase} alt="" /></div>
      <div className="loader__center">
        <div className="loader__mark-shell">
          <span className="loader__orbit loader__orbit--a" />
          <span className="loader__orbit loader__orbit--b" />
          <img className="loader__mark" src={assets.favicon} alt="" />
        </div>
        <div className="loader__status">
          <span>{percent >= 100 ? 'Entering portfolio' : 'Loading project media'}</span>
          <b>{String(percent).padStart(2, '0')}</b>
        </div>
        <div className="loader__bar"><i style={{ transform: `scaleX(${percent / 100})` }} /></div>
      </div>
      <div className="loader__project loader__project--a">Cue</div>
      <div className="loader__project loader__project--b">Homebase</div>
      <div className="loader__project loader__project--c">Town of Salem</div>
      <div className="loader__project loader__project--d">Galactic Domination</div>
      <div className="loader__iris" aria-hidden="true" />
    </div>
  )
}
