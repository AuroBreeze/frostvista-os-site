import Reveal from '../components/Reveal'
import CodeBlock from '../components/CodeBlock'
import { makeParams, fvshBasics, fvshLimits, testCommands } from '../data/content'

function SectionTitle({ index, children }) {
  return (
    <Reveal>
      <div style={{ marginBottom: '2rem' }}>
        <div className="eyebrow">{index}</div>
        <h2>{children}</h2>
      </div>
    </Reveal>
  )
}

export default function Docs() {
  return (
    <>
      <PageHeader />
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container container--narrow">
          <SectionTitle index="01 / layout">PROJECT LAYOUT</SectionTitle>
          <Reveal>
            <CodeBlock
              title="FrostVistaOS/ — tree"
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
          <Reveal delay={120}>
            <p style={{ color: 'var(--muted)', marginTop: '1.3rem', fontSize: '0.85rem' }}>
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
              <code className="inline">user/bin/</code> programs are normal user
              applications placed in the Easy-FS image. The shared user runtime lives
              in <code className="inline">user/user.h</code> and{' '}
              <code className="inline">user/ulib.c</code>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionTitle index="02 / build & run">BUILD &amp; RUN IN QEMU</SectionTitle>
          <Reveal>
            <p style={{ marginBottom: '1.4rem', fontSize: '0.88rem' }}>
              Requirements: <code className="inline">riscv64-elf-gcc</code> (or a similar
              cross-compiler), <code className="inline">qemu-system-riscv64</code>, and{' '}
              <code className="inline">make</code>.
            </p>
            <CodeBlock
              title="default interactive shell run"
              lines={['<span className="hl">$</span> make qemu ROOTFS=easyfs FS_LIST="devtmpfs tmpfs" TEST=fvsh']}
            />
            <p style={{ color: 'var(--muted)', marginTop: '1.2rem', fontSize: '0.85rem', lineHeight: '1.7' }}>
              You should see the kernel enabling paging, mounting Easy-FS/devtmpfs,
              and starting the FrostVista shell (<code className="inline">fvsh</code>){' '}
              in the serial console. The <code className="inline">qemu</code> target
              respects explicit build parameters, so use it as the normal hand-written
              run entry point.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h3 style={{ margin: '2.6rem 0 1rem' }}>RUNNER PARAMETERS</h3>
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

          <Reveal delay={140}>
            <h3 style={{ margin: '2.6rem 0 1rem' }}>OTHER RUN PATHS</h3>
            <CodeBlock
              title="opensbi + ext4 runner"
              lines={['<span className="hl">$</span> make qemu BOOT=opensbi ROOTFS=ext4 FS_LIST="devtmpfs tmpfs" TEST=fvsh']}
            />
            <div style={{ height: '0.9rem' }} />
            <CodeBlock
              title="paused gdb session"
              lines={[
                '<span className="hl">$</span> make debug BOOT=opensbi ROOTFS=ext4 FS_LIST="devtmpfs tmpfs" TEST=fvsh',
                '<span className="hl">$</span> make gdb',
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="section" id="shell">
        <div className="container container--narrow">
          <SectionTitle index="03 / shell">THE FROSTVISTA SHELL</SectionTitle>
          <Reveal>
            <p style={{ color: 'var(--muted)', marginBottom: '1.4rem', fontSize: '0.85rem' }}>
              <code className="inline">fvsh</code> is a small interactive shell for
              exercising FrostVista&apos;s process, file descriptor, Easy-FS, and pipe
              paths. It is intentionally <span style={{ color: 'var(--red)', fontWeight: 700 }}>not</span> a full POSIX shell.
            </p>
            <CodeBlock
              title="fvsh / supported basics"
              lines={fvshBasics}
            />
          </Reveal>
          <Reveal delay={100}>
            <h3 style={{ margin: '2.6rem 0 1.2rem' }}>CURRENT LIMITATIONS</h3>
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
        </div>
      </section>

      <section className="section" id="tests">
        <div className="container container--narrow">
          <SectionTitle index="04 / tests">AUTOMATED TESTS</SectionTitle>
          <Reveal>
            <p style={{ color: 'var(--muted)', marginBottom: '1.4rem', fontSize: '0.85rem', lineHeight: '1.7' }}>
              The Python runner builds one user test at a time, launches QEMU, records
              logs under <code className="inline">logs/</code>, and classifies kernel
              diagnostics. Negative syscall tests report{' '}
              <code className="inline">PASS_EXPECTED_LOG</code>; unexpected{' '}
              <code className="inline">[WARN]</code> or <code className="inline">[ERROR]</code>{' '}
              lines are surfaced separately. <code className="inline">sys_pipe</code> also
              count-limits its expected diagnostics.
            </p>
            <CodeBlock
              title="runner usage"
              lines={testCommands}
            />
            <p style={{ color: 'var(--muted)', marginTop: '1.2rem', fontSize: '0.85rem', lineHeight: '1.7' }}>
              Use <code className="inline">--list</code> for the current automated test
              set. Manual/demo entries such as <code className="inline">fvsh</code>,{' '}
              <code className="inline">init</code>, and <code className="inline">echo</code>{' '}
              are intentionally hidden from that list. The Easy-FS writable-path tests
              automatically select <code className="inline">ROOTFS=easyfs</code> and{' '}
              <code className="inline">FS_LIST="easyfs devtmpfs"</code>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function PageHeader() {
  return (
    <section className="section" style={{ paddingTop: '4.5rem', paddingBottom: '1.5rem' }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">documentation / manual</div>
          <h1 style={{ maxWidth: '16ch' }}>BUILD IT. RUN IT. BREAK IT.</h1>
          <p className="lede" style={{ marginTop: '1.3rem' }}>
            Everything you need to go from a clean checkout to a booting, shell-driving
            FrostVista in QEMU — plus the layout and the test suite that keep it honest.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
