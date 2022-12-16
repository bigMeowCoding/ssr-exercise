import { createSSRApp } from "vue";

import App from "./src/components/app.vue";

export function createApp() {
  return createSSRApp(App);
}
