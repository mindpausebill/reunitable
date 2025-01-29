import { NotificationConsentForm } from '@/components/shared/NotificationConsentForm';
import { useServerCurrentUser } from '@/submodules/supabase-functions/auth/getServerCurrentUser';
import { signInWithRedirect } from '@/submodules/supabase-functions/auth/signInWithRedirect';

const NotificationsPage = () => {
  const currentUser = useServerCurrentUser();
  if (!currentUser) return signInWithRedirect(`/my-account`);

  return <NotificationConsentForm currentUser={currentUser} />;
};

export default NotificationsPage;
