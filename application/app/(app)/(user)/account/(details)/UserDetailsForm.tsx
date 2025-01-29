'use client';

import {Address} from './Address';
import {BasicInfo} from './BasicInfo';
import ContentBox from '@/components/shared/ContentBox';
import {Infobox} from '@/components/shared/Infobox';
import {useUpdateUser} from '@/lib/loaders/user/useUpdateUser';
import {InfoType} from '@/types/Infobox';
import {Json} from '@/types/supabase';
import {User} from '@/types/supabaseTypes';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

interface UserDetailsFormProps {
  currentUser: User;
}

export const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ currentUser }) => {
  const [userDetails, setUserDetails] = useState(currentUser);
  const [status, setStatus] = useState({ message: '', success: true, show: false });
  const { trigger: updateUser } = useUpdateUser();
  const router = useRouter();
  
  const handleUserDetailsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ message: '', success: true, show: false });
    await updateUser(
      { ...userDetails, metadata: userDetails.metadata as Json },
      {
        onSuccess: (data, key, config) => {
          setStatus({ message: 'Successfully updated user details', success: true, show: true });
          router.refresh(); // To update the user name in the bottom left if that has changed
        },
        onError: (err, key, config) => {
          setStatus({ message: `Error updating user details ${err.message}`, success: false, show: true });
          console.log('onError', err, key, config);
        }
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-3xl leading-tight text-alpha-dark-600">My details</h1>
      <Infobox type={status.success ? InfoType.Success : InfoType.Error} visible={status.show} dismissible={true}>
        {status.message}
      </Infobox>
      <ContentBox>
        <form className="relative flex flex-col gap-9" onSubmit={handleUserDetailsSubmit}>
          <BasicInfo currentUser={userDetails} updateUserDetails={setUserDetails} />
          <Address currentUser={userDetails} updateUserDetails={setUserDetails} />
          <div>
            <button type="submit" className="[ reunitable-button ] text-base">
              Save my details
            </button>
          </div>
        </form>
      </ContentBox>
    </div>
  );
};
