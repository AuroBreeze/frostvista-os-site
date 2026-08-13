import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal'
import CodeBlock from '../components/CodeBlock'
import InteractiveTerminal from '../components/InteractiveTerminal'
import { makeParams, fvshBasics, fvshLimits, testCommands } from '../data/content'

const sections = [
  {
    id: 'layout',
    n: '01',
    label: 'project layout',
    head: 'PROJECT LAYOUT',
    code: 'man 01_project_layout',
    comp: <LayoutSection />,
  },
  {
    id: 'build',
    n: '02',
    label: 'build & run',
    head: 'BUILD & RUN IN QEMU',
    code: 'man 02_build_run',
    comp: <BuildSection />,
  },
  {
    id: 'shell',
    n: '03',
    label: 'the shell',
    head: 'THE FROSTVISTA SHELL',
    code: 'man 03_fvsh',
    comp: <ShellSection />,
  },
  {
    id: 'tests',
    n: '04',
    label: 'automated tests',
    head: 'AUTOMATED TESTS',
    code: 'man 04_tests',
    comp: <TestsSection />,
  },
]

function getInitialSection() {
  if (typeof window === 'undefined') return sections[0].id
  const h = window.location.hash.replace('#', '')
  const found = sections.find((s) => s.id === h)
  return found ? found.id : sections[0].id
}

export default function Docs() {
  const [active, setActive] = useState(getInitialSection)

  useEffect(() => {
    const onKey = (e) => {
      const idx = sections.findIndex((s) => s.id === active)
      if (e.key === 'ArrowRight' && idx < sections.length - 1) go(sections[idx + 1].id)
      if (e.key === 'ArrowLeft' && idx > 0) go(sections[idx - 1].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  function go(id) {
    setActive(id)
    history.replaceState(null, '', `#${id}`)
    window.scrollTo({ top: 0 })
  }

  const current = sections.find((s) => s.id === active)
  const idx = sections.findIndex((s) => s.id === active)

  return (
    <>
      <PageHeader />
      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: '3rem', alignItems: 'start' }}>
          <aside>
            <Reveal direction="left">
              <nav className="toc">
                <div style={{ padding: '0.7rem 1rem', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>
                  MANUAL / SECTIONS
                </div>
                {sections.map((s) => {
                  const isActive = s.id === active
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => go(s.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.6rem',
                        width: '100%',
                        padding: '0.55rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        borderLeft: isActive ? '2px solid var(--green)' : '2px solid transparent',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textAlign: 'left',
                        color: isActive ? 'var(--green)' : 'var(--muted)',
                        cursor: 'pointer',
                        transition: 'color 0.15s, border-color 0.15s, background 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'var(--panel)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span style={{ color: isActive ? 'var(--green)' : 'var(--red)', fontSize: '0.62rem' }}>{s.n}</span>
                      {s.label}
                    </button>
                  )
                })}
                <div style={{ padding: '0.6rem 1rem', borderTop: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--faint)' }}>
                  ← → to switch · <span style={{ color: 'var(--green)' }}>{sections.length - idx - 1}</span> more
                </div>
              </nav>
            </Reveal>
          </aside>

          <div style={{ maxWidth: 720 }}>
            <Reveal direction="down">
              <div className="doc-header" key={current.id}>
                <div className="doc-header__line">
                  <span style={{ color: 'var(--red)' }}>$</span>{' '}
                  <span style={{ color: 'var(--green)' }}>{current.code}</span>
                  <span style={{ color: 'var(--muted)' }}>  # section {idx + 1}/{sections.length}</span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', margin: '0.4rem 0 0.2rem' }}>
                  {current.head.split(' ')[0]}{' '}
                  <span style={{ color: 'var(--red)' }}>{current.head.split(' ').slice(1).join(' ')}</span>
                </h2>
                <div className="doc-header__rule" />
              </div>
            </Reveal>

            <div key={`${current.id}-content`} className="doc-body">
              {current.comp}
            </div>

            <div className="doc-nav">
              <button type="button" className="btn btn--ghost" disabled={idx === 0} onClick={() => idx > 0 && go(sections[idx - 1].id)} style={{ opacity: idx === 0 ? 0.35 : 1, cursor: idx === 0 ? 'not-allowed' : 'pointer' }}>
                &lt; {idx > 0 ? sections[idx - 1].label : 'start'}
              </button>
              <button type="button" className="btn btn--solid" disabled={idx === sections.length - 1} onClick={() => idx < sections.length - 1 && go(sections[idx + 1].id)} style={{ opacity: idx === sections.length - 1 ? 0.35 : 1, cursor: idx === sections.length - 1 ? 'not-allowed' : 'pointer' }}>
                {idx < sections.length - 1 ? sections[idx + 1].label : 'end'} &gt;
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function PageHeader() {
  return (
    <section className="section" style={{ paddingTop: '4rem', paddingBottom: '1.5rem' }}>
      <div className="container">
        <Reveal direction="down">
          <div className="eyebrow">documentation / manual</div>
          <h1 style={{ maxWidth: '16ch' }}>
            BUILD IT. RUN IT. <span style={{ color: 'var(--red)' }}>BREAK IT.</span>
          </h1>
          <p className="lede" style={{ marginTop: '1.3rem' }}>
            A man-style manual, section by section. Use the index, the{' '}
            <kbd>←</kbd> <kbd>→</kbd> keys, or the buttons below.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function LayoutSection() {
  return (
    <>
      <Reveal direction="right">
        <CodeBlock
          title="FrostVistaOS/ — tree"
          copy
          lines={[
            'arch/riscv/    RISC-V boot, trap, paging, SBI, UART, timer, PLIC',
            'kernel/core/   Process, syscall, exec, fd, pipe, scheduler',
            'kernel/driver/ VirtIO block device driver',
            'kernel/fs/     VFS, Easy-FS, EXT4, devtmpfs, tmpfs, block cache',
            'kernel/mm/     Kernel memory management',
            'include/       Kernel headers and shared constants',
            'mk/            Makefile fragments (toolchain, sources, images)',
            'mkfs/          Host Easy-FS image builder',
            'scripts/       Test runner and helper scripts',
            'test/          User-mode test entry programs (-> /init)',
            'user/          Shared user runtime; apps: echo, cat, fvsh',
            'docs/          Project notes and known issues',
            'devlog/        Development notes',
          ]}
        />
      </Reveal>
      <Reveal direction="right" delay={100}>
        <p style={{ color: 'var(--muted)', marginTop: '1.2rem', fontSize: '0.85rem' }}>
          The test/application split is intentional:
        </p>
        <CodeBlock
          title="entrypoints"
          lines={[
            'test/test_$(TEST).c  -> <span className="ok">build/test/init_bin</span> -> guest /init',
            'user/bin/*.c         -> <span className="ok">build/user/&lt;app&gt;</span>    -> guest /&lt;app&gt;',
          ]}
        />
        <p style={{ color: 'var(--muted)', marginTop: '1rem', fontSize: '0.85rem', lineHeight: '1.7' }}>
          <code className="inline">test/</code> programs are test entrypoints.{' '}
          <code className="inline">user/bin/</code> programs are normal user applications
          placed in the Easy-FS image. The shared user runtime lives in{' '}
          <code className="inline">user/user.h</code> and <code className="inline">user/ulib.c</code>.
        </p>
      </Reveal>
    </>
  )
}

function BuildSection() {
  return (
    <>
      <Reveal direction="right">
        <p style={{ marginBottom: '1.3rem', fontSize: '0.88rem' }}>
          Requirements: <code className="inline">riscv64-elf-gcc</code> (or a similar
          cross-compiler), <code className="inline">qemu-system-riscv64</code>, and{' '}
          <code className="inline">make</code>.
        </p>
        <CodeBlock
          title="default interactive shell run"
          copy
          typewriter
          lines={['<span className="hl">$</span> make qemu ROOTFS=easyfs FS_LIST="devtmpfs tmpfs" TEST=fvsh']}
        />
      </Reveal>
      <Reveal direction="right" delay={80}>
        <h3 style={{ margin: '2rem 0 1rem' }}>RUNNER PARAMETERS</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Values</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {makeParams.map((p) => (
                <tr key={p.key}>
                  <td>
                    <code className="inline">{p.key}</code>
                  </td>
                  <td>
                    <code className="inline">{p.value}</code>
                  </td>
                  <td style={{ color: 'var(--muted)' }}>{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
      <Reveal direction="right" delay={140}>
        <h3 style={{ margin: '2rem 0 1rem' }}>OTHER RUN PATHS</h3>
        <CodeBlock
          title="opensbi + ext4 runner"
          copy
          lines={['<span className="hl">$</span> make qemu BOOT=opensbi ROOTFS=ext4 FS_LIST="devtmpfs tmpfs" TEST=fvsh']}
        />
        <div style={{ height: '0.8rem' }} />
        <CodeBlock
          title="paused gdb session"
          copy
          lines={[
            '<span className="hl">$</span> make debug BOOT=opensbi ROOTFS=ext4 FS_LIST="devtmpfs tmpfs" TEST=fvsh',
            '<span className="hl">$</span> make gdb',
          ]}
        />
      </Reveal>
    </>
  )
}

function ShellSection() {
  return (
    <>
      <Reveal direction="right">
        <p style={{ color: 'var(--muted)', marginBottom: '1.3rem', fontSize: '0.85rem' }}>
          <code className="inline">fvsh</code> is a small interactive shell for exercising
          FrostVista&apos;s process, file descriptor, Easy-FS, and pipe paths. Try it right
          here — it is not a full POSIX shell.
        </p>
      </Reveal>
      <Reveal direction="right">
        <InteractiveTerminal />
      </Reveal>
      <Reveal direction="right" delay={80}>
        <h3 style={{ margin: '2rem 0 1.1rem' }}>SUPPORTED BASICS</h3>
        <CodeBlock title="fvsh / supported basics" copy lines={fvshBasics} />
      </Reveal>
      <Reveal direction="right" delay={140}>
        <h3 style={{ margin: '2rem 0 1.1rem' }}>CURRENT LIMITATIONS</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Missing feature</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              {fvshLimits.map((l) => (
                <tr key={l.title}>
                  <td>{l.title}</td>
                  <td>
                    <code className="inline">{l.example}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </>
  )
}

function TestsSection() {
  return (
    <>
      <Reveal direction="right">
        <p style={{ color: 'var(--muted)', marginBottom: '1.3rem', fontSize: '0.85rem', lineHeight: '1.7' }}>
          The Python runner builds one user test at a time, launches QEMU, records logs
          under <code className="inline">logs/</code>, and classifies kernel diagnostics.
          Negative syscall tests report <code className="inline">PASS_EXPECTED_LOG</code>;
          unexpected <code className="inline">[WARN]</code> or <code className="inline">[ERROR]</code>{' '}
          lines are surfaced separately.
        </p>
        <CodeBlock title="runner usage" copy typewriter lines={testCommands} />
      </Reveal>
    </>
  )
}
