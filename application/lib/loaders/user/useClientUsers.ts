'use client';

import { getUsers } from './getUsers';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useQuery } from '@supabase-cache-helpers/postgrest-swr';

export const useClientUsers = (userId?: string) => {
  const { supabase: accessSupabase } = useSupabase<'access'>('access');
  return useQuery(getUsers(accessSupabase, userId));
};
