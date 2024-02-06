import { serverSupabaseServiceRole } from '#supabase/server'
import { SupabaseClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseServiceRole(event);

  const { data, error } = await addUserToDb(body.id, client);

  return data;
});

async function addUserToDb(user_id: string, client: SupabaseClient) {
  const result = await client.from('users')
    .insert({
      user_id: user_id,
      created_at: new Date().toISOString()
    })
    .select()
    .single()
  return result;
}