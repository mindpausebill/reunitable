'use client';

import { BasicPageLayout } from '@/components/landing/BasicPageLayout';
import { EmailAuthenticationRedirect } from '@/submodules/supabase-functions/components/EmailAuthenticationRedirect';
import { NextServerComponent } from '@/types/NextServerComponent';
import { NextServerPageProps } from '@/types/NextServerPageProps';
import { useRouter } from 'next/navigation';

const EmailRedirectPage: NextServerComponent<NextServerPageProps, 'sync'> = ({ searchParams }) => {
  const router = useRouter();
  setTimeout(() => router.replace(searchParams?.authenticationRedirect), 1000);

  return (
    <>
      <BasicPageLayout heroTitle="Welcome back">
        <EmailAuthenticationRedirect searchParams={searchParams}>
          <p className="pb-48">Redirecting to login...</p>
        </EmailAuthenticationRedirect>
      </BasicPageLayout>
    </>
  );
};

export default EmailRedirectPage;
