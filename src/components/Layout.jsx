import { NavLink, Link } from 'react-router-dom'
import { site } from '../data/content'
import useLatestVersion from '../hooks/useLatestVersion'

const links = [
  { to: '/', label: 'home' },
  { to: '/docs', label: 'docs' },
  { to: '/stats', label: 'stats' },
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
  const { version } = useLatestVersion()
  const ver = version || site.version
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
      <div style={{ height: 6 }} className="hazard" />
      <div className="container" style={{ paddingTop: '0.9rem', paddingBottom: '0.9rem' }}>
        <div
          className="meta-line"
          style={{ justifyContent: 'space-between', flexWrap: 'wrap', columnGap: '1.4rem', rowGap: '0.4rem' }}
        >
          <span>
            <span style={{ color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.01em' }}>
              frostvista<span style={{ color: 'var(--red)' }}>_</span>os
            </span>
            <span style={{ color: 'var(--muted)' }}> / compact riscv64 (sv39) kernel</span>
          </span>
          <span>
            <span className="k">arch</span> riscv64 / <span className="k">paging</span> sv39 /{' '}
            <span className="k">ver</span> {ver}
          </span>
          <span>
            <span className="k">license</span> GPL-3.0 / <span className="k">status</span>{' '}
            <span style={{ color: 'var(--green)' }}>RUNNING</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
