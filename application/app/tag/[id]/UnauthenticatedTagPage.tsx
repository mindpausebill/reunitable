import ActivateUnauthenticatedPage from '../components/activation/ActivateUnauthenticatedPage';
import { SamaritanPage } from '../components/samaritan/SamaritanPage';
import { User } from '@/types/supabaseTypes';
import { UserMetadata } from '@/types/userMetadata';

interface UnauthenticatedPageProps {
  tagOwner: User;
  customerOrgId: string;
}

export const UnauthenticatedTagPage = ({ tagOwner, customerOrgId }: UnauthenticatedPageProps) => {
  const tagOwnerMetadata = tagOwner.metadata as UserMetadata;

  // If the tag has already been activated, redirect to the samaritan chat page
  if (tagOwnerMetadata?.tagActivated) {
    return <SamaritanPage tagOwner={tagOwner} customerOrgId={customerOrgId} />;
  }

  return <ActivateUnauthenticatedPage tagOwner={tagOwner} />;
};
