<template>
  <div>
    App
  </div></template
>

<script>
import request from "umi-request";

export default {
  name: "App",
  mounted() {
    request
      .post("/api3/test")
      .then((e) => {
        console.log("res", e);
      })
      .catch((e) => {
        console.error(e);
      });
    request
        .post("/api3/hello")
        .then((e) => {
          console.log("res", e);
        })
        .catch((e) => {
          console.error(e);
        });
  },
};
</script>

<style scoped></style>
