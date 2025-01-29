import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment, PropsWithChildren, useEffect, useState } from 'react';

export interface SlidePanelProps {
  isOpen: boolean;
  onCancelClicked: () => void;
  maxWidth?: string;
}

const SlidePanel = ({
  isOpen,
  onCancelClicked,
  maxWidth = 'max-w-xl',
  children
}: PropsWithChildren<SlidePanelProps>) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const onCancel = () => {
    onCancelClicked && onCancelClicked();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancelClicked}>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-1"
          leave="transform transition ease-in-out duration-500"
          leaveFrom="opacity-1"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-alpha-dark-800/80 backdrop-blur-xs" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-12">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-650"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-650"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={`pointer-events-auto w-screen ${maxWidth}`}>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white">
                    <div className="absolute top-0 right-0">
                      <button
                        type="button"
                        className="| rounded-full p-6 text-gray-400 duration-150 hover:text-alpha-dark-600"
                        onClick={onCancel}
                      >
                        <span className="sr-only">Close panel</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-24 flex-1 px-6">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlidePanel;
