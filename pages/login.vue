<script setup lang="ts">
const user = useSupabaseUser();

const currentView = ref('login');

watchEffect(async () => {
  if(user.value) {
    await navigateTo('/');
  }
})

// user.value = await supabase.auth.getUser();
</script>

<template>
  <div>
    <Login v-if="currentView === 'login'"/>
    <Register v-if="currentView === 'register'"/>
  </div>
</template>

<style scoped>
:deep(input) {
  border: 3px solid green;
}
</style>