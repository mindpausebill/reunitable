import { checkBoxWebhookSignature } from '@/lib/checkBoxWebhookSignature';
import { streamToString } from '@/lib/streamToString';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import BoxSDK from 'box-node-sdk';
import { csv2json } from 'json-2-csv';
import _, { values } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  console.log('BOX API CLIENT ID', process.env.BOX_API_CLIENT_ID);
  console.log('BOX API CLIENT SECRET', process.env.BOX_API_CLIENT_SECRET);
  console.log('BOX SUBJECT TYPE', process.env.BOX_SUBJECT_TYPE);
  console.log('BOX SUBJECT ID', process.env.BOX_SUBJECT_ID);

  try {
    const validRequestBody = await checkBoxWebhookSignature(request);

    console.log('VALID REQUEST BODY', validRequestBody);

    const fileId = validRequestBody?.source?.id;

    console.log('FILE ID', fileId);

    if (!fileId) {
      return new NextResponse('Invalid request', { status: 400 });
    }

    const sdk = new BoxSDK({
      clientID: process.env.BOX_API_CLIENT_ID,
      clientSecret: process.env.BOX_API_CLIENT_SECRET
    });

    const { accessToken } = await sdk.tokenManager.getTokens({
      grant_type: 'client_credentials',
      box_subject_type: process.env.BOX_SUBJECT_TYPE,
      box_subject_id: process.env.BOX_SUBJECT_ID
    });

    console.log('ACCESS TOKEN', accessToken);

    const client = sdk.getBasicClient(accessToken);

    const file = await client.files.getReadStream(fileId);

    console.log('FILE', file);

    const parsedFile = await streamToString(file);

    console.log('PARSED FILE', parsedFile);

    const userPrinterIds = csv2json(parsedFile).map((row) => {
      const userPrinterId = {};

      Object.entries(row).map(([key, value]) => {
        const regex = /(\r\n|\n|\r)/gm;
        _.set(userPrinterId, key.replace(regex, ''), value.toString().replace(regex, ''));
      });

      return userPrinterId as { userId: string; printerId: string };
    });

    console.log('USER PRINTER IDS', userPrinterIds);

    const supabase = createDangerousSupabaseServiceRoleClient<'access'>('access');

    await Promise.all(
      userPrinterIds.map(async ({ userId, printerId }) => {
        const { error: updateUserError } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: { printerId }
        });

        console.log('ERROR UPDATING USER', updateUserError);

        const { data: user, error: errorSelectingUser } = await supabase
          .from('User')
          .select('*')
          .eq('id', userId)
          .single();

        console.log('ERROR UPDATING USER', errorSelectingUser);

        if (user) {
          const { error } = await supabase
            .from('User')
            .update({
              metadata: {
                ...(user.metadata as Record<string, unknown>),
                printerId
              }
            })
            .eq('id', userId);

          console.log('ERROR UPDATING USER METADATA', error);
        }
      })
    );

    return new NextResponse('Success', { status: 200 });
  } catch (e) {
    console.log('ERROR UPDATING DB', e);
    return e as NextResponse;
  }
};
