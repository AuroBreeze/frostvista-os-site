import Reveal from '../components/Reveal'
import { changelog } from '../data/content'

export default function Changelog() {
  return (
    <>
      <PageHeader />
      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container container--narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {changelog.map((c, i) => (
              <Reveal key={c.version} delay={i * 60}>
                <article style={{ background: 'var(--panel)', padding: '2.2rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span className="tag tag--green">{c.version}</span>
                    <span className="tag tag--neutral">shipped</span>
                  </div>
                  <h2 style={{ fontSize: '1.5rem', margin: '1rem 0 0.8rem', lineHeight: '1.05' }}>{c.title}</h2>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1.8rem' }}>
                    FrostVista gains a real in-memory filesystem (tmpfs) and layers it
                    as a path-mirrored upper layer inside the EXT4 backend, so the
                    read-only EXT4 image appears writable while the disk itself is never
                    modified. A reboot drops the upper layer and the EXT4 image is
                    unchanged.
                  </p>

                  <div className="meta-line" style={{ marginBottom: '0.9rem' }}>
                    <span style={{ color: 'var(--green)' }}>▸ HIGHLIGHTS</span>
                  </div>
                  <ul className="plain" style={{ fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1.8rem' }}>
                    {c.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>

                  <div className="meta-line" style={{ marginBottom: '0.9rem' }}>
                    <span style={{ color: 'var(--amber)' }}>▸ ADDITIONAL</span>
                  </div>
                  <ul className="plain" style={{ fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1.8rem' }}>
                    {c.additional.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>

                  <div className="meta-line" style={{ marginBottom: '0.9rem' }}>
                    <span style={{ color: 'var(--red)' }}>▸ VALIDATION</span>
                  </div>
                  <ul className="checklist" style={{ fontSize: '0.83rem', lineHeight: '1.7' }}>
                    {c.validation.map((v) => (
                      <li key={v}>
                        <code className="inline">{v}</code>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function PageHeader() {
  return (
    <section className="section" style={{ paddingTop: '4.5rem', paddingBottom: '1.5rem' }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">changelog / release notes</div>
          <h1 style={{ maxWidth: '16ch' }}>RELEASE NOTES, MILESTONE BY MILESTONE.</h1>
          <p className="lede" style={{ marginTop: '1.3rem' }}>
            What shipped, why it matters, and how it was validated.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
