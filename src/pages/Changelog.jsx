import Reveal from '../components/Reveal'
import { changelog } from '../data/content'

const hash = 'frost-1.3.0'

export default function Changelog() {
  return (
    <>
      <PageHeader />
      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container container--narrow">
          <div className="gitlog">
            {changelog.map((c, i) => (
              <div key={c.version} className={`gitlog-item ${i === 0 ? 'gitlog-item--new' : ''}`}>
                <Reveal direction="right" delay={i * 60}>
                  <div style={{ border: '1px solid var(--border)', background: 'var(--panel)', padding: '2rem 1.8rem' }}>
                    <div
                      className="meta-line"
                      style={{ marginBottom: '0.9rem', justifyContent: 'flex-start', gap: '0.8rem' }}
                    >
                      <span className={`commit-hash ${i === 0 ? '' : ''}`}>{i === 0 ? 'HEAD -> main' : hash}</span>
                      <span className="tag tag--green">{c.version}</span>
                      {i === 0 && <span className="tag tag--amber">latest</span>}
                    </div>
                    <h2 style={{ fontSize: '1.5rem', margin: '0.6rem 0 0.8rem', lineHeight: '1.05' }}>
                      {c.title}
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1.6rem' }}>
                      FrostVista gains a real in-memory filesystem (tmpfs) and layers it
                      as a path-mirrored upper layer inside the EXT4 backend, so the
                      read-only EXT4 image appears writable while the disk itself is never
                      modified. A reboot drops the upper layer and the EXT4 image is
                      unchanged.
                    </p>

                    <div className="meta-line" style={{ marginBottom: '0.8rem' }}>
                      <span style={{ color: 'var(--green)' }}>+ HIGHLIGHTS</span>
                    </div>
                    <ul className="plain" style={{ fontSize: '0.84rem', lineHeight: '1.7', marginBottom: '1.6rem' }}>
                      {c.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>

                    <div className="meta-line" style={{ marginBottom: '0.8rem' }}>
                      <span style={{ color: 'var(--amber)' }}>+ ADDITIONAL</span>
                    </div>
                    <ul className="plain" style={{ fontSize: '0.84rem', lineHeight: '1.7', marginBottom: '1.6rem' }}>
                      {c.additional.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>

                    <div className="meta-line" style={{ marginBottom: '0.8rem' }}>
                      <span style={{ color: 'var(--red)' }}>+ VALIDATION</span>
                    </div>
                    <ul className="checklist" style={{ fontSize: '0.82rem', lineHeight: '1.7' }}>
                      {c.validation.map((v) => (
                        <li key={v}>
                          <code className="inline">{v}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function PageHeader() {
  return (
    <section className="section" style={{ paddingTop: '4rem', paddingBottom: '1.5rem' }}>
      <div className="container">
        <Reveal direction="down">
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
