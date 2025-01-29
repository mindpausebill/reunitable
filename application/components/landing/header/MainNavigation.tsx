'use client';

import { Nav } from '@/types/nav';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export interface MainNavigationProps {
  items: Nav[];
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ items }) => {
  const pathname = usePathname() ?? '/';

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-6 font-heading text-alpha-light-300 xl:gap-12">
        {items.map((item) => (
          <li key={item.url}>
            <Link
              href={item.url}
              className={clsx(
                'block duration-150 hover:text-white',
                item.url === '/' + pathname.split('/')[1] && 'text-white'
              )}
            >
              <span className="relative">
                {item.name}
                {item.url === '/' + pathname.split('/')[1] && (
                  <motion.div
                    className="absolute bottom-0 left-0 flex w-full justify-center"
                    layoutId="highlight-desktop"
                    layout="position"
                    transition={{
                      type: 'spring',
                      duration: 0.05,
                      stiffness: 45,
                      damping: 10
                    }}
                  >
                    <div className="h-0.5 w-full translate-y-3 rounded-full bg-bravo duration-150"></div>
                  </motion.div>
                )}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <Link
            className="block rounded-full border-2 border-charlie bg-charlie px-6  py-2 text-alpha-dark-600 duration-150 hover:border-bravo hover:bg-bravo"
            href="/buy-now"
          >
            Buy Now
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
