'use client';

import { getConversationsForSamaritan } from './getConversationsForSamaritan';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useQuery } from '@supabase-cache-helpers/postgrest-swr';

export const useClientConversationsForSamaritan = (samaritanID: string, customerOrgID: string) => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useQuery(samaritanID === '' ? null : getConversationsForSamaritan(publicSupabase, samaritanID, customerOrgID));
};
