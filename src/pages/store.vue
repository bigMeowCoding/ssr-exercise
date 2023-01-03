<template>
  <div class="flex flex-col justify-center">
    <show />
    <add />
    <min />
  </div>

</template>

<script>
import Show from "../components/show.vue";
import Add from "../components/add.vue";
import Min from "../components/min.vue";

export default {
  name: "store",
  components: { Min, Add, Show },
};
</script>

<style scoped></style>
