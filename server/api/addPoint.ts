import { serverSupabaseServiceRole } from '#supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event): Promise<User> => {
  const body = await readBody(event);
  const client = serverSupabaseServiceRole(event);

  const calleeResult = await client.from('admins')
    .select()
    .eq('user_id', body.callee)
    .maybeSingle();
  if(!calleeResult.data) throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
    
  const userResult = await client.from('users')
    .select()
    .eq('user_id', body.user_id)
    .maybeSingle();
  if(!userResult.data) throw createError({ statusCode: 404, statusMessage: 'User Not Found' });

  const user: User = userResult.data;
  const callee: Admin = calleeResult.data;

  return await addPoint(user.user_id, callee.user_id, client);
});

async function addPoint(user_id: string, callee_id: string, client: SupabaseClient): Promise<User> {
  await client.from('points')
    .insert({
      user_id: user_id,
      issued_by: callee_id,
      created_at: new Date().toISOString()
    });

  const updatedUser = await client.from('users')
    .select()
    .eq('user_id', user_id)
    .maybeSingle();

  return updatedUser.data;
}