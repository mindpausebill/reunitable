import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const getUsers = (supabase: SupabaseClient<Database, 'access'>, userId?: string) => {
  let query = supabase.from('User').select();
  if (userId) {
    query = query.eq('id', userId);
  }
  return query;
};
