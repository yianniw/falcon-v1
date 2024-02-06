<script setup lang="ts">
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_overlay2
defineProps(['show']);
defineEmits(['hide']);
</script>

<template>
  <div class="overlay" :style="{ height: `${show ? '100%' : '0%'}` }">
    <div class="navbar">
      <div class="item menu-button" @click="$emit('hide');">
        <Icon name="charm:menu-hamburger" size="48px"/>
      </div>
    </div>
    <div class="overlay-content">
      <a href="#">about</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
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

.menu-button {
  cursor: pointer;
  margin-left: auto;
}

.overlay {
  height: 0%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0, 0.9);
  overflow-y: hidden;
  transition: 0.5s;
}

.overlay-content {
  position: relative;
  top: 25%;
  width: 100%;
  text-align: center;
  margin-top: 30px;
}

.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.overlay a:hover, .overlay a:focus {
  color: #f1f1f1;
}

.overlay .closebtn {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
}

@media screen and (max-height: 450px) {
  .overlay {overflow-y: auto;}
  .overlay a {font-size: 20px}
  
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
}
</style>