import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseServiceRole(event);

  const { data, error } = await client.from('admins')
    .select()
    .eq('user_id', body.user_id)
    .maybeSingle();

  return !!data;
});