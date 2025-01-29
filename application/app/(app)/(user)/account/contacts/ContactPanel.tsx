import {ContactStatus} from './ContactsPage';
import ContentBox from '@/components/shared/ContentBox';
import {Infobox} from '@/components/shared/Infobox';
import InputGroup from '@/components/shared/InputGroup';
import {InfoType} from '@/types/Infobox';
import {User} from '@/types/supabaseTypes';
import {Trash2} from 'lucide-react';
import {FormEventHandler, useState} from 'react';

interface ContactPanelProps {
  contact: User;
  contactStatus: ContactStatus;
  onDeleteClicked: () => void;
  onContactCreated: (contact: User) => void;
  onStatusChanged: (status: ContactStatus) => void;
}

export const ContactPanel: React.FC<ContactPanelProps> = ({
  contact,
  contactStatus,
  onDeleteClicked,
  onContactCreated,
  onStatusChanged
}) => {
  const [contactDetails, setContactDetails] = useState(contact);

  const isNewContact = !contact || !contact.id || contact.id === '';

  const canSaveContact =
    contactDetails.firstName &&
    contactDetails.lastName &&
    contactDetails.email &&
    contactDetails.firstName !== '' &&
    contactDetails.lastName !== '' &&
    contactDetails.email !== '';

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addSecondaryContact', {
        method: 'POST',
        body: JSON.stringify({
          firstName: contactDetails.firstName,
          lastName: contactDetails.lastName,
          email: contactDetails.email
        })
      });
      const data = await response.json();
      if (!response.ok) {
        onStatusChanged({
          success: false,
          show: true,
          message: data?.description ?? 'Unknown error adding secondary contact',
          dismissable: false
        });
      } else {
        onContactCreated({ ...contactDetails, id: data.userId });
      }
    } catch (err) {
      onStatusChanged({
        success: false,
        show: true,
        message: 'Failed to add secondary contact',
        dismissable: false
      });
    }
  };

  return (
    <ContentBox className="flex flex-col gap-6">
      {contactStatus && (
        <Infobox
          type={contactStatus.success ? InfoType.Success : InfoType.Error}
          visible={contactStatus.show}
          dismissible={contactStatus.dismissable}
        >
          {contactStatus.message}
        </Infobox>
      )}
      <form className="relative flex flex-col gap-9" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <InputGroup
              id="firstName"
              label="Contact First name"
              type="text"
              placeholder="Enter your contacts first name"
              disabled={!isNewContact}
              value={contactDetails.firstName}
              onChange={(e) => {
                setContactDetails({ ...contactDetails, firstName: e.target.value });
              }}
              required
            />
            <InputGroup
              id="lastName"
              label="Contact Last name"
              type="text"
              placeholder="Enter your contacts last name"
              disabled={!isNewContact}
              value={contactDetails.lastName}
              onChange={(e) => {
                setContactDetails({ ...contactDetails, lastName: e.target.value });
              }}
              required
            />
            <InputGroup
              id="emailAddress"
              label="Contact Email Address"
              type="email"
              placeholder="Enter your contacts email address"
              disabled={!isNewContact}
              value={contactDetails.email}
              onChange={(e) => {
                setContactDetails({ ...contactDetails, email: e.target.value });
              }}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6">
          {!contact?.id && (
            <button type="submit" disabled={!canSaveContact} className="[ reunitable-button reunitable-button--small ]">
              Save contact
            </button>
          )}
          {contact?.id && (
            <button
              type="button"
              onClick={() => onDeleteClicked()}
              className="[ reunitable-button reunitable-button--small ] border-error-dark bg-error-dark"
            >
              <Trash2 />
              <span>Delete contact</span>
            </button>
          )}
        </div>
      </form>
    </ContentBox>
  );
};
