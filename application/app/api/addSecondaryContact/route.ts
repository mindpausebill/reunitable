import { apiError } from '../functions/apiError';
import { getUserOrgIDs } from '@/submodules/supabase-functions/auth/getUserOrgIDs';
import { hasOrgPermission } from '@/submodules/supabase-functions/auth/hasOrgPermission';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  console.log('addSecondaryContact');

  // Extract the required inputs from the request body and check all exist
  const { email, firstName, lastName } = await req.json();
  if (!email || !firstName || !lastName) {
    return apiError(401, 'missing_mandatory', `Missing mandatory fields`);
  }

  // Find the first orgID that has the permission to manage contacts (should only be one - their own)
  const supabase = createSupabaseServerClient<'access'>('access');
  const {
    data: { session }
  } = await supabase.auth.getSession();
  console.log('Session user id', session?.user?.id);
  const userOrgIDs = getUserOrgIDs(session);
  console.log('userOrgIDs', JSON.stringify(userOrgIDs));
  const primaryUserOrgID = userOrgIDs.find((orgID) => hasOrgPermission(session, orgID, 'canManageContacts'));
  console.log('primaryUserOrgID', primaryUserOrgID);

  if (!primaryUserOrgID) {
    return apiError(401, 'no_permission', `No permission to manage secondary contacts`);
  }

  // We've got this far - we can now invite the user and add them to the organisation with the correct role, using the admin supabase client
  const supabaseAdmin = createDangerousSupabaseServiceRoleClient<'access'>('access');

  // Check whether the user exists
  const { data: user, error: userError } = await supabaseAdmin
    .from('User')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  let userId: string;

  if (!user) {
    console.log('User does not exist - inviting');

    // Invite the user
    const { data: inviteResponse, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      email as string,
      {
        data: { northStarFirstName: firstName, northStarLastName: lastName },
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/authenticated?redirectUrl=${
          process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
        }`
      }
    );

    console.log('inviteResponse: ', inviteResponse);
    console.log('inviteError: ', inviteError);

    // Check the user invite worked
    if (!inviteResponse?.user?.id) {
      return apiError(401, 'invite_user_failed', `Failed to invite user ${inviteError?.message}`);
    }

    userId = inviteResponse.user.id;
  } else {
    console.log('User exists - no need to invite');

    userId = user.id;

    //Check if user exists in the Organisation. If so, then return.
    const { data: userOrganisationSelectResponse, error: userOrganisationSelectError } = await supabaseAdmin
      .from('UserOrganisation')
      .select('id,userId,organisationId')
      .eq('userId', userId)
      .eq('organisationId', primaryUserOrgID)
      .maybeSingle();

    if (userOrganisationSelectError) {
      return apiError(
        401,
        'user_organisation_existence_check_failed',
        `Failed to check user organisation exists in the system`
      );
    }

    if (userOrganisationSelectResponse) {
      console.log('User already exists in organisation - aborting');
      return apiError(401, 'user_already_exists_for_organisation', `User already exists for the organisation`);
    }
  }

  // Create the User Organisation link
  const { data: userOrganisationUpsertResponse, error: userOrganisationUpsertError } = await supabaseAdmin
    .from('UserOrganisation')
    .upsert(
      {
        userId: userId,
        organisationId: primaryUserOrgID
      },
      { onConflict: 'userId,organisationId' }
    )
    .select('id,userId,organisationId')
    .single();

  // Check the user organisation worked
  if (userOrganisationUpsertError) {
    return apiError(
      401,
      'create_user_organisation_failed',
      `Failed to create user organisation ${userOrganisationUpsertError?.message}`
    );
  }

  console.log('userOrganisationResponse', userOrganisationUpsertResponse);
  console.log('userOrganisationError', userOrganisationUpsertError);

  // Fetch the role
  const { data: specifiedRole } = await supabaseAdmin.from('Role').select('id,name').eq('name', `Contact`).single();

  // Role needs to exist...
  if (!specifiedRole) {
    return apiError(401, 'no_specified_role', `Specified role does not exist`);
  }

  // Create the User Organisation Role
  const { data: userOrganisationRoleResponse, error: userOrganisationRoleError } = await supabaseAdmin
    .from('UserOrganisationRole')
    .upsert(
      {
        userOrganisationId: userOrganisationUpsertResponse.id,
        roleId: specifiedRole.id
      },
      { onConflict: 'userOrganisationId,roleId' }
    )
    .select('id,userOrganisationId,roleId,UserOrganisation(userId)')
    .single();

  console.log('userOrganisationRoleResponse', userOrganisationRoleResponse);
  console.log('userOrganisationRoleError', userOrganisationRoleError);

  // Check the user organisation role worked
  if (!userOrganisationRoleResponse?.id) {
    return apiError(
      401,
      'create_user_organisation_role_failed',
      `Failed to create user organisation role ${userOrganisationRoleError?.message ?? ''}`
    );
  }

  return NextResponse.json({ userId: userId }, { status: 200 });
};
