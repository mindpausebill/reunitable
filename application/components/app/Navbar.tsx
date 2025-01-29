'use client';

import ReunitableLogo from '../shared/Reunitable-logo';
import MobileNavbar from './MobileNavbar';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { UserNav } from '@/types/UserNav';
import { User } from '@/types/supabaseTypes';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  nav: UserNav[];
  serverUser?: User;
  unreadMessages: number;
}

export const Navbar: React.FC<Props> = ({ nav, serverUser, unreadMessages }) => {
  const { supabase } = useSupabase<'public'>();
  const pathname = usePathname() ?? '/';

  const handleSignOutClick = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Popover>
      {({ open }) => (
        <>
          <header
            className={clsx(
              'min-h-header relative flex w-full shrink-0 items-center justify-between gap-6 overflow-hidden bg-alpha-dark-600 py-6 px-3 lg:items-stretch',
              'lg:h-screen lg:min-w-[18rem] lg:max-w-[18rem] lg:flex-col lg:gap-0 lg:p-0',
              'xl:min-w-[21rem] xl:max-w-[21rem]'
            )}
          >
            {/* Header */}
            <div
              className={clsx(
                'relative contents flex-none overflow-hidden bg-alpha-dark-600',
                'lg:block lg:px-6 lg:py-12',
                'xl:py-16'
              )}
            >
              <div className="pointer-events-none absolute top-0 left-0 h-[200%] w-[200%] bg-gradient-to-br from-alpha to-alpha/0 lg:block"></div>
              <Link
                className={clsx(
                  'relative flex max-w-[10rem] translate-y-1 flex-col gap-6',
                  'lg:max-w-[14rem]',
                  'xl:max-w-[16rem]'
                )}
                href="/dashboard"
              >
                <ReunitableLogo />
              </Link>
            </div>

            {nav.length > 0 && (
              <Popover.Button className="relative flex aspect-square w-12 shrink-0 items-center justify-center rounded-full border-2 border-alpha-light-300 text-white duration-150 hover:text-white lg:hidden">
                <Menu />
              </Popover.Button>
            )}

            {/* Navigation */}
            <nav className={clsx('hidden grow overflow-y-auto py-12 text-alpha-light-300', 'lg:block')}>
              <ul>
                {nav.map((item) => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className={clsx(
                        'hover:bg-alpha-900 flex w-full items-center justify-between p-6 duration-150 hover:text-white',
                        item.url === '/' + pathname.split('/')[1] && 'bg-alpha-dark-700/80 text-white'
                      )}
                    >
                      <span>{item.name}</span>
                      {item.name === 'Messages' && unreadMessages > 0 && (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-error text-xs font-black leading-none text-white">
                          {unreadMessages > 99 ? '99+' : unreadMessages}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* User naviagtion */}
            {serverUser && (
              <div
                className={clsx(
                  'sticky bottom-0 mt-auto hidden flex-none items-center justify-between gap-6 bg-alpha-dark-700 p-6',
                  'lg:flex'
                )}
              >
                <div className="flex min-w-0 flex-col items-start">
                  <p
                    className={clsx('w-full truncate font-heading text-white duration-150', 'lg:text-lg', 'xl:text-xl')}
                  >
                    {serverUser?.firstName ?? 'Unknown'} {serverUser?.lastName ?? ''}
                  </p>
                  <button onClick={handleSignOutClick} className="text-alpha-light-300 duration-150 hover:text-white">
                    Sign out
                  </button>
                </div>
                <div className="flex items-center gap-1 text-white duration-150">
                  <div className="relative h-16 w-16 rounded-full bg-bravo-light-700 duration-150">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-2xl text-bravo">
                      {(serverUser?.firstName ?? 'Unknown').charAt(0)}
                      {serverUser?.lastName ? serverUser?.lastName.charAt(0) : ''}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </header>

          <MobileNavbar items={nav} open={open} serverUser={serverUser} unreadMessages={unreadMessages} />
        </>
      )}
    </Popover>
  );
};
