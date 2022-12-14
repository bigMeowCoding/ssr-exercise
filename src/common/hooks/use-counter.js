import { defineStore } from "pinia";

export const useCounter = defineStore("counter", {
  state: () => {
    return { count: 0 };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
    decrease() {
      this.count--;
    },
  },
});
