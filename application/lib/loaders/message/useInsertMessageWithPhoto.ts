import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useInsertWithFilesMutation } from '@/submodules/supabase-functions/lib/fileUploadHooks/useInsertWithFilesMutation';

export const useInsertMessageWithPhoto = () => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');

  return useInsertWithFilesMutation(
    publicSupabase.from('Message'),
    publicSupabase.storage.from('filebucket'),
    ['id'],
    'id, createdAt, modifiedAt, conversationId, createdById, modifiedById, latitude, longitude, location, message, fromSamaritan, read, photo'
  );
};
