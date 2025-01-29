'use client';

import ContentBox from '../shared/ContentBox';
import {FinalFormInputGroup} from '../shared/FinalFormInputGroup';
import {Infobox} from '../shared/Infobox';
import {validatePasswordForm} from '@/lib/register-flow/validatePasswordForm';
import {useSupabase} from '@/submodules/supabase-functions/components/SupabaseProvider';
import {InfoType} from '@/types/Infobox';
import clsx from 'clsx';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';
import {Form} from 'react-final-form';

interface PasswordUpdateFormProps {
  ownContentBox?: boolean;
  buttonText: string;
  successUrl: string;
  formTitle: string;
  infoBoxText?: string;
}

export const PasswordUpdateForm: React.FC<PasswordUpdateFormProps> = ({
  ownContentBox,
  buttonText,
  successUrl,
  formTitle,
  infoBoxText
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("to") ?? '/dashboard';

  const { supabase } = useSupabase<'public'>('public');

  const [error, setError] = useState<string>();

  const handleFormSubmit = async (values: { password: string }) => {
    const { error } = await supabase.auth.updateUser({ password: values.password });

    if (error) {
      setError('An error occurred updating your password. Please try again later.');
    } else {
      router.push(`${redirectUrl}?success=true`);
    }
  };

  const content = (
    <>
      <Infobox type={InfoType.Error} visible={!!error} onClose={() => setError(undefined)}>
        {error}
      </Infobox>

      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl text-alpha-dark-600">{formTitle}</h2>
        <hr />
      </div>
      {infoBoxText && (
        <Infobox type={InfoType.Info} visible={true} dismissible={false}>
          {infoBoxText}
        </Infobox>
      )}

      <FinalFormInputGroup
        name="password"
        id="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        required
      />
      <FinalFormInputGroup
        name="confirmPassword"
        id="confirm-password"
        label="Confirm Password"
        placeholder="Confirm your password"
        type="password"
        required
      />
    </>
  );

  return (
    <Form
      initialValues={{
        password: '',
        confirmPassword: ''
      }}
      onSubmit={handleFormSubmit}
      validate={validatePasswordForm}
      render={({ handleSubmit }) => {
        return (
          <form className="flex w-full flex-col gap-12" onSubmit={handleSubmit}>
            {!ownContentBox && <ContentBox className="flex flex-col gap-6">{content}</ContentBox>}
            {ownContentBox && content}
            <div className="flex w-full justify-end gap-6">
              <div className={clsx('flex w-full flex-wrap gap-6', 'justify-end')}>
                <button className="[ reunitable-button ]">{buttonText}</button>
              </div>
            </div>
          </form>
        );
      }}
    />
  );
};
