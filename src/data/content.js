export const site = {
  name: 'FrostVista OS',
  cnName: '霜见内核',
  tagline: 'A compact RISC-V 64 (Sv39) kernel',
  repo: 'https://github.com/',
  discord: 'https://discord.gg/N8Ar3q5cSh',
  version: 'v1.3',
  arch: 'RISC-V 64 / Sv39',
  license: 'GPL-3.0',
}

export const bootLog = [
  '[   0.094] [ INFO] Paging enable successfully',
  '------------------------------------------------------------',
  '    ______                __ _    ___      __       ',
  '   / ____/________  _____/ /| |  / (_)____/ /_____ _ ',
  '  / /_  / ___/ __ \\/ ___/ __/ | / / / ___/ __/ __ `/ ',
  ' / __/ / /  / /_/ (__  ) /_ | |/ / (__  ) /_/ /_/ / ',
  '/_/   /_/   \\____/____/\\__/ |___/_/____/\\__/\\__,_/',
  '',
  'RISC-V 64  |  Sv39  |  v1.0',
  '------------------------------------------------------------',
  '[   0.101] [ INFO] Enable time interrupts...',
  '[   0.102] [ INFO] Timer init done',
  '------------------------------------------------------------',
  '  ◆ Platform Init',
  '[   0.104] [ INFO] kalloc_init start',
  '[   0.672] [ INFO] Total Memory Pages: 32039',
  '[   0.673] [ INFO] kalloc_init end',
  '[   0.673] [ INFO] clear low memory mappings',
  '[   0.674] [ INFO] clear low memory mappings done',
  '[   0.675] [ INFO] Hello FrostVista OS!',
  '------------------------------------------------------------',
  '  ◆ Process Subsystem',
  '------------------------------------------------------------',
  '  ◆ Filesystem & Devices',
  '[   0.679] [ INFO] virtio-blk initialized, mmio version 2',
  '------------------------------------------------------------',
]

export const philosophy = [
  {
    title: 'Elegant Simplicity',
    body: 'Small code, clear shape, real behavior. Each subsystem stays readable enough that a single developer can hold the whole kernel in their head.',
  },
  {
    title: 'Real Boundaries',
    body: 'Keep the kernel compact while preserving true OS structure: process, file descriptor, pipe, and scheduler paths are all real, not stubs.',
  },
  {
    title: 'Working System First',
    body: 'Make paths boot, run, read, write, and fail visibly. A system that runs end-to-end beats a sprawling one that mostly compiles.',
  },
  {
    title: 'Purposeful Abstraction',
    body: 'Abstract only when it makes the system simpler to grow. No layers for their own sake — every interface earns its place.',
  },
  {
    title: 'Classic Roots, Own Path',
    body: 'Learn from xv6, but let FrostVista become its own kernel. The lineage informs the design; it does not constrain it.',
  },
]

export const features = [
  {
    title: 'RISC-V 64, Sv39 paging',
    body: 'Boots bare or under OpenSBI, enables Sv39 paging, and runs time interrupts, timers, and PLIC-driven devices.',
    tag: 'Architecture',
    tagColor: 'blue',
  },
  {
    title: 'Process subsystem',
    body: 'Process, syscall, exec, file descriptor, pipe, and scheduler paths — a real model, kept compact and legible.',
    tag: 'Kernel core',
    tagColor: 'frost',
  },
  {
    title: 'Copy-on-write fork',
    body: 'Pages shared via PTE_COW with per-page refcounts; the first write copies. Kernel copyout into shared pages handled.',
    tag: 'Memory',
    tagColor: 'green',
  },
  {
    title: 'slab + kmalloc allocator',
    body: 'Named object caches plus a general-purpose kmalloc in 9 size classes. Small kernel objects no longer burn whole pages.',
    tag: 'Memory',
    tagColor: 'green',
  },
  {
    title: 'VirtIO block device',
    body: 'A virtio-blk driver with feature negotiation aligned with xv6, powering both the Easy-FS and EXT4 backends.',
    tag: 'Driver',
    tagColor: 'yellow',
  },
  {
    title: 'VFS with four filesystems',
    body: 'VFS over Easy-FS, read-only EXT4, devtmpfs, and tmpfs — with a block cache and a writable overlay on top of EXT4.',
    tag: 'Filesystem',
    tagColor: 'red',
  },
  {
    title: 'tmpfs + writable EXT4 illusion',
    body: 'An in-memory filesystem layered as a path-mirrored upper layer: EXT4 appears writable while the disk image stays byte-identical.',
    tag: 'Filesystem',
    tagColor: 'red',
  },
  {
    title: 'Signals roadmap',
    body: 'v1.4 brings the first real signal subsystem: delivery, handlers, sigreturn, Ctrl+C in the shell, and faults that kill only their process.',
    tag: 'Roadmap',
    tagColor: 'yellow',
  },
]

export const layout = [
  { path: 'arch/riscv/', note: 'RISC-V boot, trap, paging, SBI, UART, timer, and PLIC code' },
  { path: 'kernel/core/', note: 'Process, syscall, exec, file descriptor, pipe, and scheduler paths' },
  { path: 'kernel/driver/', note: 'VirtIO block device driver' },
  { path: 'kernel/fs/', note: 'VFS, Easy-FS, EXT4 read-only, devtmpfs, tmpfs, and block cache layers' },
  { path: 'kernel/mm/', note: 'Kernel memory management' },
  { path: 'include/', note: 'Kernel headers and shared constants' },
  { path: 'mk/', note: 'Makefile fragments for toolchain, sources, images, and run profiles' },
  { path: 'mkfs/', note: 'Host Easy-FS image builder' },
  { path: 'scripts/', note: 'Test runner and helper scripts' },
  { path: 'test/', note: 'User-mode test entry programs; each test/test_*.c can become /init' },
  { path: 'user/', note: 'Shared user-mode runtime and apps: echo, cat, fvsh' },
  { path: 'docs/', note: 'Project notes and known issues' },
  { path: 'devlog/', note: 'Development notes' },
]

export const makeParams = [
  { key: 'BOOT', value: 'bare | opensbi', note: 'Boot mode for the QEMU runner' },
  { key: 'ROOTFS', value: 'easyfs | ext4', note: 'Root filesystem backend' },
  { key: 'FS_LIST', value: '"devtmpfs tmpfs"', note: 'Filesystems mounted alongside the root' },
  { key: 'TEST', value: '<name>', note: 'Test under test/test_*.c, without the test_ prefix' },
  { key: 'BUILD', value: 'release | debug', note: 'Optimization level' },
]

export const fvshBasics = [
  'help',
  'pwd',
  'cd /',
  'exit',
  'echo hello',
  'cat file',
  'echo hello > out',
  'cat < out',
  'echo hello | cat',
  'echo hello | cat > out',
]

export const fvshLimits = [
  { title: 'No quotes or escapes', example: 'echo "hello world"' },
  { title: 'No append redirection', example: 'echo hi >> out' },
  { title: 'No stderr redirection', example: 'cmd 2> err' },
  { title: 'No multi-stage pipelines', example: 'a | b | c' },
  { title: 'No globbing or variables', example: 'echo $HOME, ls *.c' },
  { title: 'No job control / background', example: 'cmd &, fg, bg' },
  { title: 'No PATH / env search', example: 'user apps are packaged directly in Easy-FS' },
]

export const testCommands = [
  'python3 ./scripts/run_tests.py --list',
  'python3 ./scripts/run_tests.py -t fvsh_script -T 30',
  'python3 ./scripts/run_tests.py -t sys_pipe -T 20 --skip-kernel',
  'python3 ./scripts/run_tests.py -t easyfs -T 20 --skip-kernel',
  'python3 ./scripts/run_tests.py -t backend -T 20 --skip-kernel --rootfs ext4 --fs-list "tmpfs devtmpfs"',
  'python3 ./scripts/run_tests.py --check logs/',
]

export const roadmapCurrent = {
  title: 'v1.4 — Signals & Interactive Terminal',
  summary:
    'FrostVista gains its first real signal subsystem: the missing half of the process model. Signals give the kernel asynchronous process notification and forced termination, and give the shell a real Ctrl+C. The design follows the Linux RISC-V ABI so musl-based user programs and the contest runner can use signals unchanged.',
  scope:
    'Not in scope: full POSIX signal semantics, real-time signal queues, sigaltstack, ptrace, core dumps, per-thread signal masks, or job-control process groups. The goal is a clean, correct signal foundation: delivery, handlers, return, and interactive terminal behavior.',
  phases: [
    {
      name: 'Phase 1 — Kernel Signal Skeleton',
      items: [
        'Process signal state: struct Process gains pending/masked signal sets and a handler table; fork copies them',
        'Signal primitives: signal() registration and sigprocmask / sigpending basics in a new kernel/core/signal.c',
        'kill syscall: locate a pid, set the pending bit, and wake a sleeping target',
      ],
    },
    {
      name: 'Phase 2 — Delivery and Return',
      items: [
        'Signal delivery: check pending signals before returning to user mode; build a sigframe on the user stack and enter the handler',
        'sigreturn: restore the saved context from the sigframe and resume the interrupted instruction',
        'ABI alignment: sigframe layout and a0 signal-number argument follow the Linux RISC-V / musl conventions',
      ],
    },
    {
      name: 'Phase 3 — Interactive Terminal',
      items: [
        'User-side wiring: signal()/kill() wrappers and the __restore stub in the shared user runtime',
        'Ctrl+C in fvsh: collect_char raises SIGINT on 0x03; the shell catches it and returns to a fresh prompt while child processes terminate',
        'Faults become signals: page faults without a handler terminate the process instead of panicking the kernel',
      ],
    },
    {
      name: 'Phase 4 — Regression Tests',
      items: [
        'Signal lifecycle: raise, deliver, handle, and return-to-workflow round trips',
        'Ctrl+C shell behavior: interrupt a running command and confirm the shell survives',
        'Fault-to-signal: SIGSEGV on an unmapped access kills only the faulting process',
      ],
    },
  ],
  validation: [
    'python3 ./scripts/run_tests.py -t signal -T 20',
    'python3 ./scripts/run_tests.py -t fvsh_sigint -T 20',
    'Existing full suite still passes with signal delivery enabled',
  ],
}

export const roadmapPast = [
  {
    version: 'v1.3',
    title: 'tmpfs and Writable EXT4 Illusion',
    summary:
      'A real in-memory filesystem (tmpfs) layered as a path-mirrored upper layer inside the EXT4 backend, so the read-only EXT4 image appears writable while the disk is never modified. A reboot drops the upper layer and the EXT4 image is unchanged.',
    points: [
      'tmpfs inode model, directory ops (lookup/create/mkdir/unlink), file ops (read/write/truncate), mount at /tmp',
      'Overlay layer (kernel/fs/ext4fs/mix.c): upper-first lookup, mirrored create/mkdir, copy-up on first write, whiteout unlink, merged readdir',
      'EXT4 image stays byte-identical under all write paths',
      'slab + kmalloc allocator: 9 size classes, object caches',
      'Copy-on-write fork with PTE_COW and per-page refcounts',
      'Directory listing: sys_getdents64 and a user-side ls',
      'Kernel test framework: TEST_ASSERT/RUN_TEST gated by CONFIG_TEST',
      'syscalls: fcntl/clock_gettime (riscv64 ABI 113), readv/writev',
    ],
  },
]

export const changelog = [
  {
    version: 'v1.3',
    title: 'tmpfs and Writable EXT4 Illusion',
    date: '',
    highlights: [
      'Standalone tmpfs: in-memory inode model, directory ops (lookup/create/mkdir/unlink), file ops (read/write/truncate), mount at /tmp, and stat without disk backing.',
      'EXT4 writable illusion: overlay layer (kernel/fs/ext4fs/mix.c) with upper-first lookup, mirrored create/mkdir, copy-up on first write, whiteout-based unlink, and merged readdir.',
      'Regression coverage: tmpfs and overlay test suites pass; the EXT4 image stays byte-identical under all write paths.',
    ],
    additional: [
      'slab + kmalloc allocator: object caches with a general-purpose kmalloc (9 size classes); struct pipe, struct context, and exec argv migrated off page-granular kalloc.',
      'Copy-on-write fork: pages shared via PTE_COW with per-page refcounts; first write copies, kernel copyout into shared pages handled.',
      'Directory listing: sys_getdents64 for easyfs, ext4 readdir across extents, and a user-side ls.',
      'Kernel test framework: TEST_ASSERT/RUN_TEST macros gated by a CONFIG_TEST build flag; runner classified by root filesystem with busybox/lua/libctest groups.',
      'syscalls: fcntl/clock_gettime (riscv64 ABI number 113) and readv/writev iovec scatter-gather.',
      'Hardening: inode cache keyed on (dev, ino), VMA coverage in copyin/copyout, exec stack and auxv fixes, spurious external interrupt root-caused and fixed, virtio feature negotiation aligned with xv6.',
    ],
    validation: [
      'python3 ./scripts/run_tests.py -t tmpfs --rootfs ext4 --fs-list "ext4 tmpfs devtmpfs" -T 20  ->  PASS',
      'python3 ./scripts/run_tests.py -t overlay --rootfs ext4 --fs-list "ext4 tmpfs devtmpfs" -T 20  ->  PASS',
      'Full ext4 suite: 16 PASS + 6 PASS_EXPECTED_LOG, including backend re-enabled with overlay semantics.',
    ],
  },
]

export const acknowledgments = [
  'In its early development stages, FrostVista OS drew significant inspiration from the xv6 operating system developed by MIT.',
  'We thank the xv6 authors for their clear, educational implementation of Unix-like kernel concepts, which laid the foundation for our understanding of file systems, process management, and device drivers.',
  'The xv6 source code and accompanying textbook (https://pdos.csail.mit.edu/6.828/2023/xv6.html) served as a primary reference throughout the initial design and implementation of FrostVista.',
]
