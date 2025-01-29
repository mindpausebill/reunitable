import { AuthenticatedTagPage } from './AuthenticatedTagPage';
import { UnauthenticatedTagPage } from './UnauthenticatedTagPage';
import { useDangerousServerOrgForUserRole } from '@/lib/loaders/org/useDangerousServerOrgForUserRole';
import { useDangerousServerUsersByPrinterId } from '@/lib/loaders/user/useDangerousServerUsersByPrinterId';
import { useServerCurrentUser } from '@/submodules/supabase-functions/auth/getServerCurrentUser';
import { Next13PageProps } from '@/types/Next13PageProps';
import { notFound } from 'next/navigation';

const TagPage = ({ params }: Next13PageProps) => {
  const currentUser = useServerCurrentUser();
  const idParam = params?.['id'];
  if (!idParam) {
    notFound();
  }

  // Needs to be service role client to query User table for non logged in user
  const { data: users } = useDangerousServerUsersByPrinterId(idParam);
  if (users?.length !== 1) {
    notFound();
  }

  const tagOwner = users[0];

  // Find the customer org for the tag owner - needed to create conversation later
  const { data: userOrg } = useDangerousServerOrgForUserRole(tagOwner.id, 'Customer');
  const customerOrgId = userOrg?.[0]?.UserOrganisation?.organisationId;
  if (!customerOrgId) {
    notFound();
  }

  if (currentUser) {
    return <AuthenticatedTagPage tagOwner={tagOwner} user={currentUser} customerOrgId={customerOrgId} />;
  }
  return <UnauthenticatedTagPage tagOwner={tagOwner} customerOrgId={customerOrgId} />;
};

export default TagPage;
