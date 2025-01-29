import { ConversationPage } from './ConversationPage';
import { useServerConversationsForUser } from '@/lib/loaders/conversation/forUser/useServerConversationsForUser';
import { useServerCurrentUser } from '@/submodules/supabase-functions/auth/getServerCurrentUser';
import { signInWithRedirect } from '@/submodules/supabase-functions/auth/signInWithRedirect';
import { ConversationWithSamaritanAndMessages } from '@/types/supabaseTypes';
import _ from 'lodash';

const Messages = () => {
  const user = useServerCurrentUser();
  const { data: conversations } = useServerConversationsForUser();
  if (!user) return signInWithRedirect(`/messages`);

  return <ConversationPage conversations={conversations as ConversationWithSamaritanAndMessages[]} user={user} />;
};

export default Messages;
