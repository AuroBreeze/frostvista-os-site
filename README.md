# FrostVista OS — Official Website

A multi-page marketing site for [FrostVista OS](https://github.com/), a compact RISC-V 64 (Sv39) kernel.

Built with Vite + React (react-router-dom), styled as a tactical CRT-terminal interface: monospace-dominant, zero border radius, hazard-red accent, scanline + grain overlays.

## Pages

- `/` — Hero with boot log, capabilities, philosophy, boot sequence
- `/docs` — Project layout, build & run in QEMU, fvsh shell, automated tests
- `/roadmap` — Current (v1.4 signals) and past milestones
- `/changelog` — Release notes
- `/community` — Discord, source, acknowledgments, GPL-3.0 license

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run lint    # oxlint
npm run preview # serve the production build
```

Content lives in `src/data/content.js`, sourced from the kernel repo's README / releases.md / CHANGELOG.md.
