import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed under the /frostvista-os-site/ subpath on GitHub Pages.
const base = process.env.PAGES_BASE || '/frostvista-os-site/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
