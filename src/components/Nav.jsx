import { useEffect, useRef } from 'react'
import { assets } from '../data'

export default function Nav() {
  const ref = useRef(null)

  useEffect(() => {
    let previous = window.scrollY
    function update() {
      const current = window.scrollY
      const nav = ref.current
      if (!nav) return
      nav.classList.toggle('is-scrolled', current > 30)
      nav.classList.toggle('is-hidden', current > previous && current > 180)
      previous = current
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className="nav" ref={ref}>
      <a href="#top" className="nav__brand magnetic" aria-label="Sahil Chopra home">
        <img src={assets.favicon} alt="" />
        <span>Sahil Chopra</span>
      </a>
      <nav className="nav__links" aria-label="Primary navigation">
        <a href="#projects" className="magnetic">Projects</a>
        <a href="#experience" className="magnetic">Experience</a>
        <a href="https://github.com/aunncodes" target="_blank" rel="noreferrer" className="magnetic">GitHub ↗</a>
      </nav>
    </header>
  )
}
