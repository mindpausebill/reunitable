//This is an auto-generated file. Please do not modify manually.
import { createNotificationForUsers } from '@/submodules/notifications/oneSignal/createNotificationForUsers';
import { DynamicNotificationContent, NotificationChannel } from '@/submodules/notifications/types/NotificationContent';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const requestBody: {
    userIds: string[];
    channel: NotificationChannel;
    content: DynamicNotificationContent<NotificationChannel>;
    templateId: string;
  } = await request.json();

  const notificationResponse = await createNotificationForUsers(
    requestBody?.userIds,
    requestBody?.channel,
    requestBody?.content,
    requestBody?.templateId
  );

  return NextResponse.json(notificationResponse, { status: 200 });
};
