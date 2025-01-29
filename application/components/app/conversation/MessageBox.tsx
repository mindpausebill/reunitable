'use client';

import { MessagePhoto } from './MessagePhoto';
import { Message } from '@/types/supabaseTypes';
import clsx from 'clsx';
import { formatDistance } from 'date-fns';
import React from 'react';

interface MessageBoxProps {
  message: Message;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
  return (
    <div
      className={clsx(
        'relative inline-flex w-full max-w-2xl flex-col gap-1 rounded-md p-3 shadow-md',
        !message.fromSamaritan ? 'mr-2 self-end bg-success-light' : 'ml-2 bg-alpha'
      )}
    >
      <svg
        className={clsx(
          'absolute w-3',
          !message.fromSamaritan
            ? 'right-0 translate-x-2 rotate-180 text-success-light'
            : 'left-0 -translate-x-2 text-alpha'
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 9 12"
      >
        <path
          fill="currentColor"
          d="M1.03 6.792a1 1 0 0 1 0-1.584L7.39.31A1 1 0 0 1 9 1.104v9.792a1 1 0 0 1-1.61.793L1.03 6.792Z"
        />
      </svg>

      <p className={clsx(!message.fromSamaritan ? 'text-success-darkest' : 'text-white')}>{message.message}</p>
      {message.photo && <MessagePhoto message={message} />}
      <p className={clsx('text-sm', !message.fromSamaritan ? 'text-success-dark' : 'text-alpha-light-300')}>
        {formatDistance(new Date(message.createdAt!), new Date(), { addSuffix: true })}
      </p>
    </div>
  );
};

export default MessageBox;
