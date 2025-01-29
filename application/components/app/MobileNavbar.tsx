'use client';

import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { UserNav } from '@/types/UserNav';
import { User } from '@/types/supabaseTypes';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment } from 'react';

export interface MobileNavbarProps {
  items: UserNav[];
  open: boolean;
  serverUser?: User;
  unreadMessages: number;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ items, open, serverUser, unreadMessages }) => {
  const pathname = usePathname() ?? '/';

  const { supabase, session } = useSupabase<'public'>();

  const handleSignOutClick = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="lg:hidden">
      <Transition
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="backdrop-blur-xs fixed inset-0 z-40 bg-alpha-dark-800/80"></div>
      </Transition>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-full"
      >
        <Popover.Panel className="fixed right-0 top-0 z-50 flex h-full min-h-screen w-[85vw] max-w-[24rem] shadow-md">
          <nav className="relative w-full bg-alpha-dark-600 pt-6">
            <div className="absolute inset-0 bg-gradient-to-br from-alpha-dark-300 to-alpha/0"></div>
            <div className="relative flex h-full grow flex-col overflow-y-auto">
              <div className="flex w-full justify-end px-3">
                <Popover.Button
                  className={clsx(
                    open ? 'text-white' : 'text-alpha-light-300',
                    'flex aspect-square w-12 shrink-0 items-center justify-center rounded-full border-2 border-alpha-light-300 duration-150 hover:text-white lg:hidden'
                  )}
                >
                  <X />
                </Popover.Button>
              </div>

              <ul className="bg-comAlpha-200 mt-6 flex grow flex-col border-t border-alpha-dark-500">
                {items.map((item) => (
                  <li className="border-b border-alpha-dark-500" key={item.name}>
                    <Popover.Button
                      as={Link}
                      className={clsx(
                        'flex justify-between gap-6 px-3 py-4 duration-150 hover:text-white',
                        item.url === '/' + pathname.split('/')[1] ? 'text-white' : 'text-alpha-light-400'
                      )}
                      href={item.url}
                    >
                      {item.name}
                      {item.name === 'Messages' && unreadMessages > 0 && (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-error text-xs font-black leading-none text-white">
                          {unreadMessages > 99 ? '99+' : unreadMessages}
                        </span>
                      )}
                    </Popover.Button>
                  </li>
                ))}

                {serverUser && (
                  <li className="mt-auto flex items-center justify-between gap-6 bg-alpha-dark-700 p-6">
                    <div className="flex flex-col items-start">
                      <p className="font-heading text-xl text-white duration-150">
                        {serverUser?.firstName ?? 'Unknown'} {serverUser?.lastName ?? ''}
                      </p>
                      <button
                        onClick={handleSignOutClick}
                        className="| text-alpha-light-300 duration-150 hover:text-white"
                      >
                        Sign out
                      </button>
                    </div>
                    <div className="flex items-center gap-1 text-white duration-150">
                      <div className="relative h-16 w-16 rounded-full bg-bravo-light duration-150">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-2xl text-bravo-mid">
                          {(serverUser?.firstName ?? 'Unknown').charAt(0)}
                          {serverUser?.lastName ? serverUser?.lastName.charAt(0) : ''}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </Popover.Panel>
      </Transition>
    </div>
  );
};

export default MobileNavbar;
