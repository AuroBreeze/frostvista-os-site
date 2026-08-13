import { useEffect } from 'react'

export function ScrollToTop() {
  const { pathname } = window.location
  const href = window.location.hash
  useEffect(() => {
    if (href) return
    window.scrollTo({ top: 0 })
  }, [pathname, href])
  return null
}

export function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center', padding: '9rem 0' }}>
      <div className="container container--narrow">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em', color: 'var(--red)', marginBottom: '1.2rem' }}>
          [ ERR ] 404
        </div>
        <h1>PAGE NOT FOUND.</h1>
        <p className="lede" style={{ margin: '1.2rem auto 2rem' }}>
          This address does not map to a valid kernel path.
        </p>
        <a href="/" className="btn btn--solid">
          return home
        </a>
      </div>
    </section>
  )
}
