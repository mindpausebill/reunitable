import ContentArea from '@/components/app/ContentArea';
import { ConversationThread } from '@/components/app/conversation/ConversationThread';
import { getReverseLookupClient } from '@/lib/getReverseLookupClient';
import { LocationCoords, useGeolocation } from '@/lib/hooks/useGeolocation';
import { useUpdateConversation } from '@/lib/loaders/conversation/useUpdateConversation';
import { ConversationWithSamaritanAndMessages, Samaritan, User } from '@/types/supabaseTypes';
import clsx from 'clsx';
import { useEffect } from 'react';

interface MessagesWindowProps {
  tagOwner: User;
  samaritan: Samaritan;
  shareLocation: boolean;
  conversation: ConversationWithSamaritanAndMessages;
}

export const MessagesWindow: React.FC<MessagesWindowProps> = ({ tagOwner, samaritan, conversation, shareLocation }) => {
  const location = useGeolocation(
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 12000
    },
    shareLocation
  );
  const { trigger: updateConversation } = useUpdateConversation();

  // If we obtain a location, and the conversation currently doesn't have one, update it
  useEffect(() => {
    const updateConversationWithLocation = async (
      conversation: ConversationWithSamaritanAndMessages,
      location?: LocationCoords
    ) => {
      const lat = location?.latitude;
      const lon = location?.longitude;
      if (conversation.latitude === null && conversation.longitude === null && lat && lon) {
        const location = await getReverseLookupClient().reverse({ lat, lon });
        await updateConversation({
          id: conversation.id,
          latitude: lat,
          longitude: lon,
          location: location
        });
      }
    };
    updateConversationWithLocation(conversation, location);
  }, [conversation, location]);

  const emptyComponent = () => {
    return (
      <div className="flex w-full max-w-[16rem] flex-col gap-6 text-center mx-auto">
        <p className="text-xl">
          Hi {samaritan.name}, let {tagOwner.firstName} know you’ve found his lost item and arrange a place to meet.
        </p>
        <p>We’re sure {tagOwner.firstName} will be relieved to hear from you!</p>
      </div>
    );
  };

  const messages = conversation?.Message;

  return (
    <ContentArea contentOpen={false} setContentOpen={ () => {} } includeNav={false}>
      <ConversationThread
        key={conversation.id}
        conversation={conversation}
        tagOwner={tagOwner}
        markMessagesRead={false}
        fromSamaritan={true}
        emptyComponent={emptyComponent()}
        showLocationButton
        showCameraButton
      />
    </ContentArea>
  );
};
