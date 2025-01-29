import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-swr';

// TODO - support callback
export const useUpdateMessage = () => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useUpdateMutation(publicSupabase.from('Message'), ['id'], 'id', undefined);
};
