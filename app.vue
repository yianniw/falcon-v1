<script setup lang="ts">
  // TODO: useLocalStorage for theme
  document?.documentElement.setAttribute('data-theme', 'dark');
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped>
</style>