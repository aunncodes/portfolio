import { useRef } from 'react'

export default function TiltCard({ children, className = '', strength = 7 }) {
  const ref = useRef(null)

  function handleMove(event) {
    const element = ref.current
    if (!element || window.matchMedia('(pointer: coarse)').matches) return
    const rect = element.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * strength
    const ry = (px - 0.5) * strength
    element.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`)
    element.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`)
    element.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`)
    element.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`)
  }

  function reset() {
    const element = ref.current
    if (!element) return
    element.style.setProperty('--tilt-rx', '0deg')
    element.style.setProperty('--tilt-ry', '0deg')
    element.style.setProperty('--glare-x', '50%')
    element.style.setProperty('--glare-y', '50%')
  }

  return (
    <div ref={ref} className={`tilt-card ${className}`} data-interactive onPointerMove={handleMove} onPointerLeave={reset}>
      {children}
    </div>
  )
}
