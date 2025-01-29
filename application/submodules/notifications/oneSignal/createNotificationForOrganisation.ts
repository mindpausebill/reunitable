import { DynamicNotificationContent, NotificationChannel } from '../types/NotificationContent';
import { createNotificationForUsers } from '@/submodules/notifications/oneSignal/createNotificationForUsers';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import _ from 'lodash';

export const createNotificationForOrganisation = async <C extends NotificationChannel>(
  supabase: SupabaseClient<Database, 'access'>,
  organisationId: string,
  channel: C,
  content: DynamicNotificationContent<C>,
  templateId?: string
) => {
  const { data: organisation } = await supabase.from('UserOrganisation').select().eq('organisationId', organisationId);

  const userIds = _.map(organisation, 'userId');

  return await createNotificationForUsers(userIds, channel, content, templateId);
};
