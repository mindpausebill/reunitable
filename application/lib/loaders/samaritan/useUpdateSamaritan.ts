import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-swr';

// TODO - support callback
export const useUpdateSamaritan = () => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useUpdateMutation(publicSupabase.from('Samaritan'), ['id'], 'id', undefined);
};
