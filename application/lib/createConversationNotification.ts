import { getCustomerUserIdFromOrg } from './getCustomerUserIdFromOrg';
import { createNotificationForUsers } from '@/submodules/notifications/oneSignal/createNotificationForUsers';
import { NotificationContent } from '@/submodules/notifications/types/NotificationContent';
import { NextResponse } from 'next/server';

export const createConversationOrgNotification = async (notificationContent: NotificationContent, orgId: string) => {
  const customerUserId = await getCustomerUserIdFromOrg(orgId);
  if (!customerUserId) throw new NextResponse('Could not fetch customer user id', { status: 500 });

  try {
    await createNotificationForUsers([customerUserId], 'push', notificationContent);
  } catch (e) {
    console.log('AN ERROR OCCURRED SENDING PUSH NOTIFICATION', e);
  }

  try {
    await createNotificationForUsers([customerUserId], 'sms', notificationContent);
  } catch (e) {
    console.log('AN ERROR OCCURRED SENDING SMS', e);
  }

  try {
    await createNotificationForUsers([customerUserId], 'email', {
      email_subject: notificationContent.messageName,
      email_body: `<div><span>${notificationContent.messageBody}</span> <a href="${notificationContent.url}">Click here to go to your conversation</a>.</div>`
    });
  } catch (e) {
    console.log('AN ERROR OCCURRED SENDING EMAIL', e);
  }
};
