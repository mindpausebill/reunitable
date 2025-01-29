'use client';

import Container from '../../shared/Container';
import ReunitableLogo from '../../shared/Reunitable-logo';
import MainNavigation from './MainNavigation';
import MobileNav from './MobileNav';
import { useUserNav } from '@/lib/loaders/nav/userNav/useUserNav';
import { Popover } from '@headlessui/react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

interface Props {}

export const Header: React.FC<Props> = ({}) => {
  const userNav = useUserNav();
  return (
    <Popover>
      {({ open }) => (
        <>
          <header className="min-h-header relative w-full py-6 lg:py-9">
            <Container className="flex items-center justify-between gap-6">
              <Link
                className="relative flex h-auto max-w-[12rem] translate-y-1 flex-col gap-6 xl:max-w-[14rem]"
                href="/"
              >
                <ReunitableLogo />
              </Link>

              <MainNavigation items={userNav} />

              <Popover.Button className="flex aspect-square w-12 shrink-0 items-center justify-center rounded-full border-2 border-alpha-light-300 text-white duration-150 hover:text-white lg:hidden">
                <Menu />
              </Popover.Button>
            </Container>
          </header>

          <MobileNav items={userNav} open={open} />
        </>
      )}
    </Popover>
  );
};
