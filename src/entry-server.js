import { renderToString } from "vue/server-renderer";
import createApp from "./app.js";

export async function render(url, manifest) {
  const app = createApp();

  const ctx = {};
  const html = await renderToString(app, ctx);
  return [html];
}
