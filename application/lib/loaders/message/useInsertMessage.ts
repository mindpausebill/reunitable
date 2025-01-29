import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-swr';

// TODO - support callback
export const useInsertMessage = () => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useInsertMutation(publicSupabase.from('Message'), ['id'], 'id', undefined);
};
