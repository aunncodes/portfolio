import { useEffect, useRef } from 'react'

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function createRandom(seed = 0x8f31ab2d) {
  let state = seed >>> 0
  return () => {
    state += 0x6d2b79f5
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function wrap(value, max) {
  return ((value % max) + max) % max
}

export default function BackgroundEffects() {
  const canvasRef = useRef(null)
  const lightRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const progressRef = useRef(null)
  const railRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const random = createRandom()
    let frame = 0
    let tick = 0
    let pointerX = window.innerWidth * 0.5
    let pointerY = window.innerHeight * 0.45
    let ringX = pointerX
    let ringY = pointerY
    let lastScroll = window.scrollY
    let scrollVelocity = 0

    const clusters = Array.from({ length: 9 }, () => ({
      x: random(),
      y: random(),
      radiusX: 0.07 + random() * 0.11,
      radiusY: 0.05 + random() * 0.12,
    }))

    const stars = Array.from({ length: 340 }, (_, index) => {
      const clustered = random() < 0.72
      let x = random()
      let y = random()

      if (clustered) {
        const cluster = clusters[Math.floor(random() * clusters.length)]
        const angle = random() * Math.PI * 2
        const distance = Math.pow(random(), 1.8)
        x = wrap(cluster.x + Math.cos(angle) * distance * cluster.radiusX, 1)
        y = wrap(cluster.y + Math.sin(angle) * distance * cluster.radiusY, 1)
      }

      return {
        x,
        y,
        depth: 0.16 + random() * 0.84,
        size: 0.35 + Math.pow(random(), 2.2) * 2.25,
        phase: random() * Math.PI * 2,
        drift: (random() - 0.5) * 0.7,
        cool: random() > 0.1,
        twinkleSpeed: 1.5 + random() * 2.8,
        seed: index + random(),
      }
    })

    const nodes = Array.from({ length: 44 }, () => ({
      seed: random() * Math.PI * 12,
      x: random(),
      y: random(),
      depth: 0.28 + random() * 0.62,
    }))

    const meteors = [
      { phase: 1.1, period: 11.8, duration: 0.72, y: 0.18, length: 115 },
      { phase: 6.7, period: 16.4, duration: 0.82, y: 0.42, length: 88 },
      { phase: 10.2, period: 21.6, duration: 0.74, y: 0.7, length: 138 },
      { phase: 3.4, period: 14.7, duration: 0.66, y: 0.31, length: 102 },
    ]

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function pointerMove(event) {
      pointerX = event.clientX
      pointerY = event.clientY
      const nx = event.clientX / window.innerWidth - 0.5
      const ny = event.clientY / window.innerHeight - 0.5
      document.documentElement.style.setProperty('--cursor-x', `${((nx + 0.5) * 100).toFixed(2)}%`)
      document.documentElement.style.setProperty('--cursor-y', `${((ny + 0.5) * 100).toFixed(2)}%`)
      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${nx * 150}px, ${ny * 120}px, 0)`
      }
      if (!coarsePointer) {
        dotRef.current.style.opacity = '1'
        ringRef.current.style.opacity = '1'
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    function pointerOver(event) {
      if (coarsePointer) return
      const active = event.target.closest('a, button, [data-interactive]')
      ringRef.current.classList.toggle('is-active', Boolean(active))
    }

    function updateProgress() {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const value = clamp(window.scrollY / maxScroll, 0, 1)
      if (progressRef.current) progressRef.current.style.transform = `scaleY(${value})`
      if (railRef.current) railRef.current.style.setProperty('--scroll-position', value.toFixed(4))
      const delta = window.scrollY - lastScroll
      scrollVelocity = clamp(scrollVelocity * 0.42 + delta * 0.58, -48, 48)
      lastScroll = window.scrollY
      document.documentElement.style.setProperty('--page-scroll', value.toFixed(4))
      if (gridRef.current) gridRef.current.style.setProperty('--grid-scroll', `${value * 58}px`)
    }

    function drawMeteor(meteor, time) {
      if (reduceMotion) return
      const local = (time + meteor.phase) % meteor.period
      if (local > meteor.duration) return
      const progress = local / meteor.duration
      const eased = 1 - (1 - progress) ** 2
      const x = -meteor.length + eased * (window.innerWidth + meteor.length * 2)
      const y = window.innerHeight * meteor.y + eased * 120
      const alpha = Math.sin(progress * Math.PI) * 0.46
      const gradient = context.createLinearGradient(x - meteor.length, y - meteor.length * 0.24, x, y)
      gradient.addColorStop(0, 'rgba(120, 195, 255, 0)')
      gradient.addColorStop(0.7, `rgba(124, 202, 255, ${alpha * 0.45})`)
      gradient.addColorStop(1, `rgba(220, 245, 255, ${alpha})`)
      context.strokeStyle = gradient
      context.lineWidth = 1.2
      context.beginPath()
      context.moveTo(x - meteor.length, y - meteor.length * 0.24)
      context.lineTo(x, y)
      context.stroke()
      context.beginPath()
      context.arc(x, y, 1.7, 0, Math.PI * 2)
      context.fillStyle = `rgba(231, 249, 255, ${alpha})`
      context.fill()
    }

    function draw(timeMs = 0) {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (!reduceMotion) tick += 0.0045
      const scroll = window.scrollY
      const time = timeMs / 1000
      scrollVelocity *= 0.91

      stars.forEach((star) => {
        const x = wrap(
          star.x * window.innerWidth + Math.sin(tick * 0.38 + star.phase) * (3 + star.depth * 5) + star.drift * tick * 24,
          window.innerWidth,
        )
        let y = star.y * (window.innerHeight + 120) + (scroll * (0.006 + star.depth * 0.018)) % (window.innerHeight + 120) - 60
        y = wrap(y + 60, window.innerHeight + 120) - 60

        const dxPointer = x - pointerX
        const dyPointer = y - pointerY
        const pointerDistance = Math.hypot(dxPointer, dyPointer)
        const pointerGlow = Math.max(0, 1 - pointerDistance / 260)
        const twinkleWave = Math.sin(tick * star.twinkleSpeed + star.phase)
        const twinkle = 0.16 + (twinkleWave * 0.5 + 0.5) * 0.5 + pointerGlow * 0.26
        const color = star.cool ? [174, 224, 255] : [213, 228, 255]

        if (Math.abs(scrollVelocity) > 4 && !reduceMotion) {
          const streak = clamp(Math.abs(scrollVelocity) * star.depth * 0.4, 1, 14)
          context.beginPath()
          context.moveTo(x, y - Math.sign(scrollVelocity) * streak)
          context.lineTo(x, y)
          context.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${twinkle * 0.16})`
          context.lineWidth = Math.max(0.35, star.size * 0.48)
          context.stroke()
        }

        context.beginPath()
        context.arc(x, y, star.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${twinkle})`
        context.fill()

        if (star.size > 1.55) {
          const halo = 4 + star.size * 4
          const glow = context.createRadialGradient(x, y, 0, x, y, halo)
          glow.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${twinkle * 0.16})`)
          glow.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`)
          context.fillStyle = glow
          context.beginPath()
          context.arc(x, y, halo, 0, Math.PI * 2)
          context.fill()
        }
      })

      meteors.forEach((meteor) => drawMeteor(meteor, time))

      const projected = nodes.map((node) => {
        const driftX = Math.sin(tick * 0.76 + node.seed) * 34 * node.depth
        const driftY = Math.cos(tick * 0.64 + node.seed * 0.7) * 26 * node.depth
        const parallax = (scroll * (0.012 + node.depth * 0.026)) % (window.innerHeight + 180)
        let x = node.x * window.innerWidth + driftX
        let y = node.y * (window.innerHeight + 180) + driftY + parallax - 90
        y = wrap(y + 90, window.innerHeight + 180) - 90

        const dx = x - pointerX
        const dy = y - pointerY
        const distance = Math.hypot(dx, dy)
        if (distance < 165 && distance > 1) {
          const push = (1 - distance / 165) * 20
          x += (dx / distance) * push
          y += (dy / distance) * push
        }
        return { x, y, depth: node.depth }
      })

      context.lineWidth = 0.6
      for (let i = 0; i < projected.length; i += 1) {
        for (let j = i + 1; j < projected.length; j += 1) {
          const a = projected[i]
          const b = projected[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance > 120) continue
          const alpha = (1 - distance / 120) * 0.035 * Math.min(a.depth, b.depth)
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.strokeStyle = `rgba(105, 176, 255, ${alpha})`
          context.stroke()
        }
      }

      projected.forEach((node) => {
        context.beginPath()
        context.arc(node.x, node.y, 0.45 + node.depth * 0.95, 0, Math.PI * 2)
        context.fillStyle = `rgba(136, 197, 255, ${0.05 + node.depth * 0.1})`
        context.fill()
      })

      const waveY = window.innerHeight * 0.79 + Math.sin(tick * 0.72) * 24
      for (let line = 0; line < 3; line += 1) {
        context.beginPath()
        for (let x = -40; x <= window.innerWidth + 40; x += 20) {
          const y = waveY + Math.sin(x * 0.006 + tick + line * 1.6) * (36 + line * 14) + line * 28
          if (x === -40) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.strokeStyle = `rgba(72, 145, 255, ${0.026 - line * 0.006})`
        context.lineWidth = 1
        context.stroke()
      }

      if (!coarsePointer) {
        ringX += (pointerX - ringX) * 0.16
        ringY += (pointerY - ringY) * 0.16
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      }
      frame = window.requestAnimationFrame(draw)
    }

    resize()
    updateProgress()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('pointermove', pointerMove, { passive: true })
    window.addEventListener('pointerover', pointerOver, { passive: true })
    frame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('pointermove', pointerMove)
      window.removeEventListener('pointerover', pointerOver)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />
      <div ref={lightRef} className="ambient-light" aria-hidden="true" />
      <div ref={gridRef} className="grid-plane" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={railRef} className="scroll-progress" aria-hidden="true"><i ref={progressRef} /></div>
    </>
  )
}
