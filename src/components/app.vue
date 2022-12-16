<template>
  <div>
    App
  </div></template
>

<script>
export default {
  name: "App",
  created() {
    fetch("http://localhost:3333/test").then((e) => {
      console.log('res',e);
    });
  },
};
</script>

<style scoped></style>
