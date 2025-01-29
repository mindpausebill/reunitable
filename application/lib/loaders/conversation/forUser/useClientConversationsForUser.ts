'use client';

import { getConversationsForUser } from './getConversationsForUser';
import { getUserOrgIDs } from '@/submodules/supabase-functions/auth/getUserOrgIDs';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useQuery } from '@supabase-cache-helpers/postgrest-swr';

export const useClientConversationsForUser = () => {
  const { supabase: publicSupabase, session } = useSupabase<'public'>('public');
  const orgIDs = getUserOrgIDs(session);
  return useQuery(getConversationsForUser(publicSupabase, orgIDs));
};
