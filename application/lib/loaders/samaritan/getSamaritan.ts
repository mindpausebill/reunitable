import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const getSamaritan = (supabase: SupabaseClient<Database, 'public'>, samaritanID: string) => {
  return supabase
    .from('Samaritan')
    .select('id,name,createdAt,createdById,modifiedAt,modifiedById,email,phone')
    .eq('id', samaritanID)
    .maybeSingle();
};
