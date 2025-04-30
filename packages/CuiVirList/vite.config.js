import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
    plugins: [react()],
    root: './',
    server: {
        proxy: {
            '/api': {
                target: 'https://api.pexels.com/v1',
                changeOrigin: true
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    },
});
