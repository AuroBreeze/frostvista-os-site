import { useEffect, useState } from 'react'
import { roadmapPast } from '../data/content'

const OWNER = 'AuroBreeze'
const REPO = 'FrostVistaOS'
const API = 'https://api.github.com'

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
  const [state, setState] = useState({
    releases: [...archive].sort((a, b) => verNum(a.version) - verNum(b.version)),
    loading: true,
    live: false,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (cache) {
        if (!cancelled) setState({ releases: cache, loading: false, live: true, error: null })
        return
      }
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
        if (!cancelled) setState({ releases: r, loading: false, live: true, error: null })
      } catch (e) {
        if (!cancelled) setState((s) => ({ ...s, loading: false, live: false, error: e.message }))
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
