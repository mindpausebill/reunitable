import MessageBox from './MessageBox';
import { ShareLocationType } from './ShareLocationModal';
import { MessageFooter } from '@/components/app/conversation/MessageFooter';
import SlidePanel from '@/components/shared/SlidePanel';
import { useUpdateConversation } from '@/lib/loaders/conversation/useUpdateConversation';
import { useClientMessages } from '@/lib/loaders/message/useClientMessages';
import { useInsertMessage } from '@/lib/loaders/message/useInsertMessage';
import { useInsertMessageWithPhoto } from '@/lib/loaders/message/useInsertMessageWithPhoto';
import { useRealtimeMessages } from '@/lib/loaders/message/useRealtimeMessages';
import { useUpdateMessage } from '@/lib/loaders/message/useUpdateMessage';
import { ConversationWithSamaritanAndMessages, User } from '@/types/supabaseTypes';
import clsx from 'clsx';
import _ from 'lodash';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ConversationThreadProps {
  conversation: ConversationWithSamaritanAndMessages;
  tagOwner: User;
  markMessagesRead: boolean;
  fromSamaritan: boolean;
  emptyComponent?: React.ReactNode;
  showLocationButton?: boolean;
  showCameraButton?: boolean;
}

export const ConversationThread: React.FC<ConversationThreadProps> = ({
  conversation,
  tagOwner,
  markMessagesRead,
  fromSamaritan,
  emptyComponent,
  showLocationButton,
  showCameraButton
}) => {
  const { data: messages } = useClientMessages(conversation.id);
  const { status } = useRealtimeMessages(conversation.id);
  const { trigger: insertMessage } = useInsertMessage();
  const { trigger: insertMessageWithPhoto } = useInsertMessageWithPhoto();
  const { trigger: updateMessage } = useUpdateMessage();
  const { trigger: updateConversation } = useUpdateConversation();

  const router = useRouter();

  const thisConversationSamaritan = _.isArray(conversation.Samaritan)
    ? conversation.Samaritan[0]
    : conversation.Samaritan;

  const onMessage = async (message: string, location?: ShareLocationType) => {
    await insertMessage([
      {
        conversationId: conversation.id,
        message,
        fromSamaritan: fromSamaritan,
        read: false
      }
    ]);
  };

  const onLocation = async (location: ShareLocationType) => {
    console.log('onLocation', location);
    const localName = fromSamaritan ? thisConversationSamaritan.name : tagOwner.firstName;
    const locationString =
      location.reverseLookup?.display_name ?? `[${location.geoLocation?.latitude},${location.geoLocation?.longitude}]`;
    const shareLocationMessage = `${localName} has updated their current location to : ${locationString}`;
    await insertMessage([
      {
        conversationId: conversation.id,
        message: shareLocationMessage,
        fromSamaritan: fromSamaritan,
        read: false,
        longitude: location.geoLocation?.longitude,
        latitude: location.geoLocation?.latitude,
        location: location.reverseLookup
      }
    ]);
  };

  const onPhoto = async (photo: any) => {
    const localName = fromSamaritan ? thisConversationSamaritan.name : tagOwner.firstName;
    const sharePhotoMessage = `${localName} has uploaded a photo`;

    insertMessageWithPhoto(
      [
        {
          conversationId: conversation.id,
          message: sharePhotoMessage,
          fromSamaritan: fromSamaritan,
          read: false
        }
      ],
      {
        photo: [photo]
      },
      {
        insert: {
          onSuccess: () => console.log('SUCCESSFULLY INSERTED'),
          onError: () => console.log('FAILED TO INSERT')
        },
        upload: {
          onSuccess: () => console.log('SUCCESSFULLY UPLOADED'),
          onError: () => console.log('FAILED TO UPLOAD')
        },
        upsert: {
          onSuccess: () => console.log('SUCCESSFULLY UPSERTED'),
          onError: () => console.log('FAILED TO UPSERT')
        }
      }
    );
  };

  const orderedMessages = _.orderBy(messages ?? [], 'createdAt', 'asc');
  useEffect(() => {
    // If there are any messages that are unread, update them all to read
    const markAllMessagesRead = async () => {
      const unreadMessages = (messages ?? []).filter((message) => !message.read);

      if (
        conversation?.responseStatus === 'primaryUserNotified' ||
        conversation?.responseStatus === 'secondaryUserNotified'
      ) {
        updateConversation({ ..._.omit(conversation, ['Message', 'Samaritan']), responseStatus: 'conversationSeen' });
      }

      if (unreadMessages.length > 0) {
        for (const message of unreadMessages) {
          await updateMessage({ ...message, read: true });
        }

        router.refresh();
      }
    };
    if (markMessagesRead) {
      markAllMessagesRead();
    }
  }, [messages]);

  if (!conversation) return null;

  const [helpOpen, setHelpOpen] = useState(false);

  const remoteName = fromSamaritan ? tagOwner.firstName : thisConversationSamaritan.name;
  return (
    <>
      <div className="flex h-conversation flex-col overflow-y-auto">
        {/* Messages */}
        <div className="flex shrink grow flex-col gap-12 py-12 px-6">
          <div className="flex flex-col gap-1 text-center">
            <p>You're connected with {remoteName}</p>
            <button className="text-sm italic text-alpha-dark-100 underline" onClick={() => setHelpOpen(true)}>
              Please be safe when using reunitable
            </button>
          </div>
          <div className={clsx('flex flex-col gap-6', orderedMessages.length !== 0 && 'mt-auto')}>
            {orderedMessages.length === 0 && emptyComponent && <>{emptyComponent}</>}
            {orderedMessages.length > 0 &&
              orderedMessages.map((message) => <MessageBox key={message.id} message={message} />)}
          </div>
        </div>
      </div>
      {/* Footer */}
      <MessageFooter
        onMessage={onMessage}
        onLocation={showLocationButton ? onLocation : undefined}
        onPhoto={showCameraButton ? onPhoto : undefined}
      />
      {/* Help */}
      <SlidePanel isOpen={helpOpen} onCancelClicked={() => setHelpOpen(false)}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-alpha-dark-600">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="font-heading text-2xl">Please be safe!</h2>
          </div>
          <p>We want you to be safe when using reunitable, please read and follow the guidelines below;</p>
          <ul className="flex list-inside list-disc flex-col gap-6">
            <li>
              <strong>Tell a friend where you’re going.</strong> Let at least one friend know where and when you plan to
              go to retrieve your lost item and where possible take a friend with you.
            </li>
            <li>
              <strong>Meet in a public place.</strong> Avoid meeting in an unfamiliar place, and where possible make it
              a public place such as a bar, cafe or even the police station.
            </li>
          </ul>
        </div>
      </SlidePanel>
    </>
  );
};
