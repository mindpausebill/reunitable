'use client';

import { Nav } from '@/types/nav';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment } from 'react';

export interface MobileNavProps {
  items: Nav[];
  open: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ items, open }) => {
  const pathname = usePathname() ?? '/';

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
        <div className="backdrop-blur-xs fixed inset-0 z-20 bg-alpha-dark-800/80"></div>
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
        <Popover.Panel className="fixed right-0 top-0 z-20 flex h-full min-h-screen w-[85vw] max-w-[24rem] shadow-md">
          <nav className="relative w-full bg-alpha-dark-600 py-6">
            <div className="absolute inset-0 bg-gradient-to-br from-alpha-dark-300 to-alpha/0"></div>
            <div className="relative flex grow flex-col overflow-y-auto">
              <div className="flex w-full justify-end px-3">
                <Popover.Button
                  className={clsx(
                    open ? 'text-white' : 'text-alpha-light-300',
                    'flex aspect-square w-12 shrink-0 items-center justify-center rounded-full border-2 border-alpha-light-300 duration-150 hover:text-white xl:hidden'
                  )}
                >
                  <X />
                </Popover.Button>
              </div>

              <ul className="bg-comAlpha-200 mt-6 flex grow flex-col border-t border-alpha-dark-500">
                <li className="border-b border-alpha-dark-500">
                  <Popover.Button
                    as={Link}
                    className={clsx(
                      'block px-3 py-4 font-heading duration-150 hover:text-white',
                      '/' === '/' + pathname.split('/')[1] ? 'text-white' : 'text-alpha-light-400'
                    )}
                    href="/"
                  >
                    Home
                  </Popover.Button>
                </li>
                {items.map((item) => (
                  <li className="border-b border-alpha-dark-500" key={item.name}>
                    <Popover.Button
                      as={Link}
                      className={clsx(
                        'block px-3 py-4 font-heading duration-150 hover:text-white',
                        item.url === '/' + pathname.split('/')[1] ? 'text-white' : 'text-alpha-light-400'
                      )}
                      href={item.url}
                    >
                      {item.name}
                    </Popover.Button>
                  </li>
                ))}
                <li className="border-b border-alpha-dark-500">
                  <Popover.Button
                    as={Link}
                    className={clsx(
                      'block px-3 py-4 font-heading duration-150 hover:text-white',
                      '/buy-now' === '/' + pathname.split('/')[1] ? 'text-white' : 'text-alpha-light-400'
                    )}
                    href="/buy-now"
                  >
                    Buy Now
                  </Popover.Button>
                </li>
              </ul>
            </div>
          </nav>
        </Popover.Panel>
      </Transition>
    </div>
  );
};

export default MobileNav;
