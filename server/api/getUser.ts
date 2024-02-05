import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await readBody(event);
  const client = serverSupabaseServiceRole(event);

  const { data, error} = await client.from('users')
    .select()
    .eq('user_id', user.id)
    .maybeSingle();

  return data;
});