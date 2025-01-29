'use client';

import { Infobox } from '@/components/shared/Infobox';
import { useUpdateUser } from '@/lib/loaders/user/useUpdateUser';
import { InfoType } from '@/types/Infobox';
import { Json } from '@/types/supabase';
import { User } from '@/types/supabaseTypes';
import { UserMetadata } from '@/types/userMetadata';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ActivateProps {
  user: User;
}

export const Activate: React.FC<ActivateProps> = ({ user }) => {
  const { trigger: updateUser } = useUpdateUser();
  const [status, setStatus] = useState({ message: '', success: true, show: false });
  const router = useRouter();

  const handleActivateClick = async () => {
    setStatus({ message: '', success: true, show: false });
    const newUserMetadata = { ...(user.metadata as UserMetadata), tagActivated: true };
    await updateUser(
      { ...user, metadata: newUserMetadata as Json },
      {
        onSuccess: (data, key, config) => {
          setStatus({ message: 'Successfully activated tag!', success: true, show: true });
          setTimeout(() => {
            router.push('/dashboard');
          }, 5000);
        },
        onError: (err, key, config) => {
          setStatus({ message: `Error activating tag - ${err.message}`, success: false, show: true });
          console.log('onError', err, key, config);
        }
      }
    );
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <button
          className="[ reunitable-button ] border-charlie bg-charlie text-alpha-dark-600"
          onClick={handleActivateClick}
        >
          Activate your tags
        </button>
        <Infobox type={status.success ? InfoType.Success : InfoType.Error} visible={status.show} dismissible={true}>
          {status.message}
        </Infobox>
      </div>
    </>
  );
};
