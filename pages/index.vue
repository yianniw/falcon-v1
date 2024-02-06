<script setup lang="ts">
const { auth } = useSupabaseClient();
const user = ref();

onMounted(async () => {
  const { data } = await auth.getUser();
  if(!data?.user) return;

  const dbUser =
    await $fetch('/api/getUser', { method: 'POST', body: { id: data.user.id } }) ||
    await $fetch('/api/createUser', { method: 'POST', body: { id: data.user.id } });

  user.value = dbUser;
  console.log(user.value);
});

async function logout() {
  const { error } = await auth.signOut();
  await navigateTo('/login');
}
</script>

<template>
  <div class="page">
    <QRCode v-if="user" :value="user.user_id" />
    <button @click="logout()">Logout</button>
    <NuxtLink to="/scan">scan</NuxtLink>
  </div>
</template>

<style scoped>
.page {
  background-color: red;
}
</style>