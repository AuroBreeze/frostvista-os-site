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
          <div className="eyebrow">roadmap / milestones</div>
          <h1 style={{ maxWidth: '14ch' }}>WHERE THE KERNEL IS GOING.</h1>
          <p className="lede" style={{ marginTop: '1.3rem' }}>
            Milestones are built in phases, and every phase lands with regression
            coverage before the next one starts.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function CurrentMilestone() {
  const r = roadmapCurrent
  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="container container--narrow">
        <Reveal>
          <div className="timeline">
            <div className="timeline-item timeline-item--wip">
              <div style={{ border: '1px solid var(--border)', background: 'var(--panel)', padding: '1.8rem 1.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span className="tag tag--red">in progress</span>
                  <h2 style={{ fontSize: '1.4rem' }}>{r.title}</h2>
                </div>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: '1.75', marginBottom: '1rem' }}>
                  {r.summary}
                </p>
                <p style={{ color: 'var(--muted)', fontSize: '0.83rem', lineHeight: '1.7' }}>
                  <strong style={{ color: 'var(--amber)' }}>SCOPE.</strong> {r.scope}
                </p>
              </div>
            </div>

            {r.phases.map((p, i) => (
              <div key={p.name} className="timeline-item">
                <Reveal direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 50}>
                  <div style={{ border: '1px solid var(--border)', background: 'var(--bg-soft)', padding: '1.4rem 1.6rem' }}>
                    <div className="meta-line" style={{ marginBottom: '0.9rem' }}>
                      <span style={{ color: 'var(--red)' }}>PHASE / 0{i + 1}</span>
                      <span className="k">{p.name}</span>
                    </div>
                    <ul className="plain" style={{ fontSize: '0.83rem', lineHeight: '1.7' }}>
                      {p.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            ))}

            <div className="timeline-item">
              <Reveal direction="left">
                <div style={{ border: '1px solid var(--border)', background: 'var(--panel)', padding: '1.4rem 1.6rem' }}>
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
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PastMilestones() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <Reveal direction="down">
          <div className="eyebrow">shipped / released</div>
          <h2>
            MILESTONES THAT <span style={{ color: 'var(--green)' }}>LANDED</span>
          </h2>
        </Reveal>
        <div className="timeline" style={{ marginTop: '2.2rem' }}>
          {roadmapPast.map((m, i) => (
            <div key={m.version} className="timeline-item">
              <Reveal direction={i % 2 === 0 ? 'right' : 'left'} delay={i * 60}>
                <div style={{ border: '1px solid var(--border)', background: 'var(--bg-soft)', padding: '1.6rem 1.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                    <span className="tag tag--green">{m.version}</span>
                    <h3 style={{ fontSize: '1.2rem' }}>{m.title}</h3>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1.1rem' }}>
                    {m.summary}
                  </p>
                  <ul className="checklist" style={{ fontSize: '0.82rem', lineHeight: '1.7' }}>
                    {m.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
