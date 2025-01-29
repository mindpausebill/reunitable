import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const getConversationsForSamaritan = (
  supabase: SupabaseClient<Database, 'public'>,
  samaritanId: string,
  customerOrgId: string
) => {
  return supabase
    .from('Conversation')
    .select(
      `id,createdAt,modifiedAt,createdById,modifiedById,organisationId,samaritanId,latitude,longitude,location,responseStatus,Samaritan(id,createdAt,modifiedAt,createdById,modifiedById,name,email,phone),Message(id,createdAt,modifiedAt,createdById,modifiedById,conversationId,latitude,longitude,location,message,photo,fromSamaritan,read)`
    )
    .eq('samaritanId', samaritanId)
    .eq('organisationId', customerOrgId)
    .maybeSingle(); // SamaritanId/OrganisationId pair is unique in the DB
};
