import { useState } from 'react'
import Reveal from '../components/Reveal'
import useReleases from '../hooks/useReleases'

function fmtDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toISOString().slice(0, 10)
}

function relTime(iso) {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} mo ago`
  return `${Math.floor(months / 12)} yr ago`
}

function inlineMarkdown(text, keyPrefix) {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  const parts = String(text).split(pattern)

  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key} className="inline">{part.slice(1, -1)}</code>
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      return <a key={key} className="anchor" href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>
    }
    return part
  })
}

function MarkdownBody({ source }) {
  const lines = String(source || '').replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let paragraph = []
  let list = []
  let code = []
  let inCode = false

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'p', lines: paragraph })
      paragraph = []
    }
  }
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: 'ul', lines: list })
      list = []
    }
  }

  lines.forEach((line) => {
    if (line.trim().startsWith('```')) {
      if (inCode) {
        blocks.push({ type: 'code', lines: code })
        code = []
      } else {
        flushParagraph()
        flushList()
      }
      inCode = !inCode
      return
    }
    if (inCode) {
      code.push(line)
      return
    }

    const item = line.match(/^\s*[-*+]\s+(.+)$/)
    if (item) {
      flushParagraph()
      list.push(item[1])
      return
    }
    if (!line.trim()) {
      flushParagraph()
      flushList()
      return
    }
    if (/^#{1,3}\s+/.test(line)) {
      flushParagraph()
      flushList()
      const match = line.match(/^(#{1,3})\s+(.+)$/)
      blocks.push({ type: `h${match[1].length}`, lines: [match[2]] })
      return
    }
    flushList()
    paragraph.push(line.trim())
  })

  if (inCode) blocks.push({ type: 'code', lines: code })
  flushParagraph()
  flushList()

  return (
    <div className="release-markdown">
      {blocks.map((block, i) => {
        if (block.type === 'code') {
          return <pre key={i}><code>{block.lines.join('\n')}</code></pre>
        }
        if (block.type === 'ul') {
          return <ul key={i} className="checklist">{block.lines.map((line, j) => <li key={j}>{inlineMarkdown(line, `${i}-${j}`)}</li>)}</ul>
        }
        if (block.type === 'h1' || block.type === 'h2' || block.type === 'h3') {
          const Heading = block.type
          return <Heading key={i}>{inlineMarkdown(block.lines[0], `${i}-heading`)}</Heading>
        }
        return <p key={i}>{inlineMarkdown(block.lines.join(' '), `${i}-paragraph`)}</p>
      })}
    </div>
  )
}

export default function Changelog() {
  const { releases, loading, live, error } = useReleases()
  const [sel, setSel] = useState(() => (releases.length ? releases.length - 1 : 0))

  if (loading) {
    return (
      <>
        <PageHeader />
        <section className="section" style={{ paddingTop: '2rem', textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            fetching releases
          </div>
          <h2 style={{ color: 'var(--green)' }}>
            SYNCING<span style={{ color: 'var(--green)', animation: 'blink 1.1s steps(2, start) infinite' }}>_</span>
          </h2>
          <p className="lede" style={{ margin: '1.2rem auto 0' }}>
            Pulling release history from api.github.com…
          </p>
        </section>
      </>
    )
  }

  const current = releases[sel]

  return (
    <>
      <PageHeader />
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <Reveal direction="down">
            <div className="meta-line" style={{ justifyContent: 'flex-start', gap: '0.8rem' }}>
              <span className="tag tag--green">{releases.length} releases</span>
              <span className="tag tag--neutral">latest {releases[releases.length - 1]?.version}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.72rem', marginLeft: 'auto' }}>
                {live ? 'live · api.github.com' : 'archive · snapshot'}
              </span>
            </div>
          </Reveal>

          {/* horizontal release timeline */}
          <Reveal direction="down" delay={80}>
            <div className="rel-timeline">
              {releases.map((r, i) => {
                const isActive = sel === i
                const isNewest = i === releases.length - 1
                return (
                  <button
                    key={r.version}
                    type="button"
                    className="rel-timeline__node"
                    onClick={() => setSel(i)}
                    aria-pressed={isActive}
                  >
                    <span
                      className="rel-timeline__dot"
                      style={{
                        background: isActive ? 'var(--green)' : isNewest ? 'var(--red)' : 'var(--bg)',
                        borderColor: isActive ? 'var(--green)' : isNewest ? 'var(--red)' : 'var(--border-strong)',
                      }}
                    />
                    <span className="rel-timeline__ver" style={{ color: isActive ? 'var(--green)' : isNewest ? 'var(--red)' : 'var(--muted)' }}>
                      {r.version}
                    </span>
                    {r.publishedAt && (
                      <span className="rel-timeline__date">{fmtDate(r.publishedAt)}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* git show style detail */}
          <div key={current.version} className="doc-body" style={{ marginTop: '2.5rem' }}>
            <Reveal direction="up">
              <div style={{ border: '1px solid var(--border)', background: 'var(--panel)' }}>
                <div className="code-block__header" style={{ borderRadius: 0 }}>
                  <span className="code-block__dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>git show {current.version}</span>
                  <span className="code-block__status" style={{ color: sel === releases.length - 1 ? 'var(--red)' : 'var(--green)' }}>
                    {sel === releases.length - 1 ? 'latest' : 'release'}
                  </span>
                </div>
                <div style={{ padding: '1.4rem 1.8rem' }}>
                  <div className="meta-line" style={{ justifyContent: 'flex-start', gap: '0.8rem', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--amber)' }}>{current.version}</span>
                    {current.publishedAt && (
                      <span className="k">
                        {fmtDate(current.publishedAt)} · {relTime(current.publishedAt)}
                      </span>
                    )}
                    {current.htmlUrl && (
                      <a href={current.htmlUrl} target="_blank" rel="noreferrer" className="anchor" style={{ marginLeft: 'auto' }}>
                        view on github ↗
                      </a>
                    )}
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '0.9rem' }}>{current.title}</h2>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', lineHeight: '1.75', marginBottom: '1.4rem' }}>
                    {current.summary}
                  </p>
                   {current.body ? <MarkdownBody source={current.body} /> : (
                     (current.points || []).length > 0 && (
                       <ul className="checklist" style={{ fontSize: '0.86rem', lineHeight: '1.7' }}>
                         {current.points.map((p, i) => <li key={i}>{p}</li>)}
                       </ul>
                     )
                   )}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div
              className="meta-line"
              style={{ marginTop: '1.6rem', padding: '0.9rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
            >
              <span className="k">data source</span>
              {live ? (
                <span style={{ color: 'var(--green)' }}>live · api.github.com/repos/AuroBreeze/FrostVistaOS/releases</span>
              ) : (
                <span style={{ color: 'var(--amber)' }}>archive · live fetch failed ({error})</span>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function PageHeader() {
  return (
    <section className="section" style={{ paddingTop: '4rem', paddingBottom: '1rem' }}>
      <div className="container">
        <Reveal direction="down">
          <div className="eyebrow">changelog / release history</div>
          <h1 style={{ maxWidth: '16ch' }}>
            RELEASES, <span style={{ color: 'var(--red)' }}>LINE BY LINE</span>.
          </h1>
          <p className="lede" style={{ marginTop: '1.2rem' }}>
            Every shipped release from v0.1 to now — click the timeline to inspect
            each one like a git commit.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
