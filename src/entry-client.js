import { createSSRApp } from "vue/dist/vue.esm-bundler";

function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<div @click="count++">{{ count }}</div>`,
  });
}

createApp().mount("#app");
