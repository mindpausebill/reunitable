import { AddressSetupForm } from '@/components/register-flow/AddressSetupForm';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { redirect } from 'next/navigation';

const Setup = async () => {
  const {
    data: { user }
  } = await createSupabaseServerClient<'public'>('public').auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return <AddressSetupForm user={user} />;
};

export default Setup;
