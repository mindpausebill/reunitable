import { FetchUsersWithoutPrinterIdComponent } from './FetchUsersWithoutPrinterIdComponent';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { User } from '@/types/supabaseTypes';
import { json2csv } from 'json-2-csv';
import _ from 'lodash';

const FetchUsersWithoutPrinterId = async () => {
  const supabaseService = createDangerousSupabaseServiceRoleClient<'access'>('access');

  const { data: usersWithoutPrinterId, error } = await supabaseService
    .from('UserOrganisationRole')
    .select('*, UserOrganisation(User!UserOrganisation_userId_fkey(*)), Role!inner(name)', { count: 'exact' })
    .filter('UserOrganisation.User.metadata->printerId', 'is', 'null')
    .eq('Role.name', 'Customer');

  const unqiueUsers = _.uniqBy(
    usersWithoutPrinterId?.map((userOrgRoles) => userOrgRoles?.UserOrganisation?.User).filter((user) => user),
    'id'
  );

  const unqiueUsersCsvArray = json2csv(unqiueUsers as User[]).split('\n');

  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        {unqiueUsersCsvArray?.map((user) => {
          if (user) return <FetchUsersWithoutPrinterIdComponent user={user} />;
        })}
      </div>
    </>
  );
};

export default FetchUsersWithoutPrinterId;
