import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const getMessages = (supabase: SupabaseClient<Database, 'public'>, conversationId: string) => {
  return supabase
    .from('Message')
    .select(
      'id, conversationId, createdById, modifiedById, latitude,longitude,location,message,photo,fromSamaritan,read,createdAt,modifiedAt'
    )
    .eq('conversationId', conversationId);
};
