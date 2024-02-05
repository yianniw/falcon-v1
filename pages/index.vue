<script setup lang="ts">
const { auth } = useSupabaseClient();
const user = ref();

onMounted(async () => {
  const sessionResult = await auth.getSession();
  if(!sessionResult.data.session) return;
  const user_id = sessionResult.data.session.user.id;

  let data = await $fetch('/api/getUser', { method: 'POST', body: { id: user_id } });
  if(!data) {
    data = await $fetch('/api/createUser', { method: 'POST', body: { id: user_id } });
  }
  user.value = data;
});

async function logout() {
  const { error } = await auth.signOut();
  await navigateTo('/login');
}
</script>

<template>
  <div class="page">
    test
    <br />
    <button @click="logout()">Logout</button>
  </div>
</template>

<style scoped>
.page {
  background-color: red;
}
</style>