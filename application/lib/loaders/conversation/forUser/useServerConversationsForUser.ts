import { getConversationsForUser } from './getConversationsForUser';
import { getUserOrgIDs } from '@/submodules/supabase-functions/auth/getUserOrgIDs';
import {
  createSupabaseServerClient,
  useServerSupabaseData,
  useServerSupabaseSession
} from '@/submodules/supabase-functions/lib/supabase-server';

export const useServerConversationsForUser = () => {
  const accessSupabase = createSupabaseServerClient<'public'>('public');
  const orgIDs = getUserOrgIDs(useServerSupabaseSession());
  return useServerSupabaseData(getConversationsForUser(accessSupabase, orgIDs));
};
