const items = [
  'RISC-V 64',
  'Sv39 paging',
  '420 commits',
  'Easy-FS',
  'EXT4 overlay',
  'tmpfs',
  'COW fork',
  'slab + kmalloc',
  'VirtIO blk',
  'fvsh shell',
  'GPL-3.0',
  'qemu-virt',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="ticker">
      <div className="ticker__track">
        {doubled.map((t, i) => (
          <span className="ticker__item" key={i}>
            <span>
              <b>&gt;</b> {t}
            </span>
            <span className="sep">//</span>
          </span>
        ))}
      </div>
    </div>
  )
}
