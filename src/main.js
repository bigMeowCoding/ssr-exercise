import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp({
  data: () => ({ count: 1 }),
  template: `<div @click="count++">{{ count }}</div>`,
}).mount("#app");
