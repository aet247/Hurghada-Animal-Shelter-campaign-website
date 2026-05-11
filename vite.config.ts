import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Note: .md files are imported as raw strings via import.meta.glob with
  // query: '?raw' — do NOT add assetsInclude for .md here, it would
  // make Vite treat them as static URL assets and break the raw import.
})
