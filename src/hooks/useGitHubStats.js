import { useEffect, useState } from 'react'

const CACHE_KEY = 'sahil-github-public-stats-v1'
const CACHE_MS = 6 * 60 * 60 * 1000
let memoryCache = null
let pendingRequest = null

function readCache() {
  if (memoryCache) return memoryCache
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw)
    if (Date.now() - cached.savedAt > CACHE_MS) return null
    memoryCache = cached.data
    return memoryCache
  } catch {
    return null
  }
}

function writeCache(data) {
  memoryCache = data
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // The portfolio still works if browser storage is unavailable.
  }
}

async function fetchPublicStats() {
  const headers = { Accept: 'application/vnd.github+json' }
  const [userResponse, reposResponse, prsResponse] = await Promise.all([
    fetch('https://api.github.com/users/aunncodes', { headers }),
    fetch('https://api.github.com/users/aunncodes/repos?per_page=100&sort=pushed', { headers }),
    fetch('https://api.github.com/search/issues?q=author%3Aaunncodes+type%3Apr&per_page=1', { headers }),
  ])

  if (!userResponse.ok || !reposResponse.ok || !prsResponse.ok) {
    throw new Error('GitHub request failed')
  }

  const [user, repos, prs] = await Promise.all([
    userResponse.json(),
    reposResponse.json(),
    prsResponse.json(),
  ])

  const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000
  const activeRepos = repos.filter((repo) => new Date(repo.pushed_at).getTime() >= oneYearAgo)
  const languages = new Set(repos.map((repo) => repo.language).filter(Boolean))
  const latestRepo = repos[0] ?? null

  return {
    repoCount: user.public_repos,
    pullRequests: prs.total_count,
    activeRepos: activeRepos.length,
    languageCount: languages.size,
    latestRepoName: latestRepo?.name ?? null,
    latestPush: latestRepo?.pushed_at ?? null,
  }
}

async function fetchStats() {
  if (pendingRequest) return pendingRequest

  pendingRequest = fetchPublicStats()
    .then((data) => {
      writeCache(data)
      return data
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}

export default function useGitHubStats() {
  const [stats, setStats] = useState(() => readCache())
  const [loading, setLoading] = useState(!stats)

  useEffect(() => {
    let cancelled = false
    if (stats) return undefined

    fetchStats()
      .then((data) => {
        if (!cancelled) setStats(data)
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [stats])

  return { stats, loading }
}
