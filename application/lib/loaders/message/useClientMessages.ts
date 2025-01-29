'use client';

import { getMessages } from './getMessages';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useQuery } from '@supabase-cache-helpers/postgrest-swr';

export const useClientMessages = (conversationId: string) => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useQuery(getMessages(publicSupabase, conversationId));
};
