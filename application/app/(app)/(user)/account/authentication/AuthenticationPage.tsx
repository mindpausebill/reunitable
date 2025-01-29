'use client';
import ContentBox from "@/components/shared/ContentBox";
import {useSupabase} from "@/submodules/supabase-functions/components/SupabaseProvider";
import {InfoType} from "@/types/Infobox";
import {Infobox} from "@/components/shared/Infobox";
import {useState} from "react";
import {useSearchParams} from "next/navigation";

interface AuthenticationPageProps {
  email?: string;
}

export const AuthenticationPage = ({email}: AuthenticationPageProps) => {
  const searchParams = useSearchParams();
  const isSuccess = searchParams?.get("success");

  const { supabase } = useSupabase<"public">("public");
  const [submitError, setSubmitError] = useState<string>();
  const [emailSuccess, setEmailSuccess] = useState<boolean>(false);

  const handleResetPassword = async () => {
    const { origin } = new URL(window.location.href);

    const { error } = await supabase.auth.resetPasswordForEmail(email ?? "", {
      redirectTo: `${origin}/sign-in/reset-password?to=/account/authentication`,
    });

    if (error) setSubmitError(error.message);
    else setEmailSuccess(true);
  }

  return (
    <ContentBox>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-2xl text-alpha-dark-600">Reset Password</h2>
          <hr />
          <div>
            <button className="[ reunitable-button ] text-base" onClick={handleResetPassword}>
              Click here to reset your password
            </button>
          </div>
          <Infobox visible={!!submitError} type={InfoType.Error}>
            {submitError}
          </Infobox>

          <Infobox visible={isSuccess ? true : false} type={InfoType.Success}>
            Password successfully changed.
          </Infobox>

          <Infobox visible={emailSuccess} type={InfoType.Success} dismissible={true}>
            An email has been sent to you with instructions on how to change your password.
          </Infobox>
        </div>
      </div>
    </ContentBox>
  )
}