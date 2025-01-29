import { UserDetailsForm } from './UserDetailsForm';
import { useServerCurrentUser } from '@/submodules/supabase-functions/auth/getServerCurrentUser';
import { signInWithRedirect } from '@/submodules/supabase-functions/auth/signInWithRedirect';

const YourDetails = () => {
  const currentUser = useServerCurrentUser();
  if (!currentUser) return signInWithRedirect(`/my-account`);

  return <UserDetailsForm currentUser={currentUser} />;
};

export default YourDetails;
