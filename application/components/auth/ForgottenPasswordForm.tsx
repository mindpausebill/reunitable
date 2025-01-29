'use client';

import { FinalFormInputGroup } from '../shared/FinalFormInputGroup';
import { Infobox } from '../shared/Infobox';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useForgotPasswordSubmit } from '@/submodules/supabase-functions/lib/authentication/useForgotPasswordSubmit';
import { InfoType } from '@/types/Infobox';
import { FORM_ERROR } from 'final-form';
import Link from 'next/link';
import { useState } from 'react';
import { Form } from 'react-final-form';
import { z } from 'zod';

export const ForgottenPasswordForm = () => {
  const { supabase } = useSupabase();
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  const validateForgottenPasswordForm = (values: { email: string }) => {
    let errors: Record<string, string> = {};

    if (!values.email || !z.string().email().safeParse(values.email).success) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const handleSubmit = async (formValues: { email: string }) => {
    const { origin } = new URL(window.location.href);

    const { error } = await supabase.auth.resetPasswordForEmail(formValues.email, {
      redirectTo: `${origin}/authenticated?redirectUrl=/sign-in/reset-password`
    });
    if (error) return { [FORM_ERROR]: error.message };

    setForgotPasswordSuccess(true);
  };

  return (
    <div className="flex flex-col gap-9">
      <Form
        initialValues={{
          email: ''
        }}
        className="flex flex-col gap-9"
        action="#"
        onSubmit={handleSubmit}
        validate={validateForgottenPasswordForm}
        render={({ handleSubmit, submitError }) => {
          return (
            <>
              <Infobox visible={!!submitError} type={InfoType.Error}>
                {submitError}
              </Infobox>
              <Infobox visible={forgotPasswordSuccess} type={InfoType.Success}>
                Successfully submitted forgotten password request
              </Infobox>
              <div className="flex flex-col gap-6">
                <Infobox type={InfoType.Success}>Successfully submitted forgotten password form</Infobox>
                <FinalFormInputGroup
                  id="email"
                  name="email"
                  label="Email address"
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <button onClick={handleSubmit} className="[ reunitable-button ]">
                Reset my password
              </button>
            </>
          );
        }}
      />
      <div className="flex flex-col gap-3">
        <Link className="text-lg text-alpha underline" href="/sign-in">
          I remembered my password
        </Link>
        <Link className="text-lg text-alpha underline" href="/buy-now">
          Buy Now
        </Link>
      </div>
    </div>
  );
};
