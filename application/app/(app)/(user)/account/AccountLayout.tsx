'use client';

import ContentArea from '@/components/app/ContentArea';
import { useAccountNav } from '@/lib/loaders/nav/accountNav/useAccountNav';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';

interface AccountLayoutProps {}

export const AccountLayout: React.FC<PropsWithChildren<AccountLayoutProps>> = ({ children }) => {
  const [contentOpen, setContentOpen] = useState<boolean>(false);
  const accountNav = useAccountNav();
  const pathname = usePathname() ?? '/';

  return (
    <ContentArea
      initalScreenName="account"
      contentOpen={contentOpen}
      setContentOpen={setContentOpen}
      navSlot={
        accountNav &&
        accountNav.map((navItem) => (
          <div key={navItem.url}>
            <Link
              href={navItem.url}
              onClick={() => setContentOpen(true)}
              className={clsx(
                'flex w-full items-center gap-6 border-b p-6 text-left font-bold',
                navItem.url === pathname && 'bg-bravo-light text-bravo-darkest'
              )}
            >
              {navItem.name}
            </Link>
          </div>
        ))
      }
    >
      <div className="h-screen overflow-y-auto p-3 lg:p-6">{children}</div>
    </ContentArea>
  );
};
