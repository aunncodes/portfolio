export const assets = {
  favicon: '/assets/favicon.ico',
  cue: '/assets/cue.png',
  homebase: '/assets/homebase.png',
  sentinelOne: '/assets/sentinel-competition-1.jpg',
  sentinelTwo: '/assets/sentinel-competition-2.jpg',
  sentinelHacks: '/assets/sentinel-hacks.png',
  githubProfile: '/assets/github-profile.svg',
  duckBackground: '/assets/galactic-background.png',
  duckThrone: '/assets/galactic-throne.png',
  duckJester: '/assets/galactic-jester.png',
  duckGeneral: '/assets/galactic-general.png',
  devrevLogo: 'https://images.seeklogo.com/logo-png/57/1/devrev-logo-png_seeklogo-578961.png',
  asdrpLogo: 'https://static.wixstatic.com/media/a9c49e_4d3b972880314723b8686b0401d1fd81~mv2.jpg/v1/fill/w_1280%2Ch_960%2Cal_c/a9c49e_4d3b972880314723b8686b0401d1fd81~mv2.jpg',
}

export const experiences = [
  {
    id: 'devrev',
    role: 'Intern',
    company: 'DevRev',
    dates: 'Jul 2026 · Present',
    logo: assets.devrevLogo,
    href: 'https://devrev.ai/',
  },
  {
    id: 'asdrp',
    role: 'Researcher',
    company: 'Aspiring Scholars Directed Research Program',
    dates: 'Apr 2026 · Present',
    logo: assets.asdrpLogo,
    href: 'https://www.asdrp.org/',
  },
  {
    id: 'cpi',
    role: 'Web Developer',
    company: 'Competitive Programming Initiative',
    dates: 'Feb 2026 · Present',
    href: 'https://cpinitiative.org/',
  },
]

export const compactProjects = [
  {
    name: 'Town of Salem',
    description: 'Web recreation with a FastAPI backend and a game engine built from scratch.',
    tech: 'Python / React',
    href: 'https://github.com/aunncodes/TownOfSalem',
  },
  {
    name: 'Arithma',
    description: 'Math-focused programming language with its own lexer, parser, and interpreter.',
    tech: 'Python',
    href: 'https://github.com/aunncodes/arithma',
  },
  {
    name: 'Factory Builder',
    description: 'Minecraft datapack built around an incremental factory game.',
    tech: 'mcfunction',
    href: 'https://github.com/devilExE3/FactoryBuilder',
  },
]
