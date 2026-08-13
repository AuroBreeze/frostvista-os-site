import { useState } from 'react'
import Reveal from '../components/Reveal'
import Handshake from '../components/Handshake'
import useRepoStats from '../hooks/useRepoStats'
import { site, acknowledgments } from '../data/content'

const discordHandshake = [
  '<span className="muted">$</span> nc discord.frostvista.dev 6697',
  '<span className="wait">connecting...</span>',
  '<span className="ok">[ OK ] TLS handshake complete</span>',
  '<span className="ok">[ OK ] joined #frostvista-dev</span>',
  '<span className="muted">#dev · kernel design · shell · filesystems</span>',
]

export default function Community() {
  return (
    <>
      <PageHeader />
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <Reveal direction="down">
            <div className="meta-line" style={{ justifyContent: 'flex-start', gap: '1rem', marginBottom: '1.4rem' }}>
              <span className="status-led">online</span>
              <span className="k">#frostvista-dev</span>
              <span className="k">status</span>
              <span style={{ color: 'var(--green)' }}>OPEN</span>
            </div>
          </Reveal>

          <div className="grid-seam" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Reveal direction="left">
              <div className="comm-panel">
                <div className="code-block__header" style={{ borderRadius: 0 }}>
                  <span className="code-block__dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>discord / community</span>
                  <span className="code-block__status" style={{ color: 'var(--green)' }}>
                    live
                  </span>
                </div>
                <div className="comm-panel__body">
                  <h2 style={{ fontSize: '1.4rem' }}>JOIN THE DISCORD</h2>
                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: '1.7' }}>
                    Discuss development, ask questions, and share ideas with people
                    building and experimenting on FrostVista.
                  </p>
                  <Handshake lines={discordHandshake} />
                  <a href={site.discord} target="_blank" rel="noreferrer" className="btn btn--solid" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>
                    join discord server
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={90}>
              <SourcePanel />
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
          <Reveal direction="left">
            <div className="comm-panel scan">
              <div className="code-block__header" style={{ borderRadius: 0 }}>
                <span className="code-block__dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span>cat CREDITS</span>
              </div>
              <div style={{ padding: '1.6rem 1.8rem' }}>
                {acknowledgments.map((a, i) => (
                  <div key={a} style={{ marginBottom: i < acknowledgments.length - 1 ? '1.2rem' : '1.4rem' }}>
                    <div className="meta-line" style={{ marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--red)' }}>[{i + 1}]</span>
                      <span className="k">{i === 0 ? 'lineage' : i === 1 ? 'thanks' : 'reference'}</span>
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: '1.8' }}>
                      {i === 0 ? (
                        <>
                          <strong style={{ color: 'var(--ink)' }}>xv6.</strong> {a.slice(a.indexOf('FrostVista'))}
                        </>
                      ) : (
                        a
                      )}
                    </p>
                  </div>
                ))}
                <div className="meta-line" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>
                  <span className="k">ref</span>
                  <a href="https://pdos.csail.mit.edu/6.828/2023/xv6.html" target="_blank" rel="noreferrer" className="anchor">
                    pdos.csail.mit.edu/6.828/2023/xv6.html
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container container--narrow">
          <Reveal direction="down">
            <div className="eyebrow">legal</div>
            <h2 style={{ marginBottom: '1.4rem' }}>{site.license} LICENSE</h2>
          </Reveal>
          <Reveal direction="left">
            <div className="scan scroll-zone" style={{ border: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
              <div className="code-block__header" style={{ borderRadius: 0, borderTop: 'none', borderRight: 'none', borderLeft: 'none' }}>
                <span className="code-block__dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span>cat LICENSE</span>
              </div>
              <div
                style={{
                  padding: '1.4rem 1.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  lineHeight: '1.8',
                  color: 'var(--ink-soft)',
                  maxHeight: 320,
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
                <p style={{ margin: '1rem 0 0', color: 'var(--faint)' }}>
                  [END OF LICENSE]
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function SourcePanel() {
  const { data: stats } = useRepoStats()
  const [copied, setCopied] = useState(false)

  const cloneCmd = `git clone ${site.repo}.git`

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(cloneCmd)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="comm-panel">
      <div className="code-block__header" style={{ borderRadius: 0 }}>
        <span className="code-block__dots">
          <span />
          <span />
          <span />
        </span>
        <span>github / source</span>
        <span className="code-block__status" style={{ color: 'var(--amber)' }}>
          {stats ? 'linked' : 'fetch'}
        </span>
      </div>
      <div className="comm-panel__body">
        <h2 style={{ fontSize: '1.4rem' }}>BUILD FROM SOURCE</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: '1.7' }}>
          One repository: RISC-V bootstrap, process subsystem, filesystems, tests,
          and the shell all live together.
        </p>
        <div style={{ border: '1px solid var(--border)', background: 'var(--bg-soft)', padding: '0.8rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--ink-soft)', overflowWrap: 'anywhere' }}>
          <span className="hl">$</span> {cloneCmd}
        </div>
        {stats && (
          <div className="meta-line" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
            <span>
              <span className="k">stars</span> <span style={{ color: 'var(--green)' }}>{stats.repo.stars}</span>
            </span>
            <span>
              <span className="k">forks</span> <span style={{ color: 'var(--green)' }}>{stats.repo.forks}</span>
            </span>
            <span>
              <span className="k">issues</span> <span style={{ color: stats.repo.openIssues > 0 ? 'var(--red)' : 'var(--muted)' }}>{stats.repo.openIssues}</span>
            </span>
            <span>
              <span className="k">commits</span> <span style={{ color: 'var(--green)' }}>{stats.commits.total}</span>
            </span>
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: 'auto' }}>
          <button type="button" className="btn btn--solid" onClick={onCopy}>
            {copied ? 'copied_ok' : 'copy git clone'}
          </button>
          <a href={site.repo} target="_blank" rel="noreferrer" className="btn btn--ghost">
            view repository
          </a>
        </div>
      </div>
    </div>
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
