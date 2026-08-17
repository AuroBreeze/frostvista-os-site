export const CACHE_TTL = 15 * 60 * 1000

export function readCache(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const value = JSON.parse(raw)
    if (!value || !value.data || !value.cachedAt) return null
    return value
  } catch {
    return null
  }
}

export function writeCache(key, data) {
  const value = { data, cachedAt: new Date().toISOString() }
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable or full; memory data still remains usable.
  }
  return value
}
