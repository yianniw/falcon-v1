export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data } = await useSupabaseClient().auth.getUser();
  if(!data?.user) return navigateTo('/');

  const userAuth = await $fetch('/api/checkUserAuth', {
    method: 'POST',
    body: { user_id: data.user.id }
  });
  if(!userAuth) return navigateTo('/');
  
  useAuth().value = true;
});