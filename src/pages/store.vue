<template>
  <p>{{ counter.count }}</p>
  <button @click="counter.increment">increment</button>
</template>

<script>
import { useCounter } from "../common/hooks/use-counter.js";

export default {
  name: "store",
  setup() {
    const counter = useCounter();
    return { counter };
  },
};
</script>

<style scoped></style>
