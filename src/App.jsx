import { useCallback, useEffect, useState } from 'react'
import Loader from './components/Loader'
import BackgroundEffects from './components/BackgroundEffects'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import GitHubSection from './components/GitHubSection'
import Experience from './components/Experience'
import Contact from './components/Contact'
import useMagnetic from './hooks/useMagnetic'

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [revealing, setRevealing] = useState(false)
  useMagnetic()

  const beginReveal = useCallback(() => {
    setRevealing(true)
    document.body.classList.remove('is-loading')
  }, [])

  const finishLoading = useCallback(() => {
    setLoading(false)
    document.body.classList.remove('is-loading')
    document.body.classList.add('intro-complete')
  }, [])

  useEffect(() => {
    if (loading) document.body.classList.add('is-loading')
  }, [loading])

  useEffect(() => {
    const revealTargets = [...document.querySelectorAll('.feature-project, .skills, .github-section, .experience, .contact, .project-index')]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })

    revealTargets.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [loading])

  useEffect(() => {
    if (loading) return undefined
    const projectCards = [...document.querySelectorAll('[data-project-card]')]
    const githubScroll = document.querySelector('.github-card-scroll')
    const githubWrap = document.querySelector('.github-card-wrap')
    const sectionHeadings = [...document.querySelectorAll('.section-heading')]
    let frame = 0

    function update() {
      frame = 0
      const viewport = window.innerHeight

      projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1)
        const centered = progress - 0.5
        card.style.setProperty('--media-shift', centered * -38 + 'px')
        card.style.setProperty('--copy-shift', centered * -30 + 'px')
        card.style.setProperty('--visual-shift', centered * 24 + 'px')
        card.style.setProperty('--section-progress', progress.toFixed(3))
        card.style.setProperty('--section-sway', centered * (index % 2 === 0 ? -1.8 : 1.8) + 'deg')
        card.style.setProperty('--project-title-x', 18 + progress * 68 + '%')
      })

      if (githubScroll && githubWrap) {
        const rect = githubWrap.getBoundingClientRect()
        const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1)
        const rotateY = -10 + progress * 20
        const rotateX = 5 - progress * 8
        const lift = (progress - 0.5) * -45
        githubScroll.style.transform = 'translate(-50%, -50%) translateY(' + lift + 'px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)'
      }

      sectionHeadings.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        const progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1)
        heading.style.setProperty('--heading-progress', progress.toFixed(3))
        heading.style.setProperty('--heading-x', 16 + progress * 68 + '%')
      })
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onReveal={beginReveal} onDone={finishLoading} />}
      <BackgroundEffects />
      <Nav />
      <main id="top">
        <Hero active={revealing || !loading} />
        <Projects />
        <Skills />
        <GitHubSection />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
