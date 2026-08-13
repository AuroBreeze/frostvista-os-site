export default function SectionHead({ num, eyebrow, children, red = false }) {
  return (
    <div className="sec-head">
      <div className={`sec-head__num ${red ? 'red' : ''}`}>{num}</div>
      <div className="sec-head__body">
        <div className="eyebrow">{eyebrow}</div>
        <h2>{children}</h2>
      </div>
    </div>
  )
}
