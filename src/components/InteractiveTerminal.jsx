import { useEffect, useRef, useState } from 'react'
import useLatestVersion from '../hooks/useLatestVersion'

const BOOT = [
  '[   0.094] [ INFO] Paging enable successfully',
  '[   0.675] [ INFO] Hello FrostVista OS!',
  '[   0.679] [ INFO] virtio-blk initialized, mmio version 2',
  'Easy-FS mounted at /. Starting shell...',
  '',
]

const HELP = [
  'available commands:',
  '  help       show this list',
  '  pwd        print working directory',
  '  ls [path]  list directory',
  '  cd <dir>   change directory',
  '  cat <file> print a file',
  '  echo <txt> print text (supports > redirect)',
  '  uname      print system info',
  '  clear      clear the screen',
  '',
]

const FS = {
  '/': {
    dirs: ['dev', 'mnt', 'tmp'],
    files: {
      init: '#!/bin/init\n[ OK ] FrostVista initialized',
      echo: 'usage: echo <text>',
      cat: 'usage: cat <file>',
      fvsh: 'FrostVista Shell',
    },
  },
  '/dev': { dirs: [], files: { console: 'tty device', null: 'null device' } },
  '/mnt': { dirs: ['ext4'], files: {} },
  '/mnt/ext4': { dirs: [], files: { 'README.txt': 'FrostVista / read-only EXT4 image.\nWrites land in the tmpfs upper layer.' } },
  '/tmp': { dirs: [], files: { 'hello.txt': 'hello from tmpfs' } },
}

function normalize(cwd) {
  return cwd === '' ? '/' : cwd
}

function resolve(cwd, arg) {
  if (!arg) return null
  if (arg.startsWith('/')) return normalize(arg)
  const base = cwd === '/' ? '' : cwd
  return normalize(`${base}/${arg}`.replace(/\/+/g, '/'))
}

function exists(path) {
  return path in FS
}

export default function InteractiveTerminal() {
  const { version } = useLatestVersion()
  const ver = version || 'v1.3'
  const [lines, setLines] = useState(BOOT)
  const [input, setInput] = useState('')
  const [cwd, setCwd] = useState('/')
  const [hist, setHist] = useState([])
  const [hIdx, setHIdx] = useState(-1)
  const [focus, setFocus] = useState(false)
  const boxRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const el = boxRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  useEffect(() => {
    if (focus) inputRef.current?.focus()
  }, [focus])

  const push = (rows) => setLines((l) => [...l, ...rows])

  const run = (raw) => {
    const cmd = raw.trim()
    push([`frostvista:/${cwd === '/' ? '' : cwd.replace(/^\//, '')}$ ${raw}`])
    if (!cmd) return

    const [name, ...rest] = cmd.split(/\s+/)
    const arg = rest.join(' ')

    switch (name) {
      case 'help':
        push(HELP)
        break
      case 'pwd':
        push([normalize(cwd)])
        break
      case 'clear':
        setLines([])
        return
      case 'uname':
        push([`FrostVista ${ver}  riscv64  sv39`])
        break
      case 'ls': {
        const path = resolve(cwd, arg) || normalize(cwd)
        const node = FS[path]
        if (!node) {
          push([`ls: cannot access '${arg}': No such file or directory`])
          break
        }
        push([[...node.dirs.map((d) => d + '/'), ...Object.keys(node.files)].join('   ')])
        break
      }
      case 'cd': {
        if (!arg || arg === '~') {
          setCwd('/')
          break
        }
        const path = resolve(cwd, arg)
        if (!path || !exists(path) || !FS[path].dirs) {
          push([`cd: no such file or directory: ${arg}`])
          break
        }
        setCwd(path)
        break
      }
      case 'cat': {
        if (!arg) {
          push(['usage: cat <file>'])
          break
        }
        if (arg.startsWith('<')) {
          const target = arg.replace(/^<\s*/, '')
          const path = resolve(cwd, target)
          if (!path || !FS[path]?.files) {
            push([`cat: ${target}: No such file or directory`])
            break
          }
          const body = FS[path].files[Object.keys(FS[path].files)[0]]
          push((body || '').split('\n'))
          break
        }
        const path = resolve(cwd, arg)
        if (!path || !FS[path]?.files?.[arg]) {
          push([`cat: ${arg}: No such file or directory`])
          break
        }
        push(FS[path].files[arg].split('\n'))
        break
      }
      case 'echo': {
        const pipe = arg.match(/^(.*?)\s*\|\s*cat$/)
        if (pipe) {
          push([pipe[1]])
          break
        }
        const m = arg.match(/^(.*)\s*>\s*(\S+)$/)
        if (m) {
          const path = resolve(cwd, m[2])
          if (!path || !FS[path]) {
            push([`echo: cannot create '${m[2]}': No such file or directory`])
            break
          }
          const dir = FS[path]
          dir.files = dir.files || {}
          dir.files[m[2]] = m[1]
          push([`[ OK ] wrote ${path}`])
          break
        }
        push([arg])
        break
      }
      default:
        push([`fvsh: ${name}: command not found`])
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter') {
      const v = input.trim()
      if (v) {
        setHist((h) => [...h, v])
        run(input)
        setInput('')
      }
      setHIdx(-1)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!hist.length) return
      const idx = hIdx < 0 ? hist.length - 1 : Math.max(0, hIdx - 1)
      setHIdx(idx)
      setInput(hist[idx])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (hIdx < 0) return
      const idx = hIdx + 1
      if (idx >= hist.length) {
        setHIdx(-1)
        setInput('')
      } else {
        setHIdx(idx)
        setInput(hist[idx])
      }
    }
  }

  return (
    <div
      className="inter-term"
      style={{
        border: '1px solid var(--border)',
        background: 'var(--bg-soft)',
        boxShadow: focus ? 'inset 0 0 0 1px var(--green)' : 'none',
        transition: 'box-shadow 0.2s',
      }}
      onClick={() => setFocus(true)}
    >
      <div className="code-block__header">
        <span className="code-block__dots">
          <span />
          <span />
          <span />
        </span>
        <span>fvsh / interactive — type a command</span>
        <span className="code-block__status">live</span>
      </div>
      <div
        ref={boxRef}
        style={{
          height: 360,
          overflowY: 'auto',
          padding: '0.9rem 1.1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          lineHeight: '1.55',
          color: 'var(--ink-soft)',
        }}
      >
        {lines.map((l, i) => (
          <div key={i} className={l.startsWith('[') ? 'log-line' : ''} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {l}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <span style={{ color: 'var(--green)' }}>frostvista:/{cwd === '/' ? '' : cwd.replace(/^\//, '')}$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            onBlur={() => setFocus(false)}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            aria-label="fvsh command input"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--ink)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              caretColor: 'var(--green)',
            }}
          />
        </div>
      </div>
      <div
        className="meta-line"
        style={{ padding: '0.45rem 1.1rem', borderTop: '1px solid var(--border)', background: 'var(--panel)' }}
      >
        <span className="k">try:</span>
        <span style={{ color: 'var(--ink-soft)' }}>help</span>
        <span style={{ color: 'var(--muted)' }}>·</span>
        <span style={{ color: 'var(--ink-soft)' }}>ls /</span>
        <span style={{ color: 'var(--muted)' }}>·</span>
        <span style={{ color: 'var(--ink-soft)' }}>echo hello | cat</span>
        <span style={{ color: 'var(--muted)' }}>·</span>
        <span style={{ color: 'var(--ink-soft)' }}>cat /mnt/ext4/README.txt</span>
        <span style={{ color: 'var(--muted)' }}>·</span>
        <span style={{ color: 'var(--ink-soft)' }}>↑ history</span>
      </div>
    </div>
  )
}
