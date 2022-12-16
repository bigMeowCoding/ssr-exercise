import { createSSRApp  } from "vue";
import App from "./components/app.vue";

export default function createApp() {
  return createSSRApp(App);
}
