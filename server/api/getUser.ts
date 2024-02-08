import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event): Promise<User | null> => {
  const body = await readBody(event);
  const client = serverSupabaseServiceRole(event);

  const userResult = await client.from('users')
    .select()
    .eq('user_id', body.user_id)
    .maybeSingle();
  if(!userResult.data) return null;

  const pointsResult = await client.from('points')
    .select('*', { count: 'exact' })
    .eq('user_id', body.user_id);

  const user: User = userResult.data;
  user.points = pointsResult.count || 0;
    
  return user;
});