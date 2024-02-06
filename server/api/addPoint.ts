import { serverSupabaseServiceRole } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseServiceRole(event);

  const callee = await client.from('admins')
    .select()
    .eq('user_id', body.callee)
    .maybeSingle();
  if(!callee.data) throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
    
  const user = await client.from('users')
    .select()
    .eq('user_id', body.id)
    .maybeSingle();
  if(!user.data) throw createError({ statusCode: 404, statusMessage: 'User Not Found' });
  
  const userResult = await addPoint(user.data, client);
  return userResult;
});

async function addPoint(user: any, client: SupabaseClient) {
  const { data, error } = await client.from('users')
    .update({ points: user.points + 1 })
    .eq('user_id', user.user_id)
    .select()
    .maybeSingle();
  return data;
}