'use client';

import InputGroup from '@/components/shared/InputGroup';
import {User} from '@/types/supabaseTypes';
import {UserMetadata} from '@supabase/supabase-js';

interface AddressProps {
  currentUser: User;
  updateUserDetails: (userDetails: User) => void;
}

export const Address: React.FC<AddressProps> = ({ currentUser, updateUserDetails }) => {
  const metadata = (currentUser.metadata ?? {}) as UserMetadata;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl text-alpha-dark-600">Address</h2>
        <hr />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <InputGroup
          id="address1"
          label="Address line one"
          type="text"
          placeholder="Enter the first line of your address"
          value={metadata.address.address1}
          onChange={(e) => {
            updateUserDetails({ ...currentUser, metadata: { ...metadata, address: { address1: e.target.value } } });
          }}
          required
        />
        <InputGroup
          id="address2"
          label="Address line two"
          type="text"
          placeholder="Enter the second line of your address"
          value={metadata.address.address2}
          onChange={(e) => {
            updateUserDetails({ ...currentUser, metadata: { ...metadata, address: { address2: e.target.value } } });
          }}
          required
        />
        <InputGroup
          id="address3"
          label="Address line three"
          type="text"
          placeholder="Enter the third line of your address"
          value={metadata.address.address3}
          onChange={(e) => {
            updateUserDetails({ ...currentUser, metadata: { ...metadata, address: { address3: e.target.value } } });
          }}
        />
        <InputGroup
          id="town"
          label="Town or City"
          type="text"
          placeholder="Enter your town or city"
          value={metadata.address.city}
          onChange={(e) => {
            updateUserDetails({ ...currentUser, metadata: { ...metadata, address: { city: e.target.value } } });
          }}
          required
        />
        <InputGroup
          id="postcode"
          label="Postal Code"
          type="text"
          placeholder="Enter your postal code"
          value={metadata.address.postcode}
          onChange={(e) => {
            updateUserDetails({ ...currentUser, metadata: { ...metadata, address: { postcode: e.target.value } } });
          }}
          required
        />
      </div>
    </div>
  );
};
