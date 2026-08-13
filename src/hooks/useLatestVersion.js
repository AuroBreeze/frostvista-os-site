import useReleases from './useReleases'

// Current latest version, resolved live from GitHub releases with a
// bundled fallback so the site never shows a stale or empty value.
export default function useLatestVersion() {
  const { releases, live } = useReleases()
  const latest = releases.length ? releases[releases.length - 1] : null
  return {
    version: latest?.version || null,
    name: latest?.title || latest?.version || null,
    live,
  }
}
