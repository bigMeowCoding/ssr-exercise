import { renderToString } from "vue/server-renderer";
import { createSSRApp } from "vue";
import App from "./app.vue";
import { createRouter } from "./router.js";
import {createPinia} from "pinia";

export async function render(url, manifest) {
  const app = createSSRApp(App);
  app.use(createRouter());
  app.use(createPinia())
  const ctx = {};
  const html = await renderToString(app, ctx);
  return [html];
}
