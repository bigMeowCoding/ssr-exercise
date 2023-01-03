<script setup></script>

<template>
  <p class="flex ">
    <router-link class="flex-1 !text-blue-500" to="/">Go to Home</router-link>
    <router-link class="flex-1 text-blue-500" to="/about">Go to About</router-link>
    <router-link class="flex-1 text-blue-500" to="/store">Go to store</router-link>
  </p>
  <router-view />
</template>
<style>
@import "./common/styles/tailwind.css";
</style>
