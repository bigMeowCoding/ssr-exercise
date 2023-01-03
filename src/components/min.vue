<template>
  <button @click="counter.decrease">decrease</button>
</template>

<script>
import { useCounter } from "../common/hooks/use-counter.js";

export default {
  name: "min",
  setup() {
    const counter = useCounter();
    return { counter };
  },
};
</script>

<style scoped></style>
