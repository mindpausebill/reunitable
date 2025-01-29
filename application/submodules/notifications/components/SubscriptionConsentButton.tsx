'use client';

import { CustomSubscriptionConsentButtonProps } from '../types/SubscriptionConsentButtonProps';
import { NotificationConsent } from '@/submodules/notifications/types/NotificationConsent';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { User } from '@/types/supabaseTypes';
import { UserMetadata } from '@/types/userMetadata';
import { BellIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';
import OneSignalReact from 'react-onesignal';

interface SubscriptionConsentButtonProps {
  customConsentButton?: React.FC<CustomSubscriptionConsentButtonProps>;
  currentUser: User;
}

export const SubscriptionConsentButton: React.FC<SubscriptionConsentButtonProps> = ({
  customConsentButton,
  currentUser
}) => {
  const notificationConsent = (currentUser?.metadata as { notificationConsent?: NotificationConsent })
    ?.notificationConsent;

  const { supabase } = useSupabase<'access'>('access');
  const [slideoutOpen, setSlideoutOpen] = useState(false);
  const [notificationSelections, setNotificationSelections] = useState<NotificationConsent>({
    push: false,
    sms: false,
    email: false,
    ...(notificationConsent ?? {})
  });

  const toggleSubscription = async (
    notificationSelections: NotificationConsent,
    onComplete?: () => void | Promise<void>
  ) => {
    const isPushNotificationsEnabled = OneSignalReact.User.PushSubscription.optedIn;

    if (isPushNotificationsEnabled && !notificationSelections?.push) {
      await OneSignalReact.User.PushSubscription.optOut();
    } else if (notificationSelections?.push && !isPushNotificationsEnabled) {
      if (!OneSignalReact.Notifications.permission) {
        await OneSignalReact.Notifications.requestPermission();
      }

      await OneSignalReact.User.PushSubscription.optIn();
    }

    const phoneNumber = (currentUser?.metadata as UserMetadata)?.phone ?? currentUser?.phone;

    if (notificationSelections?.sms && phoneNumber) {
      OneSignalReact.User.addSms(phoneNumber);
    } else if (!notificationSelections.sms && phoneNumber) {
      OneSignalReact.User.removeSms(phoneNumber);
    }

    if (notificationSelections?.email && currentUser?.email) {
      OneSignalReact.User.addEmail(currentUser.email);
    } else if (!notificationSelections?.email && currentUser?.email) {
      OneSignalReact.User.removeEmail(currentUser.email);
    }

    await supabase.auth.updateUser({
      data: {
        ...((currentUser?.metadata as Record<string, any>) ?? {}),
        notificationConsent: notificationSelections
      }
    });

    await supabase
      .from('User')
      .update({
        metadata: {
          ...((currentUser?.metadata as Record<string, any>) ?? {}),
          notificationConsent: notificationSelections
        }
      })
      .eq('id', currentUser.id);

    setSlideoutOpen(false);
    onComplete && (await onComplete());
  };

  return (
    <>
      {!customConsentButton && (
        <>
          {slideoutOpen && <div onClick={() => setSlideoutOpen(false)} className="absolute inset-0" />}
          <div className="fixed bottom-2 right-2 flex flex-col items-end gap-2">
            <div
              className={clsx(
                'max-w-xs origin-bottom transform rounded-md  border border-black bg-nsAdmin-900 px-4 py-6 opacity-0 transition-all duration-200',
                slideoutOpen && 'opacity-100'
              )}
            >
              <div
                className={clsx(
                  'flex flex-col gap-4 text-sm text-white opacity-0 transition-all duration-200',
                  slideoutOpen && 'opacity-100'
                )}
              >
                <span className="text-lg font-bold">Notification consent</span>
                <div className="flex gap-3">
                  <input
                    checked={notificationSelections?.push}
                    onChange={(e) => setNotificationSelections({ ...notificationSelections, push: e.target.checked })}
                    type="checkbox"
                  />
                  <span className="text-white">Push notifications</span>
                </div>
                <div className="flex gap-3">
                  <input
                    checked={notificationSelections?.sms}
                    onChange={(e) => setNotificationSelections({ ...notificationSelections, sms: e.target.checked })}
                    type="checkbox"
                  />
                  <span className="text-white">SMS</span>
                </div>
                <div className="flex gap-3">
                  <input
                    checked={notificationSelections?.email}
                    onChange={(e) => setNotificationSelections({ ...notificationSelections, email: e.target.checked })}
                    type="checkbox"
                  />
                  <span className="text-white">Email</span>
                </div>
                <button
                  onClick={() => toggleSubscription(notificationSelections)}
                  className="text-md rounded-md bg-blue-900 px-4 py-2 font-bold text-white"
                >
                  Save
                </button>
              </div>
            </div>
            <button
              onClick={() => setSlideoutOpen(!slideoutOpen)}
              className={clsx(
                'flex h-12 w-12 origin-bottom-right scale-75 transform items-center justify-center rounded-full border border-black p-2 transition-all duration-500 hover:scale-100 active:scale-100',
                slideoutOpen && 'scale-100'
              )}
            >
              <BellIcon className="origin-ru group h-6 w-6 transition-all" />
            </button>
          </div>
        </>
      )}
      {customConsentButton && customConsentButton({ toggleSubscription, currentUser })}
    </>
  );
};
