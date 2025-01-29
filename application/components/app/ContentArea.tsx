'use client';

import clsx from 'clsx';
import { ArrowLeftCircle } from 'lucide-react';
import React, { PropsWithChildren, useState } from 'react';

export interface ContentAreaProps {
  includeNav?: boolean;
  navSlot?: React.ReactNode;
  initalScreenName?: string;
  contentOpen?: boolean;
  setContentOpen: (contentOpen: boolean) => void;
}

const ContentArea: React.FC<PropsWithChildren<ContentAreaProps>> = ({
  children,
  includeNav = true,
  navSlot,
  initalScreenName,
  contentOpen,
  setContentOpen
}) => {
  return (
    <div className={clsx('flex w-screen overflow-hidden', 'lg:w-auto')}>
      {navSlot && (
        <div
          className={clsx(
            'relative z-10 flex h-content-area w-full shrink-0 flex-col overflow-y-auto bg-white shadow-lg',
            'lg:h-screen lg:min-w-[18rem] lg:max-w-[18rem] lg:flex-col lg:gap-0 lg:p-0',
            'xl:min-w-[21rem] xl:max-w-[21rem]'
          )}
        >
          {navSlot}
        </div>
      )}
      <div
        className={clsx(
          'min-w-screen z-20 w-full shrink-0 grow duration-300',
          contentOpen ? '-translate-x-full lg:translate-x-0' : 'translate-x-0',
          'lg:z-0 lg:w-auto lg:min-w-0 lg:shrink'
        )}
      >
        <div className={clsx('flex h-content-area grow flex-col bg-alpha-light-100', 'lg:h-screen')}>
          {includeNav &&
            <button
              className={clsx('flex shrink-0 items-center gap-1.5 bg-alpha p-3 text-white', 'lg:hidden')}
              onClick={() => setContentOpen(false)}
            >
              <ArrowLeftCircle className="h-5 w-5" strokeWidth={2} />
              <span className="leading-none">Back to {initalScreenName}</span>
            </button>
          }
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
