import { defineConfig } from 'vite';
import Inspect from "vite-plugin-inspect";

export default defineConfig({
  plugins: [Inspect()],

  base: '/todos-app'
})
