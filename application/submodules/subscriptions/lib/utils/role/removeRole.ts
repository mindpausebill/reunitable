import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { UserOrganisationRole } from '@/types/supabaseTypes';

export const removeRole = async (userOrgRole: UserOrganisationRole) => {
  const accessSupabase = createDangerousSupabaseServiceRoleClient<'access'>('access');

  const { error: roleDeleteError } = await accessSupabase
    .from('UserOrganisationRole')
    .delete()
    .eq('id', userOrgRole?.id)
    .select();

  if (roleDeleteError) throw new Error(roleDeleteError?.message);
};
