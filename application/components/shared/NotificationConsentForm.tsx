'use client';

import ContentBox from './ContentBox';
import { Infobox } from './Infobox';
import { NotificationConsentButton } from './NotificationConsentButton';
import { SubscriptionConsentButton } from '@/submodules/notifications/components/SubscriptionConsentButton';
import { InfoType } from '@/types/Infobox';
import { User } from '@/types/supabaseTypes';
import { UserMetadata } from '@/types/userMetadata';
import Link from 'next/link';

interface NotificationConsentFormProps {
  currentUser: User;
}

export const NotificationConsentForm: React.FC<NotificationConsentFormProps> = ({ currentUser }) => {
  return (
    <ContentBox className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl text-alpha-dark-600">Notifications Consent Form</h2>
        <hr />
      </div>
      <Infobox type={InfoType.Info} visible={true} dismissible={false}>
        Notifications will help you keep track of whether your items have been found. You can unsubscribe at any time
        from your account settings.
        <br />
        <br />
        <strong>You must</strong> enable notifications to get the most out of the service.
      </Infobox>
      <Infobox visible={!(currentUser?.metadata as UserMetadata)?.phone} type={InfoType.Warn}>
        <div className="flex flex-col gap-3">
          <span>SMS notifications are currently disabled as you have not setup a phone number on this account.</span>{' '}
          <span>
            Visit your{' '}
            <Link className="underline" href={'/account'}>
              account details page
            </Link>{' '}
            to update your contact information.
          </span>
        </div>
      </Infobox>

      <SubscriptionConsentButton currentUser={currentUser} customConsentButton={NotificationConsentButton} />
    </ContentBox>
  );
};
