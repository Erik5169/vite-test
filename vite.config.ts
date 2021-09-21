/* eslint-disable prettier/prettier */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
import legacy from '@vitejs/plugin-legacy'
const path = require('path');
function resolve(dir: string) {
  return path.join(__dirname, dir);
}
// https://vitejs.dev/config/
// https://github.com/vitejs/vite/issues/1930 .env
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      // additionalLegacyPolyfills: ['es/globalThis'],
      targets: ['defaults', 'not IE 11']
    }),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => `vant/es/${name}/style`
        }
      ]
    })
  ],
  server: {
    host: true,
    port: 8000,
    // proxy: createProxy(VITE_PROXY)
    proxy: {
      '/api': {
        target: 'http://api-test.xiaokaqianbao.com/jnis-user',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/upload': {
        target: 'http://api-test.xiaokaqianbao.com/jnis-back',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/upload/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@assets': resolve('./src/assets'),
      '@components': resolve('./src/components'),
      '@store': resolve('./src/store'),
      '@views': resolve('./src/views'),
      '@types': resolve('./src/types'),
      '@api': resolve('./src/api')
    }
  },
  build: {
    rollupOptions: {
      plugins: [],
    },
    target: 'es2015',    
    brotliSize: false, 
    chunkSizeWarningLimit: 2000,
  },
});
