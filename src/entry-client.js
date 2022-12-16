import { createSSRApp } from "vue/dist/vue.esm-bundler";
import app from "./components/app.vue";

function createApp() {
  return createSSRApp(app);
}

createApp().mount("#app");
