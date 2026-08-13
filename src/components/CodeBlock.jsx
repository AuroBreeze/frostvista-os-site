import { useEffect, useRef, useState } from 'react'

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, '')
}

export default function CodeBlock({ title = 'terminal', lines = [], status = true, copy = false, typewriter = false }) {
  const [visible, setVisible] = useState(typewriter ? 0 : lines.length)
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!typewriter) return
    let timer
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect()
          let i = 0
          timer = setInterval(() => {
            i++
            setVisible(i)
            if (i >= lines.length) clearInterval(timer)
          }, 110)
        }
      },
      { threshold: 0.15 },
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      clearInterval(timer)
    }
  }, [typewriter, lines])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(lines.map(stripHtml).join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="code-block" ref={ref}>
      <div className="code-block__header">
        <span className="code-block__dots">
          <span />
          <span />
          <span />
        </span>
        <span>{title}</span>
        {copy && (
          <button type="button" className="code-block__copy" onClick={onCopy}>
            {copied ? 'copied_ok' : '[copy]'}
          </button>
        )}
        {status && <span className="code-block__status">live</span>}
      </div>
      <pre>
        {lines.slice(0, visible).map((l, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: l }} />
        ))}
        {typewriter && visible < lines.length && <div className="typed-cursor" />}
      </pre>
    </div>
  )
}
