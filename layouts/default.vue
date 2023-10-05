<template>
  <div class="app-container">
    <topnavbar></topnavbar>
    <slot />
  </div>
</template>

<script setup>
import topnavbar from "~/components/topnavbar.vue";
</script>

<style scoped>
.app-container {
  background: #faf4f0;
  color: #000000;
  font-size: 32px;
  height: calc(100vh);
}
</style>
