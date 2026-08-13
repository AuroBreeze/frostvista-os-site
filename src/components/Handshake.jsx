import { useEffect, useState } from 'react'

export default function Handshake({ lines, interval = 420 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      i++
      setCount(i)
      if (i >= lines.length) clearInterval(t)
    }, interval)
    return () => clearInterval(t)
  }, [lines, interval])

  return (
    <div className="handshake">
      {lines.slice(0, count).map((l, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: l }} />
      ))}
      {count < lines.length && (
        <span style={{ color: 'var(--green)', animation: 'blink 1s steps(2, start) infinite' }}>▋</span>
      )}
    </div>
  )
}
