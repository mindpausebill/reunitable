import { AdminConfig } from '../types/Config/AdminConfig';
import { useState, useEffect } from 'react';
import { getResources } from '../lib/getResources';
import { SupabaseResource } from '../types/SupabaseResource';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';

export const useResources = (config?: AdminConfig) => {
  const [resources, setResources] = useState<SupabaseResource[]>([]);
  const { supabase } = useSupabase<'public'>();

  useEffect(() => {
    const fetchResources = async () => {
      const fetchedResources = await getResources(supabase, config?.schemas);
      setResources(fetchedResources.filter((r) => r.name !== '_prisma_migrations'));
    };
    fetchResources();
  }, []);

  return resources;
};
