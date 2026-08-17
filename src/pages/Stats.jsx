import Reveal from '../components/Reveal'
import useRepoStats from '../hooks/useRepoStats'

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toISOString().slice(0, 10)
}

function fmtTime(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toISOString().slice(0, 16).replace('T', ' ')
}

function shortSha(sha) {
  return sha ? sha.slice(0, 7) : '—'
}

function barWidth(v, max) {
  return `${Math.max(4, Math.round((v / max) * 100))}%`
}

export default function Stats() {
  const { data: stats, loading, live, refreshing, cachedAt, error } = useRepoStats()

  if (loading || !stats) {
    return (
      <>
        <PageHeader />
        <section className="section" style={{ paddingTop: '2rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>
              fetching live telemetry
            </div>
            <h2 style={{ color: 'var(--green)' }}>
              SYNCING<span style={{ color: 'var(--ink)' }}>…</span>
              <span style={{ color: 'var(--green)', animation: 'blink 1.1s steps(2, start) infinite' }}>_</span>
            </h2>
            <p className="lede" style={{ margin: '1.2rem auto 0' }}>
              Pulling repo stats from api.github.com…
            </p>
          </div>
        </section>
      </>
    )
  }

  const areas = Object.entries(stats.tree.byArea)
  const exts = Object.entries(stats.tree.byExt)
  const maxArea = Math.max(...areas.map(([, v]) => v.count))
  const maxExt = Math.max(...exts.map(([, v]) => v.count))

  return (
    <>
      <PageHeader />
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <Reveal direction="down">
            <div className="grid-seam" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
              <Metric k="commits" v={stats.commits.total} accent="green" />
              <Metric k="stars" v={stats.repo.stars} />
              <Metric k="forks" v={stats.repo.forks} />
              <Metric k="open issues" v={stats.repo.openIssues} accent="red" />
              <Metric k="files" v={stats.tree.totalFiles} accent="amber" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <Reveal direction="left">
              <div style={{ border: '1px solid var(--border)', background: 'var(--panel)' }}>
                <div className="code-block__header" style={{ borderRadius: 0 }}>
                  <span className="code-block__dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>repo / status</span>
                  <span className="code-block__status" style={{ color: 'var(--green)' }}>
                     {live ? 'live' : refreshing ? 'refreshing' : 'cached'}
                  </span>
                </div>
                <div style={{ padding: '1.4rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  <Line k="name" v={stats.repo.name} />
                  <Line k="desc" v={stats.repo.description} />
                  <Line k="lang" v={stats.repo.language} />
                  <Line k="license" v={stats.repo.license} />
                  <Line k="branch" v={stats.repo.default_branch} />
                  <Line k="created" v={fmtDate(stats.repo.createdAt)} />
                  <Line k="updated" v={fmtDate(stats.repo.updatedAt)} />
                  <div style={{ marginTop: '0.4rem' }}>
                    <a href={stats.repo.url} target="_blank" rel="noreferrer" className="btn btn--ghost">
                      open repository
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={80}>
              <div style={{ border: '1px solid var(--border)', background: 'var(--panel)' }}>
                <div className="code-block__header" style={{ borderRadius: 0 }}>
                  <span className="code-block__dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>git / HEAD</span>
                  <span className="code-block__status" style={{ color: 'var(--amber)' }}>
                    live
                  </span>
                </div>
                <div style={{ padding: '1.4rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  <Line k="commit" v={shortSha(stats.commits.latest?.sha)} />
                  <Line k="author" v={stats.commits.latest?.author} />
                  <Line k="date" v={fmtDate(stats.commits.latest?.date)} />
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    <span className="k" style={{ marginRight: '0.5rem' }}>
                      msg
                    </span>
                    <span style={{ color: 'var(--ink-soft)' }}>{stats.commits.latest?.message}</span>
                  </div>
                  {stats.latestRelease ? (
                    <div style={{ marginTop: '0.4rem' }}>
                      <div className="meta-line" style={{ marginBottom: '0.6rem' }}>
                        <span style={{ color: 'var(--green)' }}>LAST RELEASE</span>
                        <span className="k">{stats.latestRelease.tag}</span>
                      </div>
                      <a href={stats.latestRelease.htmlUrl} target="_blank" rel="noreferrer" className="anchor" style={{ fontSize: '0.8rem' }}>
                        {stats.latestRelease.name} · {fmtDate(stats.latestRelease.publishedAt)}
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal direction="down">
            <div className="eyebrow">filesystem / tree breakdown</div>
            <h2 style={{ marginBottom: '1.8rem' }}>
              BY <span style={{ color: 'var(--green)' }}>AREA</span>
            </h2>
          </Reveal>
          <div className="grid-seam" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Reveal direction="left">
              <div style={{ padding: '1.5rem 1.6rem' }}>
                {areas.map(([key, v]) => (
                  <Bar key={key} label={key} count={v.count} bytes={v.humanBytes} width={barWidth(v.count, maxArea)} />
                ))}
              </div>
            </Reveal>
            <Reveal direction="right" delay={80}>
              <div style={{ padding: '1.5rem 1.6rem' }}>
                <div className="eyebrow" style={{ fontSize: '0.62rem' }}>
                  file types
                </div>
                {exts.map(([key, v]) => (
                  <Bar key={key} label={key === '(none)' ? 'other' : `.${key}`} count={v.count} bytes={v.humanBytes} width={barWidth(v.count, maxExt)} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container container--narrow">
          <Reveal direction="down">
            <div className="eyebrow">counts / derived</div>
            <h2 style={{ marginBottom: '1.6rem' }}>
              THE <span style={{ color: 'var(--red)' }}>NUMBERS</span>
            </h2>
            <div className="grid-seam" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <Metric k="test programs" v={stats.counts.testFiles} accent="green" />
              <Metric k="user apps" v={stats.counts.userApps} />
              <Metric k="kernel files" v={stats.counts.kernelFiles} />
              <Metric k="arch files" v={stats.counts.archFiles} accent="amber" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="meta-line"
              style={{
                marginTop: '2rem',
                padding: '0.9rem 0',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span className="k">data source</span>
              {live ? (
                <span style={{ color: 'var(--green)' }}>live · {stats.meta.source}</span>
              ) : (
                 <span style={{ color: 'var(--amber)' }}>cached · live fetch failed ({error})</span>
              )}
              <span className="k" style={{ marginLeft: 'auto' }}>
                 cached {fmtTime(cachedAt || stats.meta.fetchedAt)}
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Metric({ k, v, accent = '' }) {
  return (
    <div style={{ padding: '1.3rem 1.2rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--faint)', marginBottom: '0.4rem' }}>
        {k}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          fontWeight: 800,
          lineHeight: 1,
          color: accent === 'green' ? 'var(--green)' : accent === 'red' ? 'var(--red)' : accent === 'amber' ? 'var(--amber)' : 'var(--ink)',
        }}
      >
        {v}
      </div>
    </div>
  )
}

function Line({ k, v }) {
  return (
    <div className="meta-line" style={{ justifyContent: 'flex-start' }}>
      <span className="k" style={{ minWidth: 76, flexShrink: 0 }}>
        {k}
      </span>
      <span style={{ color: 'var(--ink-soft)', fontSize: '0.82rem', overflowWrap: 'anywhere' }}>{v}</span>
    </div>
  )
}

function Bar({ label, count, bytes, width }) {
  return (
    <div style={{ marginBottom: '0.8rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-soft)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}>
          {count} · {bytes}
        </span>
      </div>
      <div style={{ height: 6, background: 'var(--bg-soft)', border: '1px solid var(--border)' }}>
        <div style={{ width, height: '100%', background: 'var(--green)' }} />
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <section className="section" style={{ paddingTop: '4rem', paddingBottom: '1rem' }}>
      <div className="container">
        <Reveal direction="down">
          <div className="eyebrow">telemetry / live dashboard</div>
          <h1 style={{ maxWidth: '16ch' }}>
            SYSTEM <span style={{ color: 'var(--green)' }}>STATUS</span>.
          </h1>
          <p className="lede" style={{ marginTop: '1.2rem' }}>
            Real numbers pulled live from the GitHub repository — commits, file
            counts, and repository health. No placeholders.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
