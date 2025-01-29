import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-swr';

// TODO - support callback
export const useInsertSamaritan = () => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useInsertMutation(publicSupabase.from('Samaritan'), ['id'], 'id', undefined);
};
