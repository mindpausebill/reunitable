import { DynamicNotificationContent, NotificationChannel } from '../types/NotificationContent';
import { createNotification } from './createNotification';

export const createNotificationForSubscribedUsers = async <C extends NotificationChannel>(
  channel: C,
  content: DynamicNotificationContent<C>,
  templateId?: string
) => {
  const notificationResponse = await createNotification(
    { included_segments: ['Subscribed Users'] },
    channel,
    content,
    templateId
  );

  return notificationResponse?.data;
};
