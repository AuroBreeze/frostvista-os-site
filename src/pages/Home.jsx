import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import CodeBlock from '../components/CodeBlock'
import { bootLog, philosophy, features, site } from '../data/content'

const tagClasses = {
  blue: 'tag--neutral',
  frost: 'tag--neutral',
  green: 'tag--green',
  red: 'tag--red',
  yellow: 'tag--amber',
}

const telemetry = [
  { k: 'ARCH', v: 'riscv64' },
  { k: 'PAGING', v: 'sv39' },
  { k: 'PLATFORM', v: 'qemu-virt' },
  { k: 'MEM', v: '32039 pg' },
  { k: 'FS', v: 'easyfs/ext4' },
  { k: 'SHELL', v: 'fvsh' },
]

export default function Home() {
  return (
    <>
      <Hero />
      <TelemetryStrip />
      <Philosophy />
      <Features />
      <Boot />
      <Cta />
    </>
  )
}

function Hero() {
  return (
    <section className="section" style={{ paddingTop: '5.5rem', paddingBottom: '5rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '3rem', alignItems: 'start' }}>
          <div>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: '1.4rem' }}>
                kernel / riscv64 / boot sequence
              </div>
              <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', lineHeight: '0.92', marginBottom: '1.6rem' }}>
                FROSTVISTA
                <br />
                <span style={{ color: 'var(--red)' }}>OS</span>
                <span className="cursor" style={{ color: 'var(--green)', animation: 'blink 1.1s steps(2, start) infinite' }}>_</span>
              </h1>
            </Reveal>
            <Reveal delay={90}>
              <p className="lede" style={{ marginBottom: '1.1rem' }}>
                A compact RISC-V 64 kernel shaped by a simple idea:{' '}
                <span style={{ color: 'var(--ink)', fontWeight: 700 }}>keep the system small,
                but let every boundary be real.</span>
              </p>
              <p className="lede">
                Built for learning, experimentation, and small embedded-style
                environments. Every path — boot, run, read, write, fail — is real.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2.2rem', flexWrap: 'wrap' }}>
                <Link to="/docs" className="btn btn--solid">
                  boot it now
                </Link>
                <Link to="/roadmap" className="btn btn--ghost">
                  view roadmap
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <CodeBlock title="serial console / fvsh" lines={bootLog} />
            <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>
              <span>ttyS0 · 115200 baud</span>
              <span style={{ color: 'var(--green)' }}>[OK] boot complete</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function TelemetryStrip() {
  return (
    <section className="section" style={{ padding: '0' }}>
      <div className="container">
        <Reveal>
          <div className="grid-seam" style={{ gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: '1px' }}>
            {telemetry.map((t) => (
              <div key={t.k} style={{ padding: '1rem 1.2rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--faint)', marginBottom: '0.3rem' }}>
                  {t.k}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--green)' }}>
                  {t.v}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Philosophy() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">philosophy / design principles</div>
          <h2 style={{ maxWidth: '18ch', marginBottom: '2.5rem' }}>
            SMALL CODE. CLEAR SHAPE. <span style={{ color: 'var(--red)' }}>REAL</span> BEHAVIOR.
          </h2>
        </Reveal>
        <div className="grid-seam" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {philosophy.map((p, i) => (
            <div key={p.title} style={{ padding: '1.8rem 1.6rem' }}>
              <Reveal delay={i * 70}>
                <div className="meta-line" style={{ marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--red)' }}>UNIT / 0{i + 1}</span>
                  <span className="k">:: {p.title.toLowerCase().replace(/\s+/g, '_')}</span>
                </div>
                <h3 style={{ marginBottom: '0.7rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.7' }}>{p.body}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">capabilities / subsystems</div>
          <h2 style={{ marginBottom: '2.5rem' }}>WHAT THE KERNEL <span style={{ color: 'var(--red)' }}>ACTUALLY</span> DOES</h2>
        </Reveal>
        <div className="grid-seam" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {features.map((f, i) => (
            <div key={f.title} style={{ padding: '1.6rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <Reveal delay={(i % 3) * 80} className="h-full">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className={`tag ${tagClasses[f.tagColor] || 'tag--neutral'}`}>{f.tag}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--faint)', letterSpacing: '0.1em' }}>
                      0{i + 1 < 10 ? '0' : ''}{i + 1}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', lineHeight: '1.15' }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.83rem', lineHeight: '1.7' }}>{f.body}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Boot() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '3.5rem', alignItems: 'center' }}>
          <div>
            <Reveal>
              <div className="eyebrow">from power-on to prompt</div>
              <h2 style={{ marginBottom: '1.3rem' }}>A BOOT YOU CAN <span style={{ color: 'var(--green)' }}>READ</span></h2>
              <p className="lede">
                Paging on. Timer ticking. Memory counted. A hello from the kernel,
                then a filesystem and a shell. Every line is a real step on a real
                path — no stubs, no placeholders.
              </p>
              <ul className="checklist" style={{ marginTop: '1.6rem', fontSize: '0.85rem' }}>
                <li>Sv39 paging enabled on RISC-V 64</li>
                <li>Physical memory allocator initialized</li>
                <li>VirtIO block device online</li>
                <li>Easy-FS mounted, shell started</li>
              </ul>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <CodeBlock
              title="kernel boot / quick look"
              lines={[
                '[   0.094] [ INFO] <span className="hl">Paging enable successfully</span>',
                '[   0.101] [ INFO] Enable time interrupts...',
                '[   0.104] [ INFO] kalloc_init start',
                '[   0.672] [ INFO] <span className="ok">Total Memory Pages: 32039</span>',
                '[   0.673] [ INFO] kalloc_init end',
                '[   0.675] [ INFO] <span className="hl">Hello FrostVista OS!</span>',
                '[   0.679] [ INFO] virtio-blk initialized, mmio version 2',
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="section" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Reveal>
          <div style={{ border: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
            <div className="hazard" />
            <div style={{ padding: '3rem 2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.3rem' }}>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>get started / one command</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                BOOT IT. <span style={{ color: 'var(--red)' }}>NOW.</span>
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '56ch', lineHeight: '1.7' }}>
                Requirements: <code className="inline">riscv64-elf-gcc</code>,{' '}
                <code className="inline">qemu-system-riscv64</code>, and{' '}
                <code className="inline">make</code>. No board, no hardware — the
                kernel boots to the FrostVista shell in QEMU.
              </p>
              <div style={{ width: '100%', maxWidth: 640, textAlign: 'left' }}>
                <CodeBlock
                  title="qemu run / interactive shell"
                  lines={['<span className="hl">$</span> make qemu ROOTFS=easyfs FS_LIST="devtmpfs tmpfs" TEST=fvsh']}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <Link to="/docs" className="btn btn--solid">
                  read the docs
                </Link>
                <a href={site.discord} target="_blank" rel="noreferrer" className="btn btn--ghost">
                  join discord
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
