<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref();
const password = ref();
const signUpError = ref();

async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  });

  if(error) {
    signUpError.value = "error"
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
    <button @click="signUp()">Sign up</button>
    <br />
    <span v-if="signUpError">{{ signUpError }}</span>
  </div>
</template>

<style scoped>

</style>