'use client';

import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment, useEffect, useRef, useState } from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  iconComponent: React.ReactNode;
  buttonActionText: string;
  buttonCancelText?: string;
  colorClass: string;
  onCancelClicked?: () => void;
  onButtonClicked?: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({
  isOpen,
  title,
  iconComponent,
  buttonActionText,
  buttonCancelText = 'Cancel',
  colorClass,
  children,
  onCancelClicked,
  onButtonClicked
}) => {
  const [open, setOpen] = useState(isOpen);
  const cancelButton = useRef(null);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const onCancel = () => {
    onCancelClicked && onCancelClicked();
  };

  const onButton = () => {
    onButtonClicked && onButtonClicked();
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButton} onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full transform overflow-hidden rounded-t-lg bg-white text-left shadow-xl transition-all sm:max-w-2xl sm:rounded-lg">
                <div className="flex h-full max-h-[35rem] flex-col">
                  <div className={`relative shrink-0 ${colorClass}`}>
                    <div className="relative flex items-center gap-3 px-3 py-6 text-white sm:px-6">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
                        {iconComponent}
                      </div>
                      <Dialog.Title as="h3" className="grow font-heading text-xl font-medium leading-none">
                        {title}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-3 py-6 text-gray-700 sm:px-6">{children}</div>

                  <div className={clsx('flex shrink-0 items-center bg-gray-50 px-3 py-6 sm:px-6')}>
                    <div className="flex w-full justify-between gap-3 sm:gap-4">
                      {onCancelClicked && (
                        <button
                          type="button"
                          className="relative rounded-md border border-black border-opacity-20 bg-white py-3 px-6 font-heading font-medium text-gray-600 duration-150 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-black before:opacity-0 hover:before:opacity-[2.5%] focus:outline-none focus:ring-2 focus:ring-alpha focus:ring-offset-2"
                          onClick={onCancel}
                          ref={cancelButton}
                        >
                          <span className="relative">{buttonCancelText}</span>
                        </button>
                      )}
                      {onButtonClicked && (
                        <button
                          type="button"
                          className={`relative ${colorClass} rounded-md border border-black border-opacity-20 py-3 px-6 font-heading font-medium text-white duration-150 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-black before:opacity-0 hover:before:opacity-10 focus:outline-none focus:ring-2 focus:ring-alpha focus:ring-offset-2`}
                          onClick={onButton}
                        >
                          <span className="relative">{buttonActionText}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
