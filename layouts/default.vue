<template>
  <div>
    <Navbar class="navbar"/>
    <div class="page-wrapper">
      <slot />
    </div>
    
  </div>
</template>

<style scoped>
.page-wrapper {
  margin-top: 16px;
  margin-inline: auto;
  width: 95vw;
}
.navbar {
  width: 100%;
  background-color: var(--secondary);
  box-shadow: var(--box-shadow);
}
</style>