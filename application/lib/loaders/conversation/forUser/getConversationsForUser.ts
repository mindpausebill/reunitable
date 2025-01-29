import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const getConversationsForUser = (supabase: SupabaseClient<Database, 'public'>, orgIDs: string[]) => {
  return supabase
    .from('Conversation')
    .select(
      `id,createdAt,modifiedAt,createdById,modifiedById,organisationId,responseStatus,samaritanId,latitude,longitude,location,Samaritan(id,createdAt,modifiedAt,createdById,modifiedById,name),Message(id,createdAt,modifiedAt,createdById,modifiedById,conversationId,latitude,longitude,location,message,photo,fromSamaritan,read)`
    )
    .in('organisationId', orgIDs);
};
