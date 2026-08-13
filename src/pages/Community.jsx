import Reveal from '../components/Reveal'
import { site, acknowledgments } from '../data/content'

export default function Community() {
  return (
    <>
      <PageHeader />
      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="grid-seam" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Reveal>
              <div style={{ padding: '2.2rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="tag tag--green">community</span>
                <h2 style={{ margin: '1.4rem 0 0.9rem' }}>JOIN THE DISCORD</h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '1.6rem' }}>
                  Discuss development, ask questions, and share ideas with people
                  building and experimenting on FrostVista.
                </p>
                <a href={site.discord} target="_blank" rel="noreferrer" className="btn btn--solid">
                  join discord server
                </a>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div style={{ padding: '2.2rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="tag tag--neutral">source</span>
                <h2 style={{ margin: '1.4rem 0 0.9rem' }}>BUILD FROM SOURCE</h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '1.6rem' }}>
                  The kernel is a single repository: RISC-V bootstrap, process
                  subsystem, filesystems, tests, and the shell all live together.
                </p>
                <a href={site.repo} target="_blank" rel="noreferrer" className="btn btn--ghost">
                  view repository
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <div className="eyebrow">credits</div>
            <h2 style={{ marginBottom: '1.4rem' }}>ACKNOWLEDGMENTS</h2>
            <div style={{ border: '1px solid var(--border)', background: 'var(--panel)' }}>
              <div className="hazard" />
              <div style={{ padding: '2.2rem' }}>
                {acknowledgments.map((a, i) => (
                  <p key={a} style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: '1.8', marginBottom: '1.1rem' }}>
                    {i === 0 ? (
                      <>
                        <strong style={{ color: 'var(--ink)' }}>xv6.</strong>{' '}
                        {a.slice(a.indexOf('FrostVista'))}
                      </>
                    ) : (
                      a
                    )}
                  </p>
                ))}
                <div className="meta-line">
                  <span className="k">ref</span>
                  <span>pdos.csail.mit.edu/6.828/2023/xv6.html</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container container--narrow">
          <Reveal>
            <div className="eyebrow">legal</div>
            <h2 style={{ marginBottom: '1.4rem' }}>{site.license} LICENSE</h2>
            <div style={{ border: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
              <div
                style={{
                  padding: '1.4rem 1.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  lineHeight: '1.8',
                  color: 'var(--ink-soft)',
                  maxHeight: 340,
                  overflowY: 'auto',
                }}
              >
                <p>MIT License</p>
                <p style={{ margin: '0.8rem 0' }}>Copyright (c) FrostVista OS</p>
                <p>
                  Permission is hereby granted, free of charge, to any person obtaining a
                  copy of this software and associated documentation files (the
                  &quot;Software&quot;), to deal in the Software without restriction,
                  including without limitation the rights to use, copy, modify, merge,
                  publish, distribute, sublicense, and/or sell copies of the Software, and
                  to permit persons to whom the Software is furnished to do so, subject to
                  the following conditions:
                </p>
                <p style={{ margin: '0.8rem 0' }}>
                  The above copyright notice and this permission notice shall be included
                  in all copies or substantial portions of the Software.
                </p>
                <p>
                  THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
                  KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                  NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                  USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
              </div>
            </div>
          </Reveal>
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
          <div className="eyebrow">community / credits</div>
          <h1 style={{ maxWidth: '16ch' }}>BUILDERS. ASKERS. <span style={{ color: 'var(--red)' }}>ROOTS.</span></h1>
          <p className="lede" style={{ marginTop: '1.3rem' }}>
            A place to follow the kernel&apos;s development — and the credits for the
            work it stands on.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
