import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { User } from '@/types/supabaseTypes';
import BoxSDK from 'box-node-sdk';
import { format } from 'date-fns';
import { json2csv } from 'json-2-csv';
import _ from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

type UserMetadata = {
  address: {
    city: string;
    postcode: string;
    address1: string;
    address2: string;
    address3: string;
  };
  city: string;
  postcode: string;
  northStarFirstName: string;
  northStarLastName: string;
};

export const GET = async (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    if (!process.env.BOX_UPLOAD_FOLDER_ID) throw new Error('BOX_UPLOAD_FOLDER_ID not set');

    const supabase = createDangerousSupabaseServiceRoleClient<'access'>('access');

    const { data: usersWithoutPrinterId, error } = await supabase
      .from('UserOrganisationRole')
      .select('*, UserOrganisation(User!UserOrganisation_userId_fkey(*)), Role!inner(name)', { count: 'exact' })
      .filter('UserOrganisation.User.metadata->printerId', 'is', 'null')
      .eq('Role.name', 'Customer');

    console.log('Users Without Printer ID:', usersWithoutPrinterId);

    if (error) throw new Error('Error fetching users without printer ID');

    const uniqueUsers = _.uniqBy(
      usersWithoutPrinterId?.map((userOrgRoles) => userOrgRoles?.UserOrganisation?.User).filter((user) => user),
      'id'
    ).filter((user) => !!user) as User[];

    console.log('Unique Users:', uniqueUsers);

    if (uniqueUsers.length > 0) {
      const csvContent = json2csv(
        uniqueUsers.map((user) => {
          const metadata = user?.metadata as UserMetadata;
          const address = metadata?.address;

          return {
            userId: user.id,
            address1: address?.address1 ?? '',
            address2: address?.address2 ?? '',
            address3: address?.address3 ?? '',
            city: address?.city ?? '',
            postcode: address?.postcode ?? '',
            firstName: metadata?.northStarFirstName ?? '',
            lastName: metadata?.northStarLastName ?? ''
          };
        })
      );

      console.log('CSV Content:', csvContent);

      const sdk = new BoxSDK({
        clientID: process.env.BOX_API_CLIENT_ID,
        clientSecret: process.env.BOX_API_CLIENT_SECRET
      });

      console.log('Box API Client ID:', process.env.BOX_API_CLIENT_ID);
      console.log('Box API Client Secret:', process.env.BOX_API_CLIENT_SECRET);
      console.log('Box Subject Type:', process.env.BOX_SUBJECT_TYPE);
      console.log('Box Subject ID:', process.env.BOX_SUBJECT_ID);

      const { accessToken } = await sdk.tokenManager.getTokens({
        grant_type: 'client_credentials',
        box_subject_type: process.env.BOX_SUBJECT_TYPE,
        box_subject_id: process.env.BOX_SUBJECT_ID
      });

      console.log('Access Token:', accessToken);

      const client = sdk.getBasicClient(accessToken);

      console.log(
        'Upload files: ',
        await client.files.uploadFile(
          process.env.BOX_UPLOAD_FOLDER_ID,
          `customers_${format(new Date(), 'yyyyMMddHHmmss')}.csv`,
          Buffer.from(csvContent, 'utf8')
        )
      );
    }
  } catch (e) {
    console.log('Error:', e);
    return new NextResponse(`Error: ${(e as Error)?.message}`, { status: 500 });
  }

  return new NextResponse('Success', { status: 200 });
};
