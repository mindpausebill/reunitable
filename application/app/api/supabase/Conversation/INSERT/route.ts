import { createConversationOrgNotification } from '@/lib/createConversationNotification';
import { Conversation } from '@/types/supabaseTypes';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const requestBody = await req.json();

  const newRecord: Conversation = requestBody.record;

  if (!newRecord) {
    throw new Response('ERROR GETTING NEW RECORD FROM REQUEST BODY', { status: 500 });
  }

  const notificationContent = {
    messageBody: 'Your item has been found! Please respond to the conversation in the app.',
    messageName: 'Item Found Notification',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/messages`
  };

  try {
    await createConversationOrgNotification(notificationContent, newRecord.organisationId);
  } catch (e) {
    return e as NextResponse;
  }

  return new NextResponse('Success', { status: 200 });
};
