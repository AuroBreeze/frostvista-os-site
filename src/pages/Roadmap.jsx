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
    <section className="section" style={{ paddingTop: '4.5rem', paddingBottom: '1.5rem' }}>
      <div className="container">
        <Reveal>
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
    <section className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container container--narrow">
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <span className="tag tag--red">in progress</span>
            <h2>{r.title}</h2>
          </div>
          <p className="lede" style={{ marginBottom: '1rem' }}>
            {r.summary}
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.7' }}>
            <strong style={{ color: 'var(--amber)' }}>SCOPE.</strong> {r.scope}
          </p>
        </Reveal>

        <div style={{ marginTop: '2.6rem', display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {r.phases.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <div style={{ background: 'var(--panel)', padding: '1.7rem 1.8rem' }}>
                <div className="meta-line" style={{ marginBottom: '1.1rem' }}>
                  <span style={{ color: 'var(--red)' }}>PHASE / 0{i + 1}</span>
                  <span className="k">{p.name}</span>
                </div>
                <ul className="plain" style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div style={{ marginTop: '2.4rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>VALIDATION GATES</h3>
            <ul className="checklist" style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
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
  return (
    <section className="section">
      <div className="container container--narrow">
        <Reveal>
          <div className="eyebrow">shipped / released</div>
          <h2>MILESTONES THAT <span style={{ color: 'var(--green)' }}>LANDED</span></h2>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', marginTop: '2.4rem' }}>
          {roadmapPast.map((m, i) => (
            <Reveal key={m.version} delay={i * 60}>
              <div style={{ background: 'var(--panel)', padding: '1.8rem 1.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                  <span className="tag tag--green">{m.version}</span>
                  <h3 style={{ fontSize: '1.2rem' }}>{m.title}</h3>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1.1rem' }}>{m.summary}</p>
                <ul className="checklist" style={{ fontSize: '0.83rem', lineHeight: '1.7' }}>
                  {m.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
