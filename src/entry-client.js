import { createSSRApp } from "vue/dist/vue.esm-bundler";
import { createRouter } from "./router.js";
import App from "./App.vue";
import {createPinia} from "pinia";
function createApp() {
  const app = createSSRApp(App);
  app.use(createRouter());
  app.use(createPinia())
  return app;
}

createApp().mount("#app");
