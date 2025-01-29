import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-swr';

// TODO - support callback
export const useUpdateUser = () => {
  const { supabase: accessSupabase } = useSupabase<'access'>('access');
  return useUpdateMutation(accessSupabase.from('User'), ['id'], 'id', undefined);
};
