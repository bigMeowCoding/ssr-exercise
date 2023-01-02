import { renderToString } from "vue/server-renderer";
import { createSSRApp  } from "vue";
import App from "./components/app.vue";


export async function render(url, manifest) {
  const app = createSSRApp(App);

  const ctx = {};
  const html = await renderToString(app, ctx);
  return [html];
}
