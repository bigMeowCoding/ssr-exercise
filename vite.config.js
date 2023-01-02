import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import requireTransform from 'vite-plugin-require-transform';
const base = '/test/'

export default defineConfig({
  base,
  plugins: [vue(), requireTransform.default({})],
});
