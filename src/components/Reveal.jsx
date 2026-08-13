import { useEffect, useRef, useState } from 'react'

const variants = {
  up: { from: 'translateY(16px)' },
  down: { from: 'translateY(-16px)' },
  left: { from: 'translateX(-20px)' },
  right: { from: 'translateX(20px)' },
  zoom: { from: 'scale(0.96)' },
  none: { from: 'none' },
}

export default function Reveal({ children, as: Tag = 'div', delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const variant = variants[direction] || variants.up

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${direction} ${visible ? 'is-visible' : ''} ${className}`}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
        ['--reveal-from']: variant.from,
      }}
    >
      {children}
    </Tag>
  )
}
