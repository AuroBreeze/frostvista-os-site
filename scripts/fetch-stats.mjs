// Fetches live stats from the FrostVistaOS GitHub repo and writes src/data/stats.json.
// Usage: node scripts/fetch-stats.mjs  (optionally GITHUB_TOKEN env to raise rate limit)
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OWNER = 'AuroBreeze'
const REPO = 'FrostVistaOS'
const API = 'https://api.github.com'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const headers = {
  'User-Agent': 'FrostVistaOS-site',
  Accept: 'application/vnd.github+json',
}
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

async function get(path) {
  const res = await fetch(`${API}${path}`, { headers })
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status} ${res.statusText}`)
  return res
}

async function getJson(path) {
  const res = await get(path)
  return res.json()
}

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

// total commit count from the Link header (last page of per_page=1)
async function countCommits(branch) {
  const res = await get(`/repos/${OWNER}/${REPO}/commits?per_page=1&sha=${branch}`)
  const link = res.headers.get('link') || ''
  const m = link.match(/page=(\d+)>; rel="last"/)
  return m ? Number(m[1]) : 1
}

async function main() {
  const repo = await getJson(`/repos/${OWNER}/${REPO}`)
  const branch = repo.default_branch

  const [commits, latestCommit, releases, tree] = await Promise.all([
    countCommits(branch),
    getJson(`/repos/${OWNER}/${REPO}/commits?per_page=1&sha=${branch}`).then((c) => c[0]),
    getJson(`/repos/${OWNER}/${REPO}/releases`).catch(() => []),
    getJson(`/repos/${OWNER}/${REPO}/git/trees/${branch}?recursive=1`),
  ])

  const latestRelease = releases[0] || null

  const byArea = {}
  const byExt = {}
  let totalFiles = 0
  let totalBytes = 0
  let testFiles = 0
  let userApps = 0
  let kernelFiles = 0
  let archFiles = 0

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

  const extLabel = (path) => {
    const m = path.match(/\.([A-Za-z0-9]+)$/)
    return m ? m[1].toLowerCase() : '(none)'
  }

  for (const e of tree.tree) {
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

  const stats = {
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
    commits: { total: commits, latest: latestCommit ? {
      sha: latestCommit.sha,
      message: (latestCommit.commit.message || '').split('\n')[0],
      date: latestCommit.commit.committer.date,
      author: latestCommit.commit.author.name,
    } : null },
    latestRelease: latestRelease ? {
      tag: latestRelease.tag_name,
      name: latestRelease.name,
      publishedAt: latestRelease.published_at,
      htmlUrl: latestRelease.html_url,
    } : null,
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

  const out = join(ROOT, 'src', 'data', 'stats.json')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, JSON.stringify(stats, null, 2) + '\n')
  console.log(`wrote ${out}`)
  console.log(`commits=${stats.commits.total} stars=${stats.repo.stars} files=${stats.tree.totalFiles} size=${stats.tree.humanBytes}`)
}

main().catch((e) => {
  console.error('fetch-stats failed:', e.message)
  process.exit(1)
})
