'use client';

import { ChatPage } from './ChatPage';
import { ShareLocationChooser } from './ShareLocationChooser';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { useClientConversationsForSamaritan } from '@/lib/loaders/conversation/forSamaritan/useClientConversationsForSamaritan';
import { useInsertConversation } from '@/lib/loaders/conversation/useInsertConversation';
import { useClientSamaritan } from '@/lib/loaders/samaritan/useClientSamaritan';
import { useInsertSamaritan } from '@/lib/loaders/samaritan/useInsertSamaritan';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { User } from '@/types/supabaseTypes';
import { useState } from 'react';

interface SamaritanPageProps {
  tagOwner: User;
  user?: User;
  customerOrgId: string;
}

export const SamaritanPage = ({ tagOwner, user, customerOrgId }: SamaritanPageProps) => {
  const { supabase } = useSupabase<'public'>();
  const [samaritanId, setSamaritanId] = useLocalStorage('samId', '');
  const { data: samaritan, mutate: mutateSamaritan } = useClientSamaritan(samaritanId === '' ? null : samaritanId);
  const { data: conversation, mutate: mutateConversation } = useClientConversationsForSamaritan(
    samaritanId,
    customerOrgId
  );
  const { trigger: insertSamaritan } = useInsertSamaritan();
  const { trigger: insertConversation } = useInsertConversation();

  const [shareLocation, setShareLocation] = useState<boolean | null>(null);
  const [userReached, setUserReached] = useState<{ waiting: boolean; reached: boolean }>();

  const onSamaritanCleared = () => {
    setSamaritanId('');
  };

  const handleStartChatClick = async (shareLocation: boolean) => {
    // If the user is logged in (so we know who they are) but there is no samaritan record yet, create one
    if (user?.firstName && !samaritan) {
      await insertSamaritan([{ name: user.firstName }], {
        onSuccess: async (data, key, config) => {
          const samaritanId = data?.[0]?.id;
          if (samaritanId) setSamaritanId(samaritanId);
        },
        onError: (err, key, config) => {
          console.log('ShareLocationChooser::insertSamaritan::onError', err, key, config);
        }
      });
    }
    if (samaritan && !conversation) {
      const newConversations = await insertConversation([{ organisationId: customerOrgId, samaritanId: samaritanId }]);

      if (newConversations?.[0]) {
        checkUserReply(newConversations[0].id);
      }

      // Handle errors?!
    }
    setShareLocation(shareLocation);
  };

  const handleNameChosen = async (name: string) => {
    await insertSamaritan([{ name }], {
      onSuccess: async (data, key, config) => {
        const samaritanId = data?.[0]?.id;
        if (samaritanId) {
          setSamaritanId(samaritanId);
          const newConversations = await insertConversation([
            { organisationId: customerOrgId, samaritanId: samaritanId }
          ]);

          if (newConversations?.[0]) {
            checkUserReply(newConversations[0].id);
          }
        }

        mutateSamaritan();
        mutateConversation();
      },
      onError: (err, key, config) => {
        console.log('ShareLocationChooser::ChatPage::onError', err, key, config);
      }
    });
  };

  const checkUserReply = (conversationId: string) => {
    setUserReached({ waiting: true, reached: false });

    setTimeout(
      async () => {
        const { data: conversationMessages } = await supabase
          .from('Message')
          .select()
          .eq('conversationId', conversationId)
          .eq('fromSamaritan', false);

        if (conversationMessages && conversationMessages?.length > 0) {
          setUserReached({ waiting: false, reached: true });
        } else {
          setUserReached({ waiting: false, reached: false });
        }
      },
      process.env.NEXT_PUBLIC_USERREACHED_TIMEOUT ? parseInt(process.env.NEXT_PUBLIC_USERREACHED_TIMEOUT) : 0
    );
  };

  return (
    <>
      {shareLocation === null && (
        <ShareLocationChooser
          tagOwner={tagOwner}
          user={user}
          samaritan={samaritan}
          onSamaritanCleared={onSamaritanCleared}
          onStartChatClick={(shareLocation) => handleStartChatClick(shareLocation)}
        />
      )}
      {shareLocation !== null && (
        <ChatPage
          tagOwner={tagOwner}
          samaritan={samaritan}
          conversation={conversation}
          shareLocation={shareLocation}
          handleNameChosen={handleNameChosen}
          userReached={userReached}
          setUserReached={setUserReached}
        />
      )}
    </>
  );
};
