import { useEffect, useState } from 'react'
import fallback from '../data/roadmapFallback.json'

const ROADMAP_URL =
  'https://raw.githubusercontent.com/AuroBreeze/FrostVistaOS/main/website-data/roadmap.json'

let cache = null
let fetchPromise = null

async function fetchRoadmap() {
  const res = await fetch(ROADMAP_URL, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`GET roadmap.json -> ${res.status}`)
  return res.json()
}

export default function useRoadmap() {
  const [state, setState] = useState({ roadmap: fallback, loading: true, live: false, error: null })

  useEffect(() => {
    let cancelled = false

    if (!fetchPromise) {
      fetchPromise = fetchRoadmap()
        .then((roadmap) => {
          cache = roadmap
          return roadmap
        })
        .catch((error) => {
          fetchPromise = null
          throw error
        })
    }

    async function load() {
      try {
        const roadmap = cache || (await fetchPromise)
        if (!cancelled) setState({ roadmap, loading: false, live: true, error: null })
      } catch (error) {
        if (!cancelled) setState((current) => ({ ...current, loading: false, error: error.message }))
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
