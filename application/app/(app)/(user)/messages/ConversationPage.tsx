'use client';

import { ConversationCard } from './ConversationCard';
import { ConversationMap } from './ConversationMap';
import characterImage7 from '/public/images/characters/7.svg';
import ContentArea from '@/components/app/ContentArea';
import { ConversationThread } from '@/components/app/conversation/ConversationThread';
import { LocationJSON } from '@/types/location';
import { ConversationWithSamaritanAndMessages, User } from '@/types/supabaseTypes';
import { formatDistance } from 'date-fns';
import _ from 'lodash';
import { useState } from 'react';

interface ConversationPageProps {
  conversations: ConversationWithSamaritanAndMessages[];
  user: User;
}

export const ConversationPage: React.FC<ConversationPageProps> = ({ conversations, user }) => {
  const [activeConversationId, setActiveConversationId] = useState(conversations[0]?.id ?? '');
  const [contentOpen, setContentOpen] = useState<boolean>(false);

  const activeConversation = conversations?.find((conversation) => conversation.id === activeConversationId);

  const handleConversationCardClick = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setContentOpen(true);
  };

  const location = activeConversation?.location ? (activeConversation.location as any as LocationJSON) : undefined;
  const orderedConversations = _.orderBy(
    conversations,
    (conversation) => _.orderBy(conversation.Message, (message) => message.createdAt, 'desc')[0]?.createdAt,
    'desc'
  );

  return (
    <ContentArea
      initalScreenName="inbox"
      contentOpen={contentOpen}
      setContentOpen={setContentOpen}
      navSlot={
        <>
          {orderedConversations &&
            orderedConversations.map((conversation) => {
              return (
                <ConversationCard
                  key={conversation.id}
                  conversation={conversation}
                  activeConversationId={activeConversationId}
                  onClick={() => handleConversationCardClick(conversation.id)}
                />
              );
            })}
          {orderedConversations.length === 0 && (
            <p className="p-6">Messages will appear here, but you haven't yet had a need for a good samaritan.</p>
          )}
        </>
      }
    >
      {activeConversation && (
        <>
          <div className="shrink-0 bg-error p-3 text-white">
            <p className="font-bold">
              QR Code Scanned{' '}
              <span className="font-normal italic">
                {formatDistance(new Date(activeConversation.createdAt!), new Date(), { addSuffix: true })}
              </span>
            </p>
            <p>{location?.display_name ?? 'Unknown location'}</p>
          </div>
          {activeConversation.longitude && activeConversation.latitude && (
            <ConversationMap conversation={activeConversation} />
          )}

          <ConversationThread
            key={activeConversation.id}
            conversation={activeConversation}
            markMessagesRead={true}
            fromSamaritan={false}
            tagOwner={user}
          />
        </>
      )}
      {!activeConversation && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
          <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full border-[6px] border-alpha-dark-600 bg-white">
            <img
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[40%] translate-y-36 scale-[350%]"
              src={characterImage7.src}
              alt=""
            />
          </div>
          <p className="">Please select a conversation</p>
        </div>
      )}
    </ContentArea>
  );
};
