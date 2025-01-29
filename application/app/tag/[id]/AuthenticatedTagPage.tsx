import { DashboardRedirect } from '../components/DashboardRedirect';
import { ErrorPage } from '../components/ErrorPage';
import ActivateAuthenticatedPage from '../components/activation/ActivateAuthenticatedPage';
import { SamaritanPage } from '../components/samaritan/SamaritanPage';
import { User } from '@/types/supabaseTypes';
import { UserMetadata } from '@/types/userMetadata';

interface AuthenticatedPageProps {
  tagOwner: User;
  user: User;
  customerOrgId: string;
}

export const AuthenticatedTagPage = ({ tagOwner, user, customerOrgId }: AuthenticatedPageProps) => {
  const tagOwnerMetadata = tagOwner.metadata as UserMetadata;

  // If the tag belongs to the logged in user
  if (user.id === tagOwner.id) {
    // If the tag has already been activated, get the user to go to their dashboard
    if (tagOwnerMetadata?.tagActivated) {
      return <DashboardRedirect />;
    }
    // Else get them to activate it
    else {
      return <ActivateAuthenticatedPage tagOwner={tagOwner} user={user} />;
    }
  }
  // If the tag belongs to someone else
  else {
    // If the tag has already been activated, go to the samaritan page
    if (tagOwnerMetadata?.tagActivated) {
      return <SamaritanPage tagOwner={tagOwner} user={user} customerOrgId={customerOrgId} />;
    } else {
      // This is an error state
      return <ErrorPage />;
    }
  }
};
