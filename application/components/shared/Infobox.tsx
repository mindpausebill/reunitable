'use client';

import { InfoType } from '@/types/Infobox';
import clsx from 'clsx';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import React, { PropsWithChildren, useEffect, useState } from 'react';

interface Props {
  type: InfoType;
  dismissible?: boolean;
  visible?: boolean;
  onClose?: () => void;
}

export const Infobox: React.FC<PropsWithChildren<Props>> = ({
  type,
  children,
  dismissible = true,
  visible,
  onClose
}) => {
  const [isShowing, setShowing] = useState(visible);

  const handleClose = () => {
    onClose && onClose();
    setShowing(false);
  };

  useEffect(() => {
    setShowing(visible);
  }, [visible]);

  if (!isShowing) return null;

  const color = (type: InfoType) => {
    if (type === InfoType.Success) return 'text-success-dark';
    if (type === InfoType.Error) return 'text-error-dark';
    if (type === InfoType.Warn) return 'text-warning-dark';
    if (type === InfoType.Info) return 'text-alpha-dark-600';
  };

  const colorBorder = (type: InfoType) => {
    if (type === InfoType.Success) return 'border-success-dark';
    if (type === InfoType.Error) return 'border-error-dark';
    if (type === InfoType.Warn) return 'border-warning-dark';
    if (type === InfoType.Info) return 'border-alpha-dark-600';
  };

  const colorBackground = (type: InfoType) => {
    if (type === InfoType.Success) return 'bg-success-lightest';
    if (type === InfoType.Error) return 'bg-error-lightest';
    if (type === InfoType.Warn) return 'bg-warning-lightest';
    if (type === InfoType.Info) return 'bg-alpha-light-100/50';
  };

  const icon = (type: InfoType) => {
    if (type === InfoType.Success) return <CheckCircle className="h-6 w-6 shrink-0" aria-hidden="true" />;
    if (type === InfoType.Error) return <AlertTriangle className="h-6 w-6 shrink-0" aria-hidden="true" />;
    if (type === InfoType.Warn) return <AlertCircle className="h-6 w-6 shrink-0" aria-hidden="true" />;
    if (type === InfoType.Info) return <Info className="h-6 w-6 shrink-0" aria-hidden="true" />;
  };

  return (
    <div
      className={clsx(
        'relative flex justify-between overflow-hidden rounded-lg border p-6',
        colorBackground(type),
        colorBorder(type)
      )}
    >
      <div className={clsx('flex flex-col gap-6 lg:flex-row lg:items-center', color(type))}>
        {icon(type)}
        <div>{children}</div>
      </div>
      {dismissible && (
        <div>
          <button className="absolute top-0 right-0 p-2" onClick={handleClose}>
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};
