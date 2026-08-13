import { useState } from 'react'
import Reveal from '../components/Reveal'
import { roadmapCurrent, roadmapPast } from '../data/content'

export default function Roadmap() {
  return (
    <>
      <PageHeader />
      <CurrentMilestone />
      <PastMilestones />
    </>
  )
}

function PageHeader() {
  return (
    <section className="section" style={{ paddingTop: '4rem', paddingBottom: '1.5rem' }}>
      <div className="container">
        <Reveal direction="down">
          <div className="eyebrow">roadmap / milestone v1.4</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: '62ch' }}>
              <h1 style={{ marginBottom: '0.6rem' }}>
                SIGNAL<span style={{ color: 'var(--red)' }}>_</span>
              </h1>
              <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: 'var(--muted)' }}>
                DELIVERY / HANDLERS / CTRL+C
              </h1>
              <p className="lede" style={{ marginTop: '1.2rem' }}>
                v1.4 brings FrostVista its first real signal subsystem — the missing
                half of the process model. Every phase lands with regression coverage
                before the next starts.
              </p>
            </div>
            <div className="eq" style={{ flexShrink: 0 }}>
              <span /><span /><span /><span /><span /><span /><span /><span />
            </div>
          </div>
          <div style={{ marginTop: '1.6rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <kbd>Ctrl</kbd>+<kbd>C</kbd>
            <span className="tag tag--red">SIGINT</span>
            <span className="tag tag--amber">kill(2)</span>
            <span className="tag tag--green">sigreturn</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CurrentMilestone() {
  const r = roadmapCurrent
  const [open, setOpen] = useState(0)
  const done = 0
  const total = r.phases.length

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container container--narrow">
        <Reveal>
          <div style={{ border: '1px solid var(--border)', background: 'var(--panel)', padding: '1.8rem 1.8rem', marginBottom: '1.4rem' }}>
            <div className="meta-line" style={{ marginBottom: '0.8rem' }}>
              <span className="tag tag--red">in progress</span>
              <span className="k" style={{ marginLeft: 'auto' }}>phase {done}/{total} complete</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>{r.title}</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: '1.75', marginBottom: '1rem' }}>
              {r.summary}
            </p>
            <div className="progress-line">
              <span className="k" style={{ fontSize: '0.66rem' }}>PROGRESS</span>
              <div className="progress-line__track">
                <div className="progress-line__fill" style={{ width: `${(done / total) * 100}%` }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--green)' }}>0%</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: '1.7', marginTop: '1rem' }}>
              <strong style={{ color: 'var(--amber)' }}>SCOPE.</strong> {r.scope}
            </p>
          </div>
        </Reveal>

        {r.phases.map((p, i) => (
          <Reveal key={p.name} delay={i * 40}>
            <div className="phase-acc">
              <button
                type="button"
                className="phase-acc__head"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="phase-acc__marker">{open === i ? '−' : '+'}</span>
                <span className="phase-acc__phase">PHASE 0{i + 1}</span>
                <span className="phase-acc__name">{p.name}</span>
              </button>
              <div className={`phase-acc__body ${open === i ? 'open' : ''}`}>
                <div className="phase-acc__inner">
                  <div className="phase-acc__items">
                    <ul className="plain" style={{ fontSize: '0.83rem', lineHeight: '1.7' }}>
                      {p.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={80}>
          <div style={{ border: '1px solid var(--border)', background: 'var(--panel)', padding: '1.4rem 1.6rem', marginTop: '0.4rem' }}>
            <div className="meta-line" style={{ marginBottom: '0.9rem' }}>
              <span style={{ color: 'var(--green)' }}>VALIDATION / GATES</span>
            </div>
            <ul className="checklist" style={{ fontSize: '0.83rem', lineHeight: '1.7' }}>
              {r.validation.map((v) => (
                <li key={v}>
                  <code className="inline">{v}</code>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PastMilestones() {
  const [sel, setSel] = useState(0)
  const m = roadmapPast[sel]

  return (
    <section className="section">
      <div className="container">
        <Reveal direction="down">
          <div className="eyebrow">shipped / released</div>
          <h2>
            MILESTONES THAT <span style={{ color: 'var(--green)' }}>LANDED</span>
          </h2>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            {roadmapPast.length} releases shipped from v0.1 to v1.3. Pick one to inspect.
          </p>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '250px 1fr',
            gap: '2rem',
            alignItems: 'start',
            marginTop: '2.4rem',
          }}
        >
          <Reveal direction="left">
            <nav className="toc" style={{ maxHeight: 'min(70vh, 640px)', overflowY: 'auto' }}>
              <div
                style={{
                  padding: '0.7rem 1rem',
                  borderBottom: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--faint)',
                  position: 'sticky',
                  top: 0,
                  background: 'var(--bg-soft)',
                }}
              >
                RELEASES / INDEX
              </div>
              {roadmapPast.map((r, i) => {
                const isActive = sel === i
                return (
                  <button
                    key={r.version}
                    type="button"
                    onClick={() => setSel(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.6rem',
                      width: '100%',
                      padding: '0.5rem 1rem',
                      background: 'transparent',
                      border: 'none',
                      borderLeft: isActive ? '2px solid var(--green)' : '2px solid transparent',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textAlign: 'left',
                      color: isActive ? 'var(--green)' : 'var(--muted)',
                      cursor: 'pointer',
                      transition: 'color 0.15s, border-color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'var(--panel)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <span style={{ color: isActive ? 'var(--green)' : 'var(--red)', fontSize: '0.62rem' }}>
                      {r.version.replace('v', '')}
                    </span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</span>
                  </button>
                )
              })}
            </nav>
          </Reveal>

          <div key={m.version} className="doc-body" style={{ minWidth: 0 }}>
            <Reveal direction="right">
              <div className="doc-header">
                <div className="doc-header__line">
                  <span style={{ color: 'var(--red)' }}>$</span>{' '}
                  <span style={{ color: 'var(--green)' }}>git checkout {m.version}</span>
                  <span style={{ color: 'var(--muted)' }}>  # release {sel + 1}/{roadmapPast.length}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', margin: '0.4rem 0 0.2rem', flexWrap: 'wrap' }}>
                  <span className="tag tag--green">{m.version}</span>
                  <h2 style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)' }}>{m.title}</h2>
                </div>
                <div className="doc-header__rule" />
              </div>
            </Reveal>

            <Reveal direction="right" delay={60}>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: '1.75', marginBottom: '1.4rem' }}>
                {m.summary}
              </p>
            </Reveal>
            <Reveal direction="right" delay={120}>
              <ul className="checklist" style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
