export const site = {
  name: 'FrostVista OS',
  cnName: '霜见内核',
  tagline: 'A compact RISC-V 64 (Sv39) kernel',
  repo: 'https://github.com/AuroBreeze/FrostVistaOS',
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
  {
    version: 'v1.2',
    title: 'The Consolidation & Understanding Declaration',
    summary:
      'Not a feature milestone — a declaration of intent. v1.2 ends the contest-era push and begins an open-ended maintenance period: re-read what was written in haste, correct what is wrong, remove what exists only to pass a test, and write down what was left implicit.',
    points: [
      'Retire contest-era shortcuts: paths added only for the evaluator are rebuilt or removed',
      'Close open workarounds, including the spurious S-mode external interrupt root-cause',
      'Audit for correctness, not just behavior: lock contracts, error paths, lifetimes, VMA semantics',
      'Write for the reader, not the grader: the kernel should read as a learning artifact',
    ],
  },
  {
    version: 'v1.1',
    title: 'Virtual Memory Semantics & mmap Milestone',
    summary:
      'Makes the user address space model explicit and extensible: VMA tracking, anonymous mmap, munmap, lazy page-fault allocation, and minimal file-backed mappings — a clean VM foundation for future libc, loader, and process work.',
    points: [
      'VMA records per process with range/overlap helpers and lifecycle boundaries across fork/exec/exit',
      'Six-argument mmap ABI wired end-to-end: sys_mmap -> do_mmap, anonymous private mappings',
      'Lazy allocation: touched anonymous VMA pages allocated and zero-filled on demand',
      'munmap: whole-VMA unmap, edge trimming, safe PTE teardown, middle splits deferred',
      'fork copies VMA metadata and materialized pages while keeping lazy ranges lazy',
      'File-backed private read-only mappings with held file references',
      'Validation: mmap, mmap_lazy, mmap_exit, mmap_fork, mmap_file all PASS',
    ],
  },
  {
    version: 'v1.0',
    title: 'Interactive Shell Milestone',
    summary:
      'Turns FrostVista from a test-driven kernel into a small interactive Unix-style environment: fork, exec, wait, pipes, and devtmpfs-backed console I/O come together in the first FrostVista shell (fvsh).',
    points: [
      'fvsh as a user program: prompt, line input, command dispatch, clean exit',
      'Built-ins: help, exit, pwd, cd with visible failure reporting',
      'External execution: fork -> exec -> wait for foreground programs, stdio preserved across exec',
      'Redirection (cmd > file, cmd < file) via open/close/dup3 and one pipeline cmd1 | cmd2',
      'Scripted shell tests: test_fvsh_script feeds commands from an array',
    ],
  },
  {
    version: 'v0.9',
    title: 'Easy-FS Completion & Writable VFS Milestone',
    summary:
      'Makes the local Easy-FS backend a reliable writable filesystem, and exceeds scope by adding single-indirect and double-indirect block mapping for large files. EXT4 stays the read-only contest image path.',
    points: [
      'VFS write contract: open flags, file offset rules, backend capability separation',
      'Easy-FS file writes: create, write, append, truncate, cross-block writes',
      'Directory ops: safe dirent allocation, unlink, mkdir, hardened path edges',
      'Persistence tests: reopen-after-close, multi-file allocation, truncate/append, unlink',
      'Final inode layout: 10 direct + single-indirect + double-indirect slots in 64-byte inode',
      'Expanded test suite: open, easyfs_maxfile, indirect, double_indirect, itrunc, unlink, mkdir',
    ],
  },
  {
    version: 'v0.8',
    title: 'Pipe & Unix IPC Milestone',
    summary:
      'The first real Unix-style IPC path, centered on anonymous pipes — and the file descriptor, file object, blocking I/O, and process lifecycle behavior that pipes require.',
    points: [
      'File object dispatch: descriptors can refer to VFS nodes or pipe endpoints',
      'Bounded in-kernel ring buffer with blocking reads/writes via scheduler sleep/wakeup',
      'EOF and broken-pipe handling when endpoints disappear',
      'pipe2 syscall with safe failure rollback on partial allocation',
      'fork inheritance, close/dup lifetime extension, wait/exit preservation',
      'Full-buffer wakeup test plus endpoint lifecycle coverage',
    ],
  },
  {
    version: 'v0.7',
    title: 'Filesystem Architecture & Device Model Milestone',
    summary:
      'Architectural milestone: separates generic VFS behavior from filesystem-specific details, introduces devtmpfs as a real device filesystem, and retires the temporary mock /dev/tty path.',
    points: [
      'VFS boundary cleanup: traversal, fd dispatch, mount points stay generic; backends behind op tables',
      'Easy-FS self-contained; EXT4 formalized as a read-only backend',
      'devtmpfs introduced; /dev/tty becomes a real device node via normal pathname lookup',
      'Root filesystem and /dev may come from different backends; boot paths preserved',
    ],
  },
  {
    version: 'v0.6',
    title: 'Contest Bootstrapping Milestone',
    summary:
      'Boots the kernel in the contest evaluator: OpenSBI S-mode entry, read-only EXT4 reader, ELF loading from the contest disk, a serial contest runner, and syscall fill driven by failing tests.',
    points: [
      'OpenSBI entry (-bios default -kernel kernel-rv) while keeping local -bios none dev boots',
      'Minimal read-only EXT4: superblock probe, group descriptors, root inode, extent reads',
      'Reader-based ELF loader feeding either Easy-FS or EXT4-backed files',
      'Serial contest runner with basic-musl markers and SBI SRST shutdown',
      'Syscall fill: brk, getpid, fork, wait, openat, dup3, and more; ABI numbers for later batches',
      'tp restoration for musl user TLS, kalloc_init access-fault fix, DRAM/kernel base split',
      'BusyBox reaches syscall dispatch to expose the next missing coverage',
    ],
  },
  {
    version: 'v0.5',
    title: 'The Cleanup & Consolidation Milestone',
    summary:
      'No new features — a pure quality milestone. Tears down development scaffolding, unifies the codebase under a single architecture, and eliminates magic numbers.',
    points: [
      'VFS debt tracking: mock tree scoped, deferred open() unification until devtmpfs',
      'Named constants replace magic numbers for FS layout, path buffers, syscall offsets, printf',
      'Code quality: typos, log-level audit, dead declarations removed, inode lifecycle fixes',
      'exec() cleanup hardening and Easy-FS inode cleanup hazard fixes',
      'Lock contracts and buffer cache ownership documented',
    ],
  },
  {
    version: 'v0.4',
    title: 'The File System & I/O Milestone',
    summary:
      'Breaks out of the memory island: a Virtual File System, VirtIO block driver with LRU buffer cache, and the Easy-FS backend — plus standard file descriptors and core Unix I/O syscalls.',
    points: [
      'VFS abstraction: generic inode/file/superblock; per-process fd table',
      'Core I/O syscalls: open, read, write, close, dup',
      'VirtIO block device driver with interrupt-driven async disk I/O',
      'LRU buffer cache with spinlock/sleeplock protected concurrent access',
      'Easy-FS: superblock, block bitmap, inode array, data blocks, directories, file mapping',
      'stdin/stdout/stderr linked to the UART console',
    ],
  },
  {
    version: 'v0.3',
    title: 'The Userland & Lifecycle Milestone',
    summary:
      'True Unix process semantics, ELF executable loading, dynamic user memory, and kernel concurrency protection — transforms FrostVista from a task switcher into an application host.',
    points: [
      'Process lifecycle: fork deep-copy, exit teardown to ZOMBIE, wait reaping, orphan reparenting',
      'ELF parser and sys_execve loader with .text/.data/.bss mapping and user stack init',
      'sys_sbrk heap expansion, memory accounting, lazy page-fault allocation',
      'Spinlocks via amoswap, push_off/pop_off interrupt control, sleep & wakeup primitives',
    ],
  },
  {
    version: 'v0.2',
    title: 'The Architecture & Process Milestone',
    summary:
      'Architectural decoupling, multitasking, and the user/supervisor bridge: hardware abstraction, syscall infrastructure, the process control block, and preemptive scheduling.',
    points: [
      'HAL decouples generic logic from RISC-V specifics; kernel/ and arch/riscv/ split',
      'Syscall dispatcher via ecall and a7 routing; first true syscall sys_write',
      'struct Process PCB: state, PID, page tables, kernel stacks; context isolation via Trapframes',
      'Timer interrupts finalized, swtch.S context switcher, round-robin scheduler',
    ],
  },
  {
    version: 'v0.1',
    title: 'The Memory Milestone',
    summary:
      'Self-hosted memory management foundation: UART serial output, Sv39 three-level paging, the higher-half kernel mapping leap of faith, and the first privilege drop to user mode.',
    points: [
      'UART driver for serial logging; bump-pointer boot allocator (ekalloc)',
      'Sv39 paging fully implemented; kernel mapped to 0xFFFFFFC080000000',
      'The leap of faith: deterministic transition from physical PC to high-virtual PC',
      'Identity mapping destroyed after boot; memory semantics annotated across core functions',
      'Mini user mode: first S -> U privilege drop; UART interrupts enabled',
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
