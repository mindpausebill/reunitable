import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const getUsersByPrinterId = (supabase: SupabaseClient<Database, 'access'>, printerId?: string) => {
  let query = supabase.from('User').select();
  if (printerId) {
    query = query.eq('metadata->printerId', `"${printerId}"`);
  }
  return query;
};
