<script setup lang="ts">
const { auth } = useSupabaseClient();
const email = ref();
const password = ref();
const loginError = ref();

async function login() {
  const { data, error } = await auth.signInWithPassword({
    email: email.value,
    password: password.value
  });
  if(error) {
    loginError.value = "Error: Invalid Login"
    console.log(error);
    return;
  }
  console.log(data);
}
</script>

<template>
  <div>
    <input v-model="email" />
    <br />
    <input v-model="password" />
    <br />
    <button @click="login()">Login</button>
    <br />
    <span v-if="loginError">{{ loginError }}</span>
  </div>
</template>

<style scoped>

</style>