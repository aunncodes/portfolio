import { useEffect } from 'react'

export default function useMagnetic() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const elements = [...document.querySelectorAll('.magnetic')]
    const cleanups = elements.map((element) => {
      function move(event) {
        const rect = element.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2
        element.style.transform = `translate3d(${x * 0.09}px, ${y * 0.09}px, 0)`
      }

      function reset() {
        element.style.transform = ''
      }

      element.addEventListener('pointermove', move)
      element.addEventListener('pointerleave', reset)
      return () => {
        element.removeEventListener('pointermove', move)
        element.removeEventListener('pointerleave', reset)
      }
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])
}
