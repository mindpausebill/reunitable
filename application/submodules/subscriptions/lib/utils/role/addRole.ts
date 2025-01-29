import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { UserOrganisation } from '@/types/supabaseTypes';

export const addRole = async (userOrg: UserOrganisation, roleName: string) => {
  const accessSupabase = createDangerousSupabaseServiceRoleClient<'access'>('access');

  const { data: role, error: roleError } = await accessSupabase
    .from('Role')
    .select()
    .eq('name', roleName)
    .maybeSingle();

  console.log('role', role);
  console.log('roleError', roleError);

  if (role) {
    const { error: roleUpsertError } = await accessSupabase.from('UserOrganisationRole').upsert(
      {
        userOrganisationId: userOrg?.id,
        roleId: role?.id
      },
      { ignoreDuplicates: true }
    );

    console.log('roleUpsertError', roleUpsertError);

    if (roleUpsertError) throw new Error(roleUpsertError?.message);
  }
};
