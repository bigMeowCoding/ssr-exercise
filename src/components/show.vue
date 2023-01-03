<template>
  <p>{{ counter.count }}</p>
</template>

<script>
import { useCounter } from "../common/hooks/use-counter.js";

export default {
  name: "show",
  setup() {
    const counter = useCounter();
    return { counter };
  },
};
</script>

<style scoped></style>
