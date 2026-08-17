import { useEffect, useState } from 'react'
import { roadmapPast } from '../data/content'
import { CACHE_TTL, readCache, writeCache } from '../lib/persistentCache'

const OWNER = 'AuroBreeze'
const REPO = 'FrostVistaOS'
const API = 'https://api.github.com'
const CACHE_KEY = 'frostvista:releases:v1'

let cache = null
let fetchPromise = null

// bundled archive: v0.1 .. v1.3, distilled from releases.md
const archive = roadmapPast

function verNum(v = '') {
  const m = String(v).match(/(\d+)\.(\d+)/)
  return m ? Number(m[1]) * 1000 + Number(m[2]) : 0
}

function parseBody(body = '') {
  return body
    .split('\n')
    .map((l) => l.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 12)
}

function mergeLive(liveReleases) {
  const byTag = {}
  liveReleases.forEach((r) => {
    byTag[r.tag_name] = {
      version: r.tag_name,
      title: r.name || r.tag_name,
      summary: (r.body || '').split('\n')[0] || 'See the release on GitHub.',
      body: r.body || '',
      points: parseBody(r.body),
      publishedAt: r.published_at,
      htmlUrl: r.html_url,
    }
  })

  const merged = []
  const seen = new Set()
  for (const lr of liveReleases) {
    merged.push(byTag[lr.tag_name])
    seen.add(lr.tag_name)
  }
  for (const a of archive) {
    if (seen.has(a.version)) continue
    merged.push({
      ...a,
      publishedAt: byTag[a.version]?.publishedAt || null,
      htmlUrl: byTag[a.version]?.htmlUrl || null,
    })
    seen.add(a.version)
  }
  // oldest first, newest last
  return merged.sort((a, b) => verNum(a.version) - verNum(b.version))
}

async function fetchLive() {
  const res = await fetch(`${API}/repos/${OWNER}/${REPO}/releases`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!res.ok) throw new Error(`GET /releases -> ${res.status}`)
  const releases = await res.json()
  return mergeLive(releases)
}

export default function useReleases() {
  const stored = readCache(CACHE_KEY)
  const [state, setState] = useState({
    releases: stored?.data || [...archive].sort((a, b) => verNum(a.version) - verNum(b.version)),
    loading: false,
    live: Boolean(stored),
    cachedAt: stored?.cachedAt || null,
    refreshing: false,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      const persistent = readCache(CACHE_KEY)
      if (persistent && Date.now() - new Date(persistent.cachedAt).getTime() < CACHE_TTL) {
        if (!cancelled) setState((current) => ({ ...current, releases: persistent.data, live: true, cachedAt: persistent.cachedAt }))
        return
      }
      if (cache) {
        if (!cancelled) setState((current) => ({ ...current, releases: cache, live: true, refreshing: true }))
      }
      if (!cancelled) setState((current) => ({ ...current, refreshing: true }))
      if (!fetchPromise) {
        fetchPromise = fetchLive()
          .then((r) => {
            cache = r
            return r
          })
          .catch((e) => {
            fetchPromise = null
            throw e
          })
      }
      try {
        const r = await fetchPromise
        const saved = writeCache(CACHE_KEY, r)
        if (!cancelled) setState({ releases: r, loading: false, live: true, cachedAt: saved.cachedAt, refreshing: false, error: null })
      } catch (e) {
        if (!cancelled) setState((s) => ({ ...s, loading: false, live: false, refreshing: false, error: e.message }))
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
