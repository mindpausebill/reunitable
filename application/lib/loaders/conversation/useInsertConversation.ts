import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-swr';

// TODO - support callback
export const useInsertConversation = () => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useInsertMutation(publicSupabase.from('Conversation'), ['id'], 'id', undefined);
};
