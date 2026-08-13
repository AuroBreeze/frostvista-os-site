import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import CodeBlock from '../components/CodeBlock'
import SectionHead from '../components/SectionHead'
import Ticker from '../components/Ticker'
import { philosophy, features, site } from '../data/content'

const tagClasses = {
  blue: 'tag--neutral',
  frost: 'tag--neutral',
  green: 'tag--green',
  red: 'tag--red',
  yellow: 'tag--amber',
}

const banner = [
  '    ______                __ _    ___      __       ',
  '   / ____/________  _____/ /| |  / (_)____/ /_____ _ ',
  '  / /_  / ___/ __ \\/ ___/ __/ | / / / ___/ __/ __ `/',
  ' / __/ / /  / /_/ (__  ) /_ | |/ / (__  ) /_/ /_/ / ',
  '/_/   /_/   \\____/____/\\__/ |___/_/____/\\__/\\__,_/',
]

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
      <Ticker />
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
    <section
      className="section"
      style={{
        minHeight: 'calc(100vh - 58px)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '3rem',
        paddingBottom: '3rem',
      }}
    >
      <div className="container" style={{ width: '100%', textAlign: 'center' }}>
        <Reveal>
          <div className="ascii" style={{ display: 'inline-block', textAlign: 'left' }}>
            {banner.map((l) => (
              <div key={l} dangerouslySetInnerHTML={{ __html: l }} />
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              margin: '2rem 0 1.2rem',
              letterSpacing: '-0.04em',
            }}
          >
            FROSTVISTA<span style={{ color: 'var(--red)' }}>_</span>OS
            <span style={{ color: 'var(--green)', animation: 'blink 1.1s steps(2, start) infinite' }}>_</span>
          </h1>
          <p className="lede" style={{ margin: '0 auto' }}>
            A compact RISC-V 64 kernel shaped by a simple idea:{' '}
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>keep the system small,
            but let every boundary be real.</span>
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/docs" className="btn btn--solid">
              boot it now
            </Link>
            <a href={site.repo} target="_blank" rel="noreferrer" className="btn btn--ghost">
              view source
            </a>
            <Link to="/roadmap" className="btn btn--ghost">
              view roadmap
            </Link>
            <a href={site.discord} target="_blank" rel="noreferrer" className="btn btn--ghost">
              join discord
            </a>
          </div>
        </Reveal>
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
      <div className="container container--narrow">
        <Reveal>
          <SectionHead num="01" eyebrow="philosophy / design principles" red>
            SMALL CODE. CLEAR SHAPE.{' '}
            <span style={{ color: 'var(--red)' }}>REAL</span> BEHAVIOR.
          </SectionHead>
        </Reveal>
        {philosophy.map((p, i) => (
          <Reveal key={p.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 40}>
            <div className="phil-row">
              <div className="phil-row__num">0{i + 1}</div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHead num="02" eyebrow="capabilities / subsystems">
            WHAT THE KERNEL <span style={{ color: 'var(--red)' }}>ACTUALLY</span> DOES
          </SectionHead>
        </Reveal>
        <div className="grid-seam" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {features.map((f, i) => (
            <div key={f.title} style={{ padding: '1.4rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <Reveal delay={(i % 3) * 80} className="h-full">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className={`tag ${tagClasses[f.tagColor] || 'tag--neutral'}`}>{f.tag}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--faint)', letterSpacing: '0.1em' }}>
                      0{i + 1 < 10 ? '0' : ''}{i + 1}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', lineHeight: '1.15' }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.7' }}>{f.body}</p>
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
        <Reveal>
          <SectionHead num="03" eyebrow="from power-on to prompt">
            A BOOT YOU CAN <span style={{ color: 'var(--green)' }}>READ</span>
          </SectionHead>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <Reveal direction="left">
              <p className="lede">
                Paging on. Timer ticking. Memory counted. A hello from the kernel,
                then a filesystem and a shell. Every line is a real step on a real
                path — no stubs, no placeholders.
              </p>
              <ul className="checklist" style={{ marginTop: '1.4rem', fontSize: '0.85rem' }}>
                <li>Sv39 paging enabled on RISC-V 64</li>
                <li>Physical memory allocator initialized</li>
                <li>VirtIO block device online</li>
                <li>Easy-FS mounted, shell started</li>
              </ul>
            </Reveal>
          </div>
          <Reveal direction="right" delay={100}>
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
    <section className="section" style={{ paddingBottom: '3.5rem' }}>
      <div className="container">
        <Reveal>
          <div style={{ border: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
            <div className="hazard" />
            <div style={{ padding: '2.4rem 2.2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.3rem' }}>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>
                get started / one command
              </div>
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
                <a href={site.repo} target="_blank" rel="noreferrer" className="btn btn--ghost">
                  view source
                </a>
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
