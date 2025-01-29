'use client';

import { getSecondaryContacts } from './getSecondaryContacts';
import { getUserOrgIDs } from '@/submodules/supabase-functions/auth/getUserOrgIDs';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useQuery } from '@supabase-cache-helpers/postgrest-swr';

export const useClientSecondaryContacts = () => {
  const { supabase: accessSupabase, session } = useSupabase<'access'>('access');
  const orgIDs = getUserOrgIDs(session);
  return useQuery(getSecondaryContacts(accessSupabase, orgIDs));
};
