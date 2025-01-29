'use client';

import { CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface StepsProps {
  totalSteps: number;
  currentStep: number;
}

export const Steps: React.FC<StepsProps> = ({ totalSteps, currentStep }) => {
  return (
    <div>
      <ol className="inline-flex flex-wrap items-center justify-center gap-3">
        {[...Array(totalSteps)].map((step, i) => (
          <li
            key={'step-' + i}
            className={clsx(
              'relative aspect-square w-9 rounded-full border-2 font-heading font-bold leading-none',
              i + 1 === currentStep
                ? 'text-alpha-900 border-alpha bg-alpha text-white'
                : currentStep > i + 1
                ? 'border-success bg-success text-white'
                : 'border-dashed border-gray-400 text-gray-400'
            )}
            title={'step ' + (i + 1) + (i + 1 < currentStep ? ' complete' : '')}
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {i + 1 < currentStep ? <CheckIcon className="h-3 w-3 stroke-[4px]" /> : i + 1}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
