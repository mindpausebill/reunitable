'use client';

import { BasicPageLayout } from '@/components/landing/BasicPageLayout';
import { GoogleButton } from '@/components/landing/GoogleButton';
import InputGroup from '@/components/shared/InputGroup';
import { signInWithOauth } from '@/submodules/supabase-functions/auth/signInWithOauth';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Provider } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import welcome from 'public/images/welcome2.jpg';
import { useState } from 'react';

interface Props {
  searchParams?: {
    redirectUrl: string;
  };
}

export default function Page({ searchParams }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectCredentials, setIncorrectCredentials] = useState<boolean>(false);
  const { supabase } = useSupabase<'public'>();
  const router = useRouter();

  const redirectPath = `/authenticated?redirectUrl=${searchParams?.redirectUrl ?? '/dashboard'}`;
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}${redirectPath}`;

  const handleEmailPasswordLogin = async () => {
    const { data: signIn } = await supabase.auth.signInWithPassword({ email, password });
    setIncorrectCredentials(!signIn.user);

    const user = signIn?.user;

    if (user && user?.user_metadata?.address) {
      router.push(redirectUrl);
    } else if (user && !user?.user_metadata?.address) {
      router.push('/setup/address');
    }
  };

  const handleOAuthSignIn = async (provider: Provider) => {
    const { data } = await signInWithOauth(provider, redirectPath, supabase);

    setIncorrectCredentials(!data);
  };

  return (
    <BasicPageLayout heroTitle="Sign in" maxWidth="max-w-3xl">
      <div className="flex flex-col gap-9">
        {/* Login form */}
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-6">
            <InputGroup
              id="email"
              label="Email address"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <InputGroup
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {incorrectCredentials && (
            <div className="flex w-full justify-center text-[#D0342C]">
              <span>Incorrect Email or Password</span>
            </div>
          )}
          <button onClick={handleEmailPasswordLogin} type="submit" className="[ reunitable-button ]">
            Sign in
          </button>
        </div>
        {/* Or splitter */}
        <div className="relative">
          <hr />
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white px-6 text-gray-500">
            or
          </span>
        </div>

        {/* Google Sign in */}
        <GoogleButton buttonText="Sign in with Google" onClick={() => handleOAuthSignIn('google')} />

        <div className="flex flex-col gap-3">
          <Link className="text-lg text-alpha underline" href="/sign-in/forgotten-password">
            I&apos;ve forgotten my password
          </Link>
          <Link className="text-lg text-alpha underline" href="/buy-now">
            Buy Now
          </Link>
        </div>
      </div>
    </BasicPageLayout>
  );
}
