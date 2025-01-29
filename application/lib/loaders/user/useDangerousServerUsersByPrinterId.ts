import { getUsersByPrinterId } from './getUserByPrinterId';
import { useServerSupabaseData } from '@/submodules/supabase-functions/lib/supabase-server';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';

export const useDangerousServerUsersByPrinterId = (printerId?: string) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'access'>('access');
  return useServerSupabaseData(getUsersByPrinterId(supabase, printerId));
};
