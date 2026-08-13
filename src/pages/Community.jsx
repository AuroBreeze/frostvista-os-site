import Reveal from '../components/Reveal'
import { site, acknowledgments } from '../data/content'

export default function Community() {
  return (
    <>
      <PageHeader />
      <section className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="grid-seam" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Reveal direction="left">
              <div className="scan" style={{ padding: '2.2rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
            <Reveal direction="right" delay={90}>
              <div className="scan" style={{ padding: '2.2rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', animationDelay: '0.8s' }}>
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
          <Reveal direction="down">
            <div className="eyebrow">credits</div>
            <h2 style={{ marginBottom: '1.4rem' }}>ACKNOWLEDGMENTS</h2>
          </Reveal>
          <div className="scan" style={{ border: '1px solid var(--border)', background: 'var(--panel)' }}>
            <div className="hazard" />
            <Reveal direction="left" delay={60}>
              <div style={{ padding: '2.2rem' }}>
                {acknowledgments.map((a, i) => (
                  <p key={a} style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: '1.8', marginBottom: '1.1rem' }}>
                    {i === 0 ? (
                      <>
                        <strong style={{ color: 'var(--ink)' }}>xv6.</strong> {a.slice(a.indexOf('FrostVista'))}
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
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container container--narrow">
          <Reveal direction="down">
            <div className="eyebrow">legal</div>
            <h2 style={{ marginBottom: '1.4rem' }}>{site.license} LICENSE</h2>
          </Reveal>
          <div className="scan scroll-zone" style={{ border: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
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
              <p>GNU GENERAL PUBLIC LICENSE</p>
              <p>Version 3, 29 June 2007</p>
              <p style={{ margin: '0.8rem 0' }}>
                Copyright (C) 2007 Free Software Foundation, Inc. &lt;https://fsf.org/&gt;
              </p>
              <p>
                Everyone is permitted to copy and distribute verbatim copies of this
                license document, but changing it is not allowed.
              </p>
              <p style={{ margin: '0.8rem 0' }}>
                <strong style={{ color: 'var(--ink)' }}>Preamble</strong>
              </p>
              <p>
                The GNU General Public License is a free, copyleft license for software
                and other kinds of works. The licenses for most software and other
                practical works are designed to take away your freedom to share and
                change the works. By contrast, the GNU General Public License is
                intended to guarantee your freedom to share and change all versions of a
                program — to make sure it remains free software for all its users.
              </p>
              <p style={{ margin: '0.8rem 0' }}>
                When we speak of free software, we are referring to freedom, not price.
                Our General Public Licenses are designed to make sure that you have the
                freedom to distribute copies of free software (and charge for them if
                you wish), that you receive source code or can get it if you want it,
                that you can change the software or use pieces of it in new free
                programs, and that you know you can do these things.
              </p>
              <p style={{ margin: '0.8rem 0' }}>
                The precise terms and conditions for copying, distribution and
                modification follow. See the full license text at
                &lt;https://www.gnu.org/licenses/gpl-3.0.html&gt;.
              </p>
            </div>
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
          <div className="eyebrow">community / credits</div>
          <h1 style={{ maxWidth: '16ch' }}>
            BUILDERS. ASKERS. <span style={{ color: 'var(--red)' }}>ROOTS.</span>
          </h1>
          <p className="lede" style={{ marginTop: '1.3rem' }}>
            A place to follow the kernel&apos;s development — and the credits for the
            work it stands on.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
