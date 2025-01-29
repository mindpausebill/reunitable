import { DynamicNotificationContent, NotificationChannel } from '../types/NotificationContent';
import { createNotification } from './createNotification';

export const createNotificationForUsers = async <C extends NotificationChannel>(
  userIds: string[],
  channel: C,
  content: DynamicNotificationContent<C>,
  templateId?: string
) => {
  const notificationResponse = await createNotification(
    { include_aliases: { external_id: userIds} },
    channel,
    content,
    templateId
  );

  return notificationResponse?.data;
};
