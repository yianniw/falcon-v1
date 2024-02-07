<script setup lang="ts">
defineProps(['user']);
</script>

<template>
  <div>
    <QRCode :value="user.user_id" />
  </div>
</template>

<style scoped>

</style>