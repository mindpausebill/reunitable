import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const getOrgForUserRole = (supabase: SupabaseClient<Database, 'access'>, userId: string, roleName: string) => {
  return supabase
    .from('UserOrganisationRole')
    .select('*, UserOrganisation!inner(*), Role!inner(*)')
    .eq('Role.name', roleName)
    .eq('UserOrganisation.userId', userId);
};
