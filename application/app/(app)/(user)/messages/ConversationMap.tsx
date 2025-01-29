import { OwnLocation } from './OwnLocation';
import { ConversationWithSamaritanAndMessages } from '@/types/supabaseTypes';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import React, { useEffect, useState } from 'react';

interface ConversationMapProps {
  conversation: ConversationWithSamaritanAndMessages;
}

/*
  https://pigeon-maps.js.org/docs/marker
  https://pigeon-maps.js.org/docs/overlay
*/

export const ConversationMap: React.FC<ConversationMapProps> = ({ conversation }) => {
  const [center, setCenter] = useState<[number, number]>([conversation.latitude ?? 0, conversation.longitude ?? 0]);

  useEffect(() => {
    if (conversation.latitude && conversation.longitude) {
      setCenter([conversation.latitude, conversation.longitude]);
    }
  }, [conversation]);

  if (!conversation.latitude || !conversation.longitude) return null;
  return (
    <>
      <div className="h-24 shrink-0 lg:h-96">
        <Map center={center} defaultCenter={[conversation.latitude, conversation.longitude]} defaultZoom={14}>
          <Marker width={36} anchor={[conversation.latitude, conversation.longitude]} />
          <ZoomControl />
        </Map>
      </div>
      <OwnLocation target={[conversation.latitude, conversation.longitude]} />
    </>
  );
};
