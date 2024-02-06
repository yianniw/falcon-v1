<script setup lang="ts">
// https://loading.io/css/
</script>

<template>
  <div class="lds-dual-ring" />
</template>

<style scoped>
.lds-dual-ring {
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  --spinner-color: var(--text);
  --spinner-size: 64px;
  content: " ";
  display: block;
  width: var(--spinner-size);
  height: var(--spinner-size);
  /* margin: 8px; */
  border-radius: 50%;
  border: 6px solid var(--spinner-color);
  border-color: var(--spinner-color) transparent var(--spinner-color) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>