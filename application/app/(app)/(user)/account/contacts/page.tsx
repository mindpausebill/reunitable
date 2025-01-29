import { ContactsPage } from './ContactsPage';
import { useServerSessionUser } from '@/submodules/supabase-functions/auth/getServerSessionUser';
import { signInWithRedirect } from '@/submodules/supabase-functions/auth/signInWithRedirect';

const Contacts = () => {
  const user = useServerSessionUser();
  if (!user) return signInWithRedirect(`/account/contacts`);

  return <ContactsPage />;
};

export default Contacts;
