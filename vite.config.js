import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        // মেইন সার্ভার
        '/erp': {
          target: env.VITE_ERP_URL_MAIN,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/erp/, '/erp')
        },
        // ব্যাকআপ সার্ভার
        '/erp-backup': {
          target: env.VITE_ERP_URL_BACKUP,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/erp-backup/, '/erp')
        }
      }
    }
  }
})
