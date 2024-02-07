<script setup lang="ts">
const user = ref();

onMounted(async () => {
  const { auth } = useSupabaseClient();
  const { data } = await auth.getUser();

  if(!data?.user) return;

  const dbUser =
    await $fetch('/api/getUser', { method: 'POST', body: { id: data.user.id } }) ||
    await $fetch('/api/createUser', { method: 'POST', body: { id: data.user.id } });

  user.value = dbUser;

  useAuth().value = await $fetch('/api/checkUserAuth', {
    method: 'POST',
    body: { id: data.user.id }
  });
  console.log(user.value, 'admin =', useAuth().value);
});
</script>

<template>
  <div class="page test">
    <MemberCard v-if="user" :user="user" />
  </div>
</template>

<style scoped>
.page {

}
</style>