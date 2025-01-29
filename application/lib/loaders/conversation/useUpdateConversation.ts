import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-swr';

// TODO - support callback
export const useUpdateConversation = () => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useUpdateMutation(publicSupabase.from('Conversation'), ['id'], 'id', undefined);
};
