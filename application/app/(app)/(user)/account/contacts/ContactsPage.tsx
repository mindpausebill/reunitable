'use client';

import { ContactPanel } from './ContactPanel';
import { Infobox } from '@/components/shared/Infobox';
import { Modal } from '@/components/shared/Modal';
import SlidePanel from '@/components/shared/SlidePanel';
import { useClientSecondaryContacts } from '@/lib/loaders/contacts/useClientSecondaryContacts';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { InfoType } from '@/types/Infobox';
import { User, UserOrganisationWithUsers } from '@/types/supabaseTypes';
import { HelpCircle, PlusCircle, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export interface ContactStatus {
  success: boolean;
  show: boolean;
  message: string;
  dismissable: boolean;
}

export const ContactsPage = () => {
  const filteredUsers = (secondaryContacts: UserOrganisationWithUsers[]) => {
    return (secondaryContacts ?? []).flatMap((org) => org.User).filter((u) => u.id !== session?.user?.id);
  };

  const [helpOpen, setHelpOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteStatusOpen, setDeleteStatusOpen] = useState(false);
  const [deletingContactId, setDeletingContactId] = useState<string | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const { session } = useSupabase<'public'>();

  const { data: secondaryContacts } = useClientSecondaryContacts();
  const [contacts, setContacts] = useState<User[]>(filteredUsers(secondaryContacts as UserOrganisationWithUsers[]));
  const [contactStatuses, setContactStatuses] = useState<Record<string, ContactStatus>>({});

  useEffect(() => {
    setContacts(filteredUsers(secondaryContacts as UserOrganisationWithUsers[]));
  }, [secondaryContacts]);

  useEffect(() => {
    if (deleteStatusOpen && divRef.current) {
      divRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [deleteStatusOpen]);

  const handleNewContactClicked = () => {
    setContacts([
      ...contacts,
      { id: '', firstName: '', lastName: '', email: '', metadata: { phone: null }, phone: null }
    ]);
  };

  const handleDeleteClicked = (contactId: string) => {
    setDeleteStatusOpen(false);
    setDeleteOpen(true);
    setDeletingContactId(contactId);
  };

  const handleDeleteConfirmed = async () => {
    if (deletingContactId) {
      try {
        const response = await fetch('/api/deleteSecondaryContact', {
          method: 'POST',
          body: JSON.stringify({
            contactId: deletingContactId
          })
        });
        const data = await response.json();
        if (!response.ok) {
          handleStatusChanged(deletingContactId, {
            success: false,
            show: true,
            message: data?.description ?? 'Unknown error deleting secondary contact',
            dismissable: false
          });
        } else {
          const newContactList = contacts.filter((c) => c.id && c.id !== deletingContactId);
          setContacts(newContactList);
          setDeleteStatusOpen(true);
        }
      } catch (err) {
        handleStatusChanged(deletingContactId, {
          success: false,
          show: true,
          message: 'Failed to delete secondary contact',
          dismissable: false
        });
      }
    }
    setDeleteOpen(false);
  };

  const handleDeleteCancelled = () => {
    setDeletingContactId(null);
    setDeleteOpen(false);
  };

  const handleContactCreated = (newContact: User) => {
    setContactStatuses({
      ...contactStatuses,
      [newContact.id as string]: {
        success: true,
        show: true,
        message: 'Successfully created secondary contact',
        dismissable: true
      }
    });
    const newContactList = [...contacts.filter((c) => c.id && c.id !== ''), newContact];
    setContacts(newContactList);
  };

  const handleStatusChanged = (contactId: string, contactStatus: ContactStatus) => {
    setContactStatuses({ ...contactStatuses, [contactId as string]: contactStatus });
  };

  const isAddingNewContact = contacts.some((c) => !c.id || c.id === '');

  return (
    <>
      <div ref={divRef} className="flex flex-col gap-6">
        <div className="flex justify-between gap-6">
          <h1 className="font-heading text-3xl leading-tight text-alpha-dark-600">Manage secondary contacts</h1>
          <button className="text-alpha-dark-600 underline" title="What's this?" onClick={() => setHelpOpen(true)}>
            <HelpCircle className="h-6 w-6 shrink-0" />
          </button>
        </div>

        {deleteStatusOpen && (
          <Infobox type={InfoType.Success} visible={true} dismissible={true}>
            Successfully deleted secondary contact
          </Infobox>
        )}

        {contacts.map((contact) => (
          <ContactPanel
            key={contact.id}
            contact={contact}
            contactStatus={contactStatuses[contact.id as string]}
            onDeleteClicked={() => handleDeleteClicked(contact.id as string)}
            onStatusChanged={(contactStatus) => handleStatusChanged(contact.id as string, contactStatus)}
            onContactCreated={(newContact) => handleContactCreated(newContact)}
          />
        ))}
        {!isAddingNewContact && (
          <button
            onClick={handleNewContactClicked}
            className="[ reunitable-secondary-button ] mt-6 border-alpha px-6 text-base text-alpha"
          >
            <PlusCircle />
            <span>Add new contact</span>
          </button>
        )}
      </div>

      <Modal
        title="Delete contact"
        colorClass="bg-error-dark"
        buttonActionText="Delete contact"
        iconComponent={<Trash2 />}
        isOpen={deleteOpen}
        onButtonClicked={handleDeleteConfirmed}
        onCancelClicked={handleDeleteCancelled}
      >
        <p>Are you sure you want to remove this secondary contact?</p>
        {contacts.length === 1 && <p>This is your last remaining secondary contact!</p>}
      </Modal>

      <SlidePanel isOpen={helpOpen} onCancelClicked={() => setHelpOpen(false)}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-alpha-dark-600">
            <HelpCircle className="h-6 w-6" />
            <h2 className="font-heading text-2xl">What's this?</h2>
          </div>
          <p>Secondary contacts are used when you don't respond to your lost item being scanned.</p>
          <p>
            If you do not respond to your items being scanned within a few minutes we'll also notify your secondary
            contacts, they can then connect with the good samaritan to arrage a time and place to get your lost item
            back.
          </p>
        </div>
      </SlidePanel>
    </>
  );
};
