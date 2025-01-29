import { getOrgForUserRole } from './getOrgForUserRole';
import {
  useServerSupabaseData
} from '@/submodules/supabase-functions/lib/supabase-server';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';

export const useDangerousServerOrgForUserRole = (userId: string, roleName: string) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'access'>('access');
  return useServerSupabaseData(getOrgForUserRole(supabase, userId, roleName));
};
