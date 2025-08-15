import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue()],
  // 如果需要JSX支持
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})