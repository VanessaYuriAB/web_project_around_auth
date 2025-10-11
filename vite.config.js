import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      /*global __dirname*/
      /*eslint no-undef: "error"*/
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  base:
    mode === 'production'
      ? '/web_project_around_react/' // para GitHub Pages, npm run build e npm run preview
      : '/', // para desenvolvimento local (no npm run dev)
  build: {
    outDir: 'docs', // onde o Vite colocará os arquivos após o build (padrão é "dist",
    // mas para rodar no GitHub Pages sem deploy, há a opção de gerar a partir de docs, no próprio GitHub)
    assetsDir: 'assets', //subpasta onde vão os arquivos estáticos (JS, CSS, imagens etc.)
  },
}));
