import { createApp as creatA } from "vue";

export default function createApp() {
  return creatA({
    data: () => ({ count: 1 }),
    template: `<div @click="count++">{{ count }}</div>`,
  });
}
