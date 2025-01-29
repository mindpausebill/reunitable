import { createNotificationForUsers } from '@/submodules/notifications/oneSignal/createNotificationForUsers';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { formatISO, sub } from 'date-fns';
import _ from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const supabase = createDangerousSupabaseServiceRoleClient<'public'>('public');
  const accessSupabase = createDangerousSupabaseServiceRoleClient<'access'>('access');

  const { data: currentServerTime } = await supabase.rpc('get_current_server_time');
  if (!currentServerTime) {
    throw new Response('COULD NOT GET CURRENT SERVER TIME', { status: 500 });
  }

  const { data: unresponsiveUsers } = await supabase
    .from('Conversation')
    .select('organisationId')
    .eq('responseStatus', 'primaryUserNotified')
    .lte('createdAt', formatISO(sub(new Date(currentServerTime), { minutes: 5 })))
    .throwOnError();

  const unresponsiveOrgIds = _.map(unresponsiveUsers ?? [], 'organisationId');

  const { data: contactRole } = await accessSupabase.from('Role').select('id').eq('name', 'Contact').single();

  if (!contactRole) {
    return new NextResponse('No contact role found', { status: 500 });
  }
  const { data: contactUsers } = await accessSupabase
    .from('UserOrganisationRole')
    .select('UserOrganisation!inner(*)')
    .eq('roleId', contactRole?.id)
    .in('UserOrganisation.organisationId', unresponsiveOrgIds)
    .throwOnError();

  const userIds = _.map(contactUsers, (userOrgRole) => userOrgRole?.UserOrganisation?.userId).filter(
    (userId) => typeof userId === 'string'
  );

  if (userIds?.length > 0) {
    const notificationContent = {
      messageBody:
        'A QR code has been scanned and requires your attention. Please respond to the conversation in the app.',
      messageName: 'Secondary Contact Notification',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/messages`
    };

    try {
      await createNotificationForUsers(userIds as string[], 'push', notificationContent);
    } catch (e) {
      console.log('AN ERROR OCCURRED SENDING PUSH NOTIFICATION', e);
    }

    try {
      await createNotificationForUsers(userIds as string[], 'sms', notificationContent);
    } catch (e) {
      console.log('AN ERROR OCCURRED SENDING SMS', e);
    }

    try {
      await createNotificationForUsers(userIds as string[], 'email', {
        email_subject: notificationContent.messageName,
        email_body: `<div><span>${notificationContent.messageBody}</span><a${notificationContent.url}}>Click here to go to Reunitable</a></div>`
      });
    } catch (e) {
      console.log('AN ERROR OCCURRED SENDING EMAIL', e);
    }

    await supabase
      .from('Conversation')
      .update({ responseStatus: 'secondaryUserNotified' })
      .in('organisationId', unresponsiveOrgIds);
  }

  return new NextResponse('OK', { status: 200 });
};
