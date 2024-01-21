import {defineConfig, loadEnv} from 'vite'
import {fileURLToPath} from 'url'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

function destination(path: string): string {
    return fileURLToPath(new URL(`./${path}`, import.meta.url))
}

export default defineConfig(({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return {
        plugins: [vue()],
        logLevel: 'info',
        resolve: {
            alias: [
                {find: '@', replacement: destination('src')},
                {find: '@assets', replacement: destination('src/assets')},
                {find: '@components', replacement: destination('src/components')},
                {find: '@directives', replacement: destination('src/directives')},
                {find: '@enums', replacement: destination('src/enums')},
                {find: '@models', replacement: destination('src/models')},
                {find: '@router', replacement: destination('src/router')},
                {find: '@stores', replacement: destination('src/stores')},
                {find: '@views', replacement: destination('src/views')},
            ]
        },
        server: {
            port: 4000,
            open: true,
            cors: true,
            strictPort: true,
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            },
            build: {
                outDir: './dist',
                assetsDir: './src',
            }
        },

    }
})

