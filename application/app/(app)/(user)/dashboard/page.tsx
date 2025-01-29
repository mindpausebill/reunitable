import {Infobox} from '@/components/shared/Infobox';
import {getSecondaryContacts} from '@/lib/loaders/contacts/getSecondaryContacts';
import {getConversationsForUser} from '@/lib/loaders/conversation/forUser/getConversationsForUser';
import {
  getSubscriptionsWithPricesAndProducts
} from '@/submodules/subscriptions/lib/front-end/getSubscriptionsWithPricesAndProducts';
import {getServerSessionUser} from '@/submodules/supabase-functions/auth/getServerSessionUser';
import {getUserOrgIDs} from '@/submodules/supabase-functions/auth/getUserOrgIDs';
import {signInWithRedirect} from '@/submodules/supabase-functions/auth/signInWithRedirect';
import {createSupabaseServerClient} from '@/submodules/supabase-functions/lib/supabase-server';
import {InfoType} from '@/types/Infobox';
import {ConversationWithSamaritanAndMessages, UserOrganisationWithUsers} from '@/types/supabaseTypes';
import Link from 'next/link';

const Dashboard = async () => {
  const filteredUsers = (secondaryContacts: UserOrganisationWithUsers[]) => {
    return (secondaryContacts ?? []).flatMap((org) => org.User).filter((u) => u.id !== session?.user?.id);
  };

  const accessSupabase = createSupabaseServerClient<'access'>('access');
  const publicSupabase = createSupabaseServerClient<'public'>('public');

  const {
    data: { session }
  } = await accessSupabase.auth.getSession();
  const user = await getServerSessionUser();

  const orgIDs = getUserOrgIDs(session);
  const { data: secondaryContacts } = await getSecondaryContacts(accessSupabase, orgIDs);

  if (!user) return signInWithRedirect(`/dashboard`);

  const { data: subscription } = await getSubscriptionsWithPricesAndProducts(publicSupabase, user);

  const { data: conversations } = await getConversationsForUser(publicSupabase, orgIDs);

  const unread = ((conversations ?? []) as ConversationWithSamaritanAndMessages[]).reduce((acc, conversation) => {
    const messages = conversation.Message ?? [];
    return acc + messages.reduce((acc, message) => (message.read ? acc : acc + 1), 0);
  }, 0);
  
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Haven't setup subscription 
      <Infobox type={InfoType.Error} visible={true}>
        <p>You have not yet ordered your tags or started your subscription</p>
        <Link className="underline" href="#">
          Order tags and start subscription
        </Link>
      </Infobox>*/}

      {/* Subscription has expired */}
      <Infobox type={InfoType.Error} visible={!subscription}>
        <p>Your subscription has expired, please update your payment details</p>
        <Link className="underline" href="#">
          Update payment details
        </Link>
      </Infobox>

      {/* Needs to check if tag has not been activated */}
      <Infobox type={InfoType.Info} visible={true} dismissible={false}>
        <Link className="absolute inset-0" href="/messages"></Link>
        <p>
          Now that you have completed the setup, we will send you your pack and you should recieve it within 48 hours,
          upon recipt you will also recieve full instructions on how to protect your loved possessions. You can now
          close this window.
        </p>
      </Infobox>

      <Infobox type={InfoType.Error} visible={unread > 0} dismissible={false}>
        <Link className="absolute inset-0" href="/messages"></Link>
        <p>You have unread messages</p>
      </Infobox>

      {/* <Infobox
        type={InfoType.Error}
        visible={(filteredUsers((secondaryContacts ?? []) as UserOrganisationWithUsers[])?.length ?? 0) < 1}
      >
        <p>You have not setup any secondary contacts</p>
        <Link className="underline" href="/account/contacts">
          Manage secondary contacts
        </Link>
      </Infobox> */}
    </div>
  );
};

export default Dashboard;
