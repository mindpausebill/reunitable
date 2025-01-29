import { getUsers } from './getUsers';
import { createSupabaseServerClient, useServerSupabaseData } from '@/submodules/supabase-functions/lib/supabase-server';

export const useServerUsers = (userId?: string) => {
  const supabase = createSupabaseServerClient<'access'>('access');
  return useServerSupabaseData(getUsers(supabase, userId));
};
