import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';

export const getCustomerUserIdFromOrg = async (organisationId: string) => {
  const accessSupabase = createDangerousSupabaseServiceRoleClient<'access'>('access');

  const { data: customerRole } = await accessSupabase.from('Role').select('id').eq('name', 'Customer').single();
  if (!customerRole) {
    return;
  }

  const { data: conversationUserOrgRole } = await accessSupabase
    .from('UserOrganisationRole')
    .select('UserOrganisation!inner(*)')
    .eq('UserOrganisation.organisationId', organisationId)
    .eq('roleId', customerRole?.id)
    .maybeSingle();

  if (!conversationUserOrgRole?.UserOrganisation?.userId) {
    return;
  }

  return conversationUserOrgRole.UserOrganisation.userId;
};
