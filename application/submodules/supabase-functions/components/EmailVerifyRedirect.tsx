'use client';

import { useRouter } from 'next/navigation';

interface EmailVerifyRedirectProps {
  searchParams: Record<string, string>;
  children?: React.ReactNode;
}

export const EmailVerifyRedirect: React.FC<EmailVerifyRedirectProps> = ({ searchParams, children }) => {
  const redirectUrl = searchParams?.authenticationRedirect;
  const router = useRouter();

  return (
    <>
      {children}
      {!children && (
        <div className="flex w-full items-center justify-center p-48">
          <button
            onClick={() => router.replace(redirectUrl)}
            className="rounded-md bg-nsAdmin-900 px-4 py-2 text-3xl font-bold text-white"
          >
            Confirm email
          </button>
        </div>
      )}
    </>
  );
};
