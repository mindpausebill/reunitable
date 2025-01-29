'use client';

import { getSamaritan } from './getSamaritan';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useQuery } from '@supabase-cache-helpers/postgrest-swr';

export const useClientSamaritan = (samaritanId: string | null) => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useQuery(samaritanId ? getSamaritan(publicSupabase, samaritanId) : null);
};
