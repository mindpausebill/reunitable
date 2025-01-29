import { getSecondaryContacts } from './getSecondaryContacts';
import { getUserOrgIDs } from '@/submodules/supabase-functions/auth/getUserOrgIDs';
import {
  createSupabaseServerClient,
  useServerSupabaseData,
  useServerSupabaseSession
} from '@/submodules/supabase-functions/lib/supabase-server';

export const useServerSecondaryContacts = () => {
  const accessSupabase = createSupabaseServerClient<'access'>('access');
  const orgIDs = getUserOrgIDs(useServerSupabaseSession());
  return useServerSupabaseData(getSecondaryContacts(accessSupabase, orgIDs));
};
