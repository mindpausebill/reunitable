'use client';

import NorthLinkLogo from './NorthLinkLogo';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export const Header: React.FC = () => {
  const { supabase, session } = useSupabase<'public'>();

  const handleSignOutClick = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-nsAdmin-900 relative z-30 flex w-full items-center justify-between gap-24 px-3 shadow-sm md:px-6">
      <Link href="/" className="shrink-0 py-8">
        <NorthLinkLogo className="h-9 text-white" />
      </Link>

      <Link href={!session ? '/sign-in?redirectUrl=/admin' : '#'}>
        <div
          onClick={() => handleSignOutClick()}
          className={clsx(
            'text-nsAdmin-50 | group relative z-20 hidden cursor-pointer items-center gap-2 font-heading font-bold duration-150 hover:text-white lg:flex'
          )}
        >
          <span className="relative py-9">{session ? 'Sign Out' : 'Sign In'}</span>
          <ArrowRightIcon className="| h-4 w-4 duration-150 group-hover:translate-x-1" />
        </div>
      </Link>
    </header>
  );
};
