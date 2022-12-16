import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import requireTransform from 'vite-plugin-require-transform';

export default defineConfig({
  plugins: [vue(), requireTransform.default({})],
});
