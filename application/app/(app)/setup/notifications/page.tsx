import { Steps } from '../Steps';
import { NotificationConsentForm } from '@/components/shared/NotificationConsentForm';
import { useServerCurrentUser } from '@/submodules/supabase-functions/auth/getServerCurrentUser';
import { signInWithRedirect } from '@/submodules/supabase-functions/auth/signInWithRedirect';
import clsx from 'clsx';
import Link from 'next/link';

const NotificationsPage = () => {
  const currentUser = useServerCurrentUser();
  if (!currentUser) return signInWithRedirect(`/my-account`);

  return (
    <>
      <Steps currentStep={2} totalSteps={2} />
      <NotificationConsentForm currentUser={currentUser} />
      <div className="flex flex w-full justify-between gap-6">
        <Link
          className="[ reunitable-secondary-button ] whitespace-nowrap border-alpha text-alpha"
          href="/setup/address"
        >
          Previous step
        </Link>
        <div className={clsx('flex w-full flex-wrap gap-6', 'justify-end')}>
          <Link href={'/dashboard'} className="[ reunitable-button ]">
            Complete Setup
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
