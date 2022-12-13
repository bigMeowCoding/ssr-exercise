import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const isDev = process.env.NODE_ENV === "development";
const alias = {};
// alias.vue = "vue/dist/vue.esm-bundler.js";

if (isDev) {
  // alias.vue = "vue/dist/vue.esm-bundler.js";
} else {
  // alias.vue = require.resolve("vue/dist/vue.esm-bundler.js");
}
export default defineConfig({
  plugins: [vue()],
  runtimeCompiler: true,

  resolve: {
    alias,
  },
});
