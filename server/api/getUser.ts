import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseServiceRole(event);

  const { data, error} = await client.from('users')
    .select()
    .eq('user_id', body.id)
    .maybeSingle();

  return data;
});