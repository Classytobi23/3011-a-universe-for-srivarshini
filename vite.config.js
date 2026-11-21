import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages uses the repository name as base URL subpath
const repoName = '3011-a-universe-for-srivarshini';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' || process.env.NODE_ENV === 'production'
    ? `/${repoName}/`
    : '/',
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000
  }
}));
