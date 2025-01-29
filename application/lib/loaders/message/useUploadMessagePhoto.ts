import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useUpload } from '@supabase-cache-helpers/storage-swr';

export const useUploadMessagePhoto = () => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  return useUpload(publicSupabase.storage.from('filebucket'));
};
