import {
  DynamicNotificationContent,
  EmailNotificationContent,
  NotificationContent
} from '../types/NotificationContent';
import { NotificationFilter } from '../types/NotificationFilter';
import { handleAxiosError } from '@/lib/exception/handleAxiosError';
import axios from 'axios';
import _ from 'lodash';

export const createNotification = async <C extends 'push' | 'sms' | 'email'>(
  filterMethod: NotificationFilter,
  channel: C,
  content: DynamicNotificationContent<C>,
  templateId?: string
) => {
  if (!process.env.ONESIGNAL_REST_API_KEY) {
    throw new Error('ONESIGNAL_REST_API_KEY MISSING FROM ENV VARS');
  }
  if (!process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID) {
    throw new Error('NEXT_PUBLIC_ONESIGNAL_APP_ID MISSIN FROM ENV VARS');
  }

  const formattedContent = {};

  if ((content as EmailNotificationContent)?.email_body) {
    const typedContent = content as EmailNotificationContent;
    _.set(formattedContent, 'email_subject', typedContent.email_subject);
    _.set(formattedContent, 'email_body', typedContent.email_body);
  } else {
    const typedContent = content as NotificationContent;
    _.set(formattedContent, 'contents', { en: typedContent.messageBody });
    _.set(formattedContent, 'name', typedContent.messageName);
    _.set(formattedContent, 'user', typedContent?.url);
  }

  if (channel === 'sms') {
    _.set(formattedContent, 'sms_from', process.env.ONESIGNAL_SMS_NUMBER);
  }

  try {
    return await axios.post(
      'https://onesignal.com/api/v1/notifications',
      {
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        ...filterMethod,
        ...formattedContent,
        template_id: templateId,
        priority: 10,
        target_channel: channel
      },
      {
        headers: {
          Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      }
    );
  } catch (e) {
    handleAxiosError(e);
  }
};
