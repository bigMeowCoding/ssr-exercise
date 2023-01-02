import { createSSRApp } from "vue/dist/vue.esm-bundler";
import App from "./components/app.vue";
import { createRouter } from "./router.js";

function createApp() {
  const app = createSSRApp(App);
  app.use(createRouter());
  return app;
}

createApp().mount("#app");
