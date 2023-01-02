import { renderToString } from "vue/server-renderer";
import { createSSRApp } from "vue";
import App from "./components/app.vue";
import { createRouter } from "./router.js";

export async function render(url, manifest) {
  const app = createSSRApp(App);
  app.use(createRouter());
  const ctx = {};
  const html = await renderToString(app, ctx);
  return [html];
}
