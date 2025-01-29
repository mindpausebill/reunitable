'use client';

import { MessagesWindow } from './MessagesWindow';
import { NameChooser } from './NameChooser';
import { Navbar } from '@/components/app/Navbar';
import { FinalFormInputGroup } from '@/components/shared/FinalFormInputGroup';
import { Infobox } from '@/components/shared/Infobox';
import { Modal } from '@/components/shared/Modal';
import { useUpdateSamaritan } from '@/lib/loaders/samaritan/useUpdateSamaritan';
import { InfoType } from '@/types/Infobox';
import { ConversationWithSamaritanAndMessages, Samaritan, User } from '@/types/supabaseTypes';
import { Transition } from '@headlessui/react';
import axios from 'axios';
import clsx from 'clsx';
import { backOff } from 'exponential-backoff';
import { User as UserIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Form } from 'react-final-form';

interface ContactDetailsFormValues {
  phone?: string;
  email?: string;
}

interface ChatPageProps {
  tagOwner: User;
  samaritan?: Samaritan | null;
  conversation?: ConversationWithSamaritanAndMessages | null;
  shareLocation: boolean;
  handleNameChosen: (name: string) => void;
  userReached?: { waiting: boolean; reached: boolean };
  setUserReached: (userReached?: { waiting: boolean; reached: boolean }) => void;
}

const sendUserNotReachedNotification = async (conversationId?: string, samaritanId?: string) => {
  try {
    await backOff(
      async () =>
        await axios.post('/api/createUserNotReachedNotification', {
          conversationId,
          samaritanId
        }),
      {
        numOfAttempts: 3
      }
    );
  } catch (e) {}
};

export const ChatPage: React.FC<ChatPageProps> = ({
  tagOwner,
  shareLocation,
  samaritan,
  conversation,
  handleNameChosen,
  userReached,
  setUserReached
}) => {
  const { trigger: updateSamaritan } = useUpdateSamaritan();
  const [submitError, setSubmitError] = useState(false);

  const validateContactDetailsForm = ({ email, phone }: ContactDetailsFormValues) => {
    let errors: Record<string, string> = {};

    if (!phone && !email) {
      errors.mobile = 'Must provide either a phone number or an email';
    }

    return errors;
  };

  const handleContactDetailsSubmit = async ({ email, phone }: ContactDetailsFormValues) => {
    setSubmitError(false);

    const updatedSamaritan = await updateSamaritan({ id: samaritan?.id, email, phone });

    if (updatedSamaritan?.id) {
      sendUserNotReachedNotification(conversation?.id, updatedSamaritan?.id as string);
      setUserReached(undefined);
      return;
    }

    setSubmitError(true);
  };

  return (
    <div className={clsx('h-screen w-screen overflow-hidden', 'lg:fixed lg:h-screen')}>
      <div className={clsx('flex flex-col', 'lg:flex-row')}>
        <Navbar nav={[]} unreadMessages={0} />
        <div className="h-content-area grow overflow-hidden lg:min-h-screen">
          <Transition.Root show={!samaritan} as={Fragment}>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-1"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="opacity-1"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0">
                <NameChooser tagOwner={tagOwner} onNameChosen={(name) => handleNameChosen(name)} />
              </div>
            </Transition.Child>
          </Transition.Root>

          {samaritan && conversation && (
            <MessagesWindow
              tagOwner={tagOwner}
              samaritan={samaritan}
              conversation={conversation}
              shareLocation={shareLocation}
            />
          )}
          <Form
            onSubmit={handleContactDetailsSubmit}
            validate={validateContactDetailsForm}
            render={({ handleSubmit }) => (
              <Modal
                isOpen={userReached?.waiting === false && userReached?.reached === false}
                title={'Submit your contact details'}
                iconComponent={<UserIcon />}
                buttonActionText="Submit"
                colorClass="bg-alpha"
                onButtonClicked={handleSubmit}
                onCancelClicked={() => {
                  sendUserNotReachedNotification(conversation?.id, samaritan?.id);
                  setUserReached(undefined);
                }}
              >
                <div className="flex flex-col gap-6">
                  <Infobox type={InfoType.Error} visible={submitError}>
                    <div className="flex flex-col gap-2">
                      An error occurred attempting to submit contact details please try again.
                    </div>
                  </Infobox>
                  <Infobox type={InfoType.Info} visible={true}>
                    We're having trouble connecting you right now, please leave your mobile number/email address
                  </Infobox>

                  <FinalFormInputGroup id="phone" name="phone" label="Phone number" showOptionalText={false} />
                  <FinalFormInputGroup id="email" name="email" label="Email" showOptionalText={false} />
                </div>
              </Modal>
            )}
          />
        </div>
      </div>
    </div>
  );
};
