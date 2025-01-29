import { getUsers } from './getUsers';
import {
  useServerSupabaseData
} from '@/submodules/supabase-functions/lib/supabase-server';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';

export const useDangerousServerUsers = (userId?: string) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'access'>('access');
  return useServerSupabaseData(getUsers(supabase, userId));
};
