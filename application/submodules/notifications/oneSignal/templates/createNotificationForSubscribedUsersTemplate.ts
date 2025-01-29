//This is an auto-generated file. Please do not modify manually.
import { createNotificationForSubscribedUsers } from '@/submodules/notifications/oneSignal/createNotificationForSubscribedUsers';
import { DynamicNotificationContent, NotificationChannel } from '@/submodules/notifications/types/NotificationContent';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const requestBody: {
    channel: NotificationChannel;
    content: DynamicNotificationContent<NotificationChannel>;
    templateId: string;
  } = await request.json();

  const notificationResponse = await createNotificationForSubscribedUsers(
    requestBody?.channel,
    requestBody?.content,
    requestBody?.templateId
  );

  return NextResponse.json(notificationResponse, { status: 200 });
};
