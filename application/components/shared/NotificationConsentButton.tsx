import { Infobox } from './Infobox';
import { NotificationConsent } from '@/submodules/notifications/types/NotificationConsent';
import { CustomSubscriptionConsentButtonProps } from '@/submodules/notifications/types/SubscriptionConsentButtonProps';
import { InfoType } from '@/types/Infobox';
import { UserMetadata } from '@/types/userMetadata';
import clsx from 'clsx';
import { BellDotIcon, MailIcon, MessageSquareIcon } from 'lucide-react';
import { useState } from 'react';

export const NotificationConsentButton: React.FC<CustomSubscriptionConsentButtonProps> = ({
  toggleSubscription,
  currentUser
}) => {
  const notificationConsent = (currentUser?.metadata as { notificationConsent?: NotificationConsent })
    ?.notificationConsent;
  const smsDisabled = !(currentUser?.metadata as UserMetadata)?.phone;

  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);
  const [notificationSelections, setNotificationSelections] = useState<NotificationConsent>({
    push: false,
    sms: false,
    email: false,
    ...(notificationConsent ?? {})
  });

  return (
    <>
      <Infobox visible={successfullyUpdated} type={InfoType.Success}>
        Successfully updated notification details.
      </Infobox>
      <div className="flex flex-col gap-6">
        <div className="flex w-full justify-evenly gap-6">
          <button
            onClick={() => setNotificationSelections({ ...notificationSelections, push: !notificationSelections.push })}
            className={clsx(
              'flex w-full items-center justify-center gap-3 rounded-md border-2 border-alpha p-4 text-xl font-bold transition transition-all duration-100',
              !notificationSelections.push && 'text-alpha',
              notificationSelections.push && 'bg-alpha text-white'
            )}
          >
            <BellDotIcon />
            Push
          </button>
          <button
            onClick={() =>
              setNotificationSelections({ ...notificationSelections, email: !notificationSelections.email })
            }
            className={clsx(
              'flex w-full items-center justify-center gap-3 rounded-md border-2 border-alpha p-4 text-xl font-bold transition transition-all duration-100',
              !notificationSelections.email && 'text-alpha',
              notificationSelections.email && 'bg-alpha text-white'
            )}
          >
            <MailIcon />
            Email
          </button>
          <button
            disabled={smsDisabled}
            onClick={() => setNotificationSelections({ ...notificationSelections, sms: !notificationSelections.sms })}
            className={clsx(
              'flex w-full items-center justify-center gap-3 rounded-md border-2 border-alpha p-4 text-xl font-bold transition transition-all duration-100',
              !notificationSelections.sms && 'text-alpha',
              notificationSelections.sms && 'bg-alpha text-white',
              smsDisabled && 'border-gray-600 text-gray-600'
            )}
          >
            <MessageSquareIcon />
            SMS
          </button>
        </div>
        <button
          type="button"
          onClick={() => toggleSubscription(notificationSelections, () => setSuccessfullyUpdated(true))}
          className="[ reunitable-button--small ] w-48 self-center bg-alpha font-bold text-white"
        >
          Save
        </button>
      </div>
    </>
  );
};
