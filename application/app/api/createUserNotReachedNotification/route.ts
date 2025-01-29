import { validateUserNotReachedNotificationBody } from './validateCreateUserNotReachedNotification';
import { createConversationOrgNotification } from '@/lib/createConversationNotification';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const requestBody = await request.json();

  try {
    const { conversationId, samaritanId } = validateUserNotReachedNotificationBody.parse(requestBody);

    const publicSupabase = createDangerousSupabaseServiceRoleClient<'public'>('public');

    const { data: conversation } = await publicSupabase.from('Conversation').select().eq('id', conversationId).single();
    if (!conversation) throw new Error('Could not fetch conversation');

    const { data: samaritan } = await publicSupabase.from('Samaritan').select().eq('id', samaritanId).single();
    if (!samaritan) throw new Error('Could not fetch samaritan');

    const name = samaritan?.name;
    const phone = samaritan?.phone;
    const email = samaritan?.email;

    let messageBody = `You have missed the response window for your item.`;

    if (phone || email) {
      messageBody += ` Please contact ${name}${phone ? ` through phone: ${phone}` : ''}${email && phone ? ' or' : ''}${
        email ? ` via email at: ${email}` : ''
      }.`;
    } else {
      messageBody += ` Please contact ${name} through the app.`;
    }

    const notificationContent = {
      messageBody,
      messageName: 'You have missed the response window for your item',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/messages`
    };

    await createConversationOrgNotification(notificationContent, conversation.organisationId);

    return new NextResponse('Success', { status: 200 });
  } catch (e) {
    return new NextResponse('An unknown error occurred', { status: 500 });
  }
};
