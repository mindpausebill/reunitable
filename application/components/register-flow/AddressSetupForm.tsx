'use client';

import ContentBox from '../shared/ContentBox';
import { FinalFormInputGroup } from '../shared/FinalFormInputGroup';
import { Infobox } from '../shared/Infobox';
import { Steps } from '@/app/(app)/setup/Steps';
import { validateAddressForm } from '@/lib/register-flow/validateAddressForm';
import { trimObject } from '@/lib/trimObject';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { InfoType } from '@/types/Infobox';
import { AddressFormValues } from '@/types/register-flow/AddressFormValues';
import { User } from '@supabase/auth-helpers-nextjs';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Form } from 'react-final-form';

interface AddressSetupFormProps {
  user: User;
}

export const AddressSetupForm: React.FC<AddressSetupFormProps> = ({ user }) => {
  const { supabase } = useSupabase<'public'>('public');
  const { supabase: accessSupabase } = useSupabase<'access'>('access')
  const router = useRouter();

  const [addressError, setAddressError] = useState<boolean>(false);

  const handleAddressSubmit = async (values: AddressFormValues) => {
    const {
      data: { user },
      error
    } = await supabase.auth.updateUser({
      data: {
        address: {
          ...trimObject(values)
        }
      }
    });

    if (!user && error) {
      setAddressError(true)
    } else {
      await accessSupabase
        .from('User')
        .update({ metadata: { ...user?.user_metadata } })
        .eq('id', user?.id ?? '');

        router.push('/setup/notifications');
    }
  };

  return (
    <>
      <Steps currentStep={1} totalSteps={2} />
      <Form
        initialValues={user?.user_metadata?.address}
        onSubmit={handleAddressSubmit}
        validate={validateAddressForm}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
              <ContentBox className="flex flex-col gap-6">
                <Infobox type={InfoType.Error} visible={addressError} onClose={() => setAddressError(false)}>
                  <span>An error occurred attempting to save address information. Please try again later.</span>
                </Infobox>
                <div className="flex flex-col gap-3">
                  <h2 className="font-heading text-2xl text-alpha-dark-600">Address</h2>
                  <hr />
                </div>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <FinalFormInputGroup
                    name="address1"
                    id="address1"
                    label="Address line one"
                    type="text"
                    placeholder="Enter the first line of your address"
                    required
                  />
                  <FinalFormInputGroup
                    name="address2"
                    id="address2"
                    label="Address line two"
                    type="text"
                    placeholder="Enter the second line of your address"
                    required
                  />
                  <FinalFormInputGroup
                    name="address3"
                    id="address3"
                    label="Address line three"
                    type="text"
                    placeholder="Enter the third line of your address"
                  />
                  <FinalFormInputGroup
                    name="town"
                    id="town"
                    label="Town or City"
                    type="text"
                    placeholder="Enter your town or city"
                    required
                  />
                  <FinalFormInputGroup
                    name="postcode"
                    id="postcode"
                    label="Postal Code"
                    type="text"
                    placeholder="Enter your postal code"
                    required
                  />
                </div>
              </ContentBox>

              <div className={clsx('flex w-full flex-wrap gap-6', 'justify-end')}>
                <button className="[ reunitable-button ]">Next step</button>
              </div>
            </form>
          );
        }}
      />
    </>
  );
};
