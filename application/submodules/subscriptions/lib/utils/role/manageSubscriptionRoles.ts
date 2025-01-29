import { addRole } from './addRole';
import { removeRole } from './removeRole';
import { StripeSubscription } from '@/submodules/subscriptions/types/StripeDatabaseTypes';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';

export const manageSubscriptionRoles = async (
  subscriptionData: Omit<StripeSubscription, 'id'>,
  customerId: string,
  roles: string[]
) => {
  const publicSupabase = createDangerousSupabaseServiceRoleClient<'public'>('public');
  const accessSupabase = createDangerousSupabaseServiceRoleClient<'access'>('access');

  const { data: customerData, error: noCustomerError } = await publicSupabase
    .from('StripeCustomer')
    .select('userId')
    .eq('customerId', customerId)
    .single();

  console.log('customerData', customerData);
  console.log('noCustomerError', noCustomerError);

  if (noCustomerError) throw noCustomerError;

  const { userId } = customerData;

  const { data: userOrg } = await accessSupabase
    .from('UserOrganisation')
    .select('*, Organisation!inner(*)')
    .eq('Organisation.name', userId)
    .eq('userId', userId)
    .maybeSingle();

  console.log('userOrg', userOrg);

  if (userOrg) {
    for (const role of roles) {
      const { data: userOrgRole } = await accessSupabase
        .from('UserOrganisationRole')
        .select('*, Role!inner(*)')
        .eq('userOrganisationId', userOrg.id)
        .eq('Role.name', role)
        .maybeSingle();

      if (
        (subscriptionData?.subscriptionStatus === 'canceled' ||
          subscriptionData?.subscriptionStatus === 'paused' ||
          subscriptionData?.subscriptionStatus === 'unpaid') &&
        userOrgRole
      ) {
        await removeRole(userOrgRole);
      }

      if (subscriptionData?.subscriptionStatus === 'active' && !userOrgRole) {
        await addRole(userOrg, role);
      }
    }
  }
};
