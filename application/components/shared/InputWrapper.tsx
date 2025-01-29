'use client';

import { PropsWithChildren } from 'react';

export interface InputWrapperProps {
  id: string;
  label?: string;
  required: boolean;
  showOptionalText: boolean;
  icon: React.ReactNode;
}

const InputWrapper = ({
  id,
  label,
  required,
  showOptionalText,
  icon,
  children
}: PropsWithChildren<InputWrapperProps>) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={id}>
          {label} {!required && showOptionalText && <small>(optional)</small>}
        </label>
      )}
      <div className="bg-alpha-800 border-alpha-600 | focus-within:border-alpha-400 group relative w-full rounded-lg border duration-150">
        {icon && (
          <div className="text-alpha-600 | group-focus-within:text-alpha-400 absolute top-1/2 left-0 h-6 w-6 translate-x-4 -translate-y-1/2 duration-150">
            {icon}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default InputWrapper;
