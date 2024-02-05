import { serverSupabaseServiceRole } from '#supabase/server'
import { SupabaseClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const user = await readBody(event);
  const client = serverSupabaseServiceRole(event);

  await addUserToDb(user.id, client);

  const { data, error } = await client.from('users')
    .select()
    .eq('user_id', user.id)
    .maybeSingle();

  return data;
});

async function addUserToDb(user_id: string, client: SupabaseClient) {
  await client.from('users')
    .insert({
      user_id: user_id,
      created_at: new Date().toISOString()
    });
}