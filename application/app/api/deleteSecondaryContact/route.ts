import { apiError } from '../functions/apiError';
import { getUserOrgIDs } from '@/submodules/supabase-functions/auth/getUserOrgIDs';
import { hasOrgPermission } from '@/submodules/supabase-functions/auth/hasOrgPermission';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  console.log('deleteSecondaryContact');

  // Extract the required inputs from the request body and check all exist
  const { contactId } = await req.json();
  if (!contactId) {
    return apiError(401, 'missing_mandatory', `Missing mandatory fields`);
  }

  // Find the first orgID that has the permission to manage contacts (should only be one - their own)
  const supabase = createSupabaseServerClient<'access'>('access');
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const userOrgIDs = getUserOrgIDs(session);
  const primaryUserOrgID = userOrgIDs.find((orgID) => hasOrgPermission(session, orgID, 'canManageContacts'));

  if (!primaryUserOrgID) {
    return apiError(401, 'no_permission', `No permission to manage secondary contacts`);
  }

  // We've got this far - we can now delete the UserOrgRole and then the UserOrg
  const supabaseAdmin = createDangerousSupabaseServiceRoleClient<'access'>('access');

  // First find the UserOrganisation record
  const { data: userOrganisationSelectResponse, error: userOrganisationSelectError } = await supabaseAdmin
    .from('UserOrganisation')
    .select('id,userId,organisationId')
    .eq('userId', contactId)
    .eq('organisationId', primaryUserOrgID)
    .maybeSingle();

  if (userOrganisationSelectError) {
    return apiError(
      401,
      'user_organisation_existence_check_failed',
      `Failed to check user organisation exists in the system`
    );
  }

  if (!userOrganisationSelectResponse) {
    console.log('User doesnt exist in organisation - aborting');
    return apiError(401, 'user_doesnt_exist_for_organisation', `User doesnt exist for the organisation`);
  }

  // Delete the User Organisation Role - ignore if it fails
  const { data: userOrganisationRoleResponse, error: userOrganisationRoleError } = await supabaseAdmin
    .from('UserOrganisationRole')
    .delete()
    .eq('userOrganisationId', userOrganisationSelectResponse.id);

  // Delete the User Organisation Role
  const { data: userOrganisationResponse, error: userOrganisationError } = await supabaseAdmin
    .from('UserOrganisation')
    .delete()
    .eq('id', userOrganisationSelectResponse.id);

  if (userOrganisationError) {
    return apiError(401, 'user_organisation_delete_failed', `Failed to remove user from organisation`);
  }

  return NextResponse.json({ userId: contactId }, { status: 200 });
};
