export default function CodeBlock({ title = 'terminal', lines = [], status = true }) {
  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__dots">
          <span />
          <span />
          <span />
        </span>
        <span>{title}</span>
        {status && <span className="code-block__status">live</span>}
      </div>
      <pre>
        {lines.map((l, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: l }} />
        ))}
      </pre>
    </div>
  )
}
