//This is an auto-generated file. Please do not modify manually.
import { createNotificationForOrganisation } from '@/submodules/notifications/oneSignal/createNotificationForOrganisation';
import { DynamicNotificationContent, NotificationChannel } from '@/submodules/notifications/types/NotificationContent';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'access'>('access');
  const requestBody: {
    orgId: string;
    channel: NotificationChannel;
    content: DynamicNotificationContent<NotificationChannel>;
    templateId: string;
  } = await request.json();

  const notificationResponse = await createNotificationForOrganisation(
    supabase,
    requestBody?.orgId,
    requestBody.channel,
    requestBody?.content,
    requestBody?.templateId
  );

  return NextResponse.json(notificationResponse, { status: 200 });
};
