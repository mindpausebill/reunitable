import { ManageAccount } from './ManageAccount';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { NextServerComponent } from '@/types/NextServerComponent';
import { User } from '@supabase/supabase-js';

interface StripeAccountProps {
  customStripeAccountPage?: ({ user }: { user: User | null }) => JSX.Element;
}

export const StripeAccount: NextServerComponent<StripeAccountProps> = async ({ customStripeAccountPage }) => {
  const supabase = createSupabaseServerClient<'public'>('public');
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <>
      {!customStripeAccountPage && (
        <>
          {!user && <div>No user exists</div>}
          {user && <ManageAccount user={user} />}
        </>
      )}
      {customStripeAccountPage && customStripeAccountPage({ user })}
    </>
  );
};
