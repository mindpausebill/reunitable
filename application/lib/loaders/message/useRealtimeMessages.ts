import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useSubscription } from '@supabase-cache-helpers/postgrest-swr';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export const useRealtimeMessages = (
  conversationId: string,
  callback?: (event: RealtimePostgresChangesPayload<Record<string, unknown>>) => void | Promise<void>
) => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useSubscription(
    publicSupabase,
    `public:Message:conversationId=eq.${conversationId}`,
    {
      event: '*',
      table: 'Message',
      schema: 'public',
      filter: `conversationId=eq.${conversationId}`
    },
    ['id'],
    { callback: callback }
  );
};
