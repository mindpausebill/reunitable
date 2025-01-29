import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const getSecondaryContacts = (supabase: SupabaseClient<Database, 'access'>, orgIDs: string[]) => {
  return supabase.from('UserOrganisation').select('*, User:userId(*)').in('organisationId', orgIDs);
};
