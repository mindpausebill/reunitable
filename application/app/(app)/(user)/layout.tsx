import { Navbar } from '@/components/app/Navbar';
import { useServerConversationsForUser } from '@/lib/loaders/conversation/forUser/useServerConversationsForUser';
import { useAdminNav } from '@/lib/loaders/nav/adminNav/useAdminNav';
import { useServerCurrentUser } from '@/submodules/supabase-functions/auth/getServerCurrentUser';
import { ConversationWithSamaritanAndMessages } from '@/types/supabaseTypes';
import clsx from 'clsx';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const serverUser = useServerCurrentUser();
  const { data: conversations } = useServerConversationsForUser();
  const unread = ((conversations ?? []) as ConversationWithSamaritanAndMessages[]).reduce((acc, conversation) => {
    const messages = conversation.Message ?? [];
    return acc + messages.reduce((acc, message) => (message.read ? acc : acc + 1), 0);
  }, 0);
  const adminNav = useAdminNav();
  return (
    <div className={clsx('h-screen w-screen overflow-hidden text-base', 'lg:fixed lg:h-screen')}>
      <div className={clsx('flex flex-col', 'lg:flex-row')}>
        <Navbar nav={adminNav} serverUser={serverUser ?? undefined} unreadMessages={unread} />
        <div className="h-content-area grow overflow-hidden lg:min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
