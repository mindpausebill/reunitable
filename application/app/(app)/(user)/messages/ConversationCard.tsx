import { LocationJSON } from '@/types/location';
import { ConversationWithSamaritanAndMessages } from '@/types/supabaseTypes';
import clsx from 'clsx';
import { formatDistance } from 'date-fns';
import _ from 'lodash';

interface ConversationCardProps {
  activeConversationId: string;
  conversation: ConversationWithSamaritanAndMessages;
  onClick?: () => void;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({ conversation, activeConversationId, onClick }) => {
  const thisConversationSamaritan = _.isArray(conversation.Samaritan)
    ? conversation.Samaritan[0]
    : conversation.Samaritan;
  const lastMessageInConversation = conversation.Message.slice(-1);

  // Use reduce to count the number of unread messages
  const messages = conversation.Message ?? [];
  const unread = messages.reduce((acc, message) => {
    return message.read ? acc : acc + 1;
  }, 0);

  const active = activeConversationId === conversation.id;

  const getLocationLabel = (location: LocationJSON) => {
    const address = location?.address;
    if (address?.suburb && address?.city) return `${address?.suburb}, ${address?.city}`;
    if (address?.suburb) return `${address?.suburb}}`;
    if (address?.city) return `${address?.city}}`;
    return `Unknown Location`;
  };

  return (
    <button
      onClick={onClick}
      className={clsx('flex w-full items-center gap-6 border-b p-6 text-left', active && 'bg-bravo-light')}
    >
      <div className="flex min-w-0 grow flex-col">
        <p className={clsx('font-bold', active ? 'text-bravo-darkest' : 'text-alpha-dark-800')}>
          {thisConversationSamaritan.name}
        </p>
        <p className={clsx('truncate font-bold', active ? 'text-bravo-darkest' : 'text-alpha-dark-800')}>
          {formatDistance(new Date(conversation.createdAt!), new Date(), { addSuffix: true })}
          &nbsp;&middot;&nbsp;
          {getLocationLabel(conversation.location as any as LocationJSON)}
        </p>
        <p className={clsx('truncate text-sm', active ? 'text-bravo-dark' : 'text-gray-600')}>
          {lastMessageInConversation[0]?.message}
        </p>
      </div>
      {unread !== 0 && (
        <span className="round-full flex aspect-square h-6 items-center justify-center rounded-full bg-error text-xs font-black leading-none text-white">
          {unread}
        </span>
      )}
    </button>
  );
};
