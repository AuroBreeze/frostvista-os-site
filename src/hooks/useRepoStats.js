import { useEffect, useState } from 'react'
import fallback from '../data/stats.json'

const OWNER = 'AuroBreeze'
const REPO = 'FrostVistaOS'
const API = 'https://api.github.com'
const HEADERS = { Accept: 'application/vnd.github+json' }

let cache = null
let fetchPromise = null

function humanSize(bytes) {
  if (bytes == null) return '-'
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let n = bytes / 1024
  let i = 0
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024
    i++
  }
  return `${n.toFixed(n >= 100 ? 0 : 1)} ${units[i]}`
}

function extLabel(path) {
  const m = path.match(/\.([A-Za-z0-9]+)$/)
  return m ? m[1].toLowerCase() : '(none)'
}

const areas = [
  ['arch', 'arch/'],
  ['kernel', 'kernel/'],
  ['include', 'include/'],
  ['user', 'user/'],
  ['test', 'test/'],
  ['mkfs', 'mkfs/'],
  ['scripts', 'scripts/'],
  ['docs', 'docs/'],
  ['devlog', 'devlog/'],
  ['mk', 'mk/'],
]

async function getJson(path) {
  const res = await fetch(`${API}${path}`, { headers: HEADERS })
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`)
  return { json: await res.json(), headers: res.headers }
}

async function fetchLive() {
  const repo = (await getJson(`/repos/${OWNER}/${REPO}`)).json
  const branch = repo.default_branch

  const [commitsRes, commitRes, releasesRes, treeRes] = await Promise.all([
    getJson(`/repos/${OWNER}/${REPO}/commits?per_page=1&sha=${branch}`),
    getJson(`/repos/${OWNER}/${REPO}/commits?per_page=1&sha=${branch}`),
    getJson(`/repos/${OWNER}/${REPO}/releases`).catch(() => ({ json: [], headers: null })),
    getJson(`/repos/${OWNER}/${REPO}/git/trees/${branch}?recursive=1`),
  ])

  const link = commitsRes.headers.get('link') || ''
  const m = link.match(/page=(\d+)>; rel="last"/)
  const totalCommits = m ? Number(m[1]) : 1
  const latestCommit = commitRes.json[0]
  const releases = releasesRes.json
  const latestRelease = releases[0] || null
  const tree = treeRes.json.tree

  const byArea = {}
  const byExt = {}
  let totalFiles = 0
  let totalBytes = 0
  let testFiles = 0
  let userApps = 0
  let kernelFiles = 0
  let archFiles = 0

  for (const e of tree) {
    if (e.type !== 'blob') continue
    const size = e.size || 0
    totalFiles++
    totalBytes += size

    const ext = extLabel(e.path)
    byExt[ext] = byExt[ext] || { count: 0, bytes: 0 }
    byExt[ext].count++
    byExt[ext].bytes += size

    for (const [key, prefix] of areas) {
      if (e.path.startsWith(prefix)) {
        byArea[key] = byArea[key] || { count: 0, bytes: 0 }
        byArea[key].count++
        byArea[key].bytes += size
        break
      }
    }

    if (/^test\/test_.*\.c$/.test(e.path)) testFiles++
    if (/^user\/bin\/.*\.c$/.test(e.path)) userApps++
    if (/^kernel\//.test(e.path)) kernelFiles++
    if (/^arch\//.test(e.path)) archFiles++
  }

  return {
    meta: { fetchedAt: new Date().toISOString(), source: `${API}/repos/${OWNER}/${REPO}` },
    repo: {
      name: repo.full_name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      license: repo.license ? repo.license.spdx_id : null,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      defaultBranch: branch,
    },
    commits: {
      total: totalCommits,
      latest: latestCommit
        ? {
            sha: latestCommit.sha,
            message: (latestCommit.commit.message || '').split('\n')[0],
            date: latestCommit.commit.committer.date,
            author: latestCommit.commit.author.name,
          }
        : null,
    },
    latestRelease: latestRelease
      ? {
          tag: latestRelease.tag_name,
          name: latestRelease.name,
          publishedAt: latestRelease.published_at,
          htmlUrl: latestRelease.html_url,
        }
      : null,
    tree: {
      totalFiles,
      totalBytes,
      humanBytes: humanSize(totalBytes),
      byArea: Object.fromEntries(
        Object.entries(byArea)
          .map(([k, v]) => [k, { ...v, humanBytes: humanSize(v.bytes) }])
          .sort((a, b) => b[1].count - a[1].count),
      ),
      byExt: Object.fromEntries(
        Object.entries(byExt)
          .map(([k, v]) => [k, { ...v, humanBytes: humanSize(v.bytes) }])
          .sort((a, b) => b[1].count - a[1].count),
      ),
    },
    counts: { testFiles, userApps, kernelFiles, archFiles },
  }
}

export default function useRepoStats() {
  const [state, setState] = useState({
    data: fallback,
    loading: true,
    live: false,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (cache) {
        setState({ data: cache, loading: false, live: true, error: null })
        return
      }
      if (!fetchPromise) {
        fetchPromise = fetchLive()
          .then((live) => {
            cache = live
            return live
          })
          .catch((e) => {
            fetchPromise = null
            throw e
          })
      }
      try {
        const live = await fetchPromise
        if (!cancelled) setState({ data: live, loading: false, live: true, error: null })
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
