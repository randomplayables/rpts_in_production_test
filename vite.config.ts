import { defineConfig, ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  const serverConfig: {
    host: string;
    allowedHosts: string[];
    proxy?: Record<string, string | ProxyOptions>;
  } = {
    host: '0.0.0.0',
    allowedHosts: ['.loca.lt'],
  };

  if (!isProduction) {
    serverConfig.proxy = {
      '/api': {
        target: 'http://172.31.12.157:3000',
        changeOrigin: true,
      }
    };
  }

  const config: any = {
    plugins: [react()],
    server: serverConfig,
  };

  if (isProduction) {
    config.esbuild = { drop: ['console', 'debugger'] };
  }

  return config;
});