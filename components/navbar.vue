<script setup lang="ts">
// TODO: disable buttons at '/login' route
</script>

<template>
  <div class="navbar">
    <div class="item home-button">
      <NuxtLink to="/">
        <Icon name="charm:home" size="48px"/>
      </NuxtLink>
    </div>
    <div class="item title">title</div>
    <div class="item menu-button">
      <Icon name="charm:menu-hamburger" size="48px"/>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
}

a {
  color: var(--text);
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 8px;
  user-select: none;
}

.title {
  font-size: 32px;
  margin-inline: auto;
}
</style>