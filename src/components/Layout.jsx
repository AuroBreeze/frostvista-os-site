import { NavLink, Link } from 'react-router-dom'
import { site } from '../data/content'

const links = [
  { to: '/', label: 'home' },
  { to: '/docs', label: 'docs' },
  { to: '/roadmap', label: 'roadmap' },
  { to: '/changelog', label: 'changelog' },
  { to: '/community', label: 'community' },
]

export function Nav() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10, 11, 12, 0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58 }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontFamily: 'var(--font-mono)' }}>
          <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" fill="#0A0B0C" stroke="#26292B" strokeWidth="4" />
            <path d="M22 48V16h21" fill="none" stroke="#D7D7D5" strokeWidth="7" strokeLinecap="square" />
            <path d="M22 30h15" fill="none" stroke="#FF4438" strokeWidth="7" strokeLinecap="square" />
            <circle cx="51" cy="51" r="5" fill="#4AF626" />
          </svg>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            frostvista<span style={{ color: 'var(--red)' }}>_</span>os
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.5rem 0.8rem',
                color: isActive ? 'var(--bg)' : 'var(--muted)',
                background: isActive ? 'var(--green)' : 'transparent',
                border: isActive ? '1px solid var(--green)' : '1px solid transparent',
                transition: 'color 0.15s, background 0.15s',
              })}
            >
              {({ isActive }) => (isActive ? `[${l.label}]` : l.label)}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
      <div style={{ height: 6 }} className="hazard" />
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          <div style={{ background: 'var(--bg)', padding: '1.6rem 1.6rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '0.8rem' }}>
              frostvista<span style={{ color: 'var(--red)' }}>_</span>os
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: '1.7', maxWidth: '30ch' }}>
              A compact RISC-V 64 (Sv39) kernel. Small system, real boundaries.
            </p>
          </div>
          <FooterCol title="Pages" items={[
            { label: 'docs', to: '/docs' },
            { label: 'roadmap', to: '/roadmap' },
            { label: 'changelog', to: '/changelog' },
            { label: 'community', to: '/community' },
          ]} />
          <FooterCol title="Run" items={[
            { label: 'build guide', to: '/docs' },
            { label: 'shell demo', to: '/docs#shell' },
            { label: 'test runner', to: '/docs#tests' },
          ]} />
          <div style={{ background: 'var(--bg)', padding: '1.6rem 1.6rem' }}>
            <div className="eyebrow" style={{ marginBottom: '1rem' }}>Community</div>
            <ul className="plain" style={{ fontSize: '0.8rem' }}>
              <li>
                <a href={site.discord} target="_blank" rel="noreferrer" className="anchor">
                  discord_server
                </a>
              </li>
              <li>
                <a href={site.repo} target="_blank" rel="noreferrer" className="anchor">
                  github_repo
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="meta-line"
          style={{ marginTop: '2rem', paddingTop: '1.2rem', borderTop: '1px solid var(--border)', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: '0.5rem' }}
        >
          <span>
            <span className="k">arch</span> riscv64 / <span className="k">paging</span> sv39 /{' '}
            <span className="k">ver</span> {site.version}
          </span>
          <span>
            <span className="k">license</span> MIT / <span className="k">status</span>{' '}
            <span style={{ color: 'var(--green)' }}>RUNNING</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }) {
  return (
    <div style={{ background: 'var(--bg)', padding: '1.6rem 1.6rem' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--faint)',
          marginBottom: '1rem',
        }}
      >
        {title}
      </div>
      <ul className="plain" style={{ fontSize: '0.8rem' }}>
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} className="anchor">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
