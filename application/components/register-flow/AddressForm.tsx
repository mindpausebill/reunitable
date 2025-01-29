import { FinalFormInputGroup } from '@/components/shared/FinalFormInputGroup';
import React from 'react';

export const AddressForm = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-6 xl:grid-cols-2">
      <FinalFormInputGroup
        name="address1"
        id="address1"
        label="Address line one"
        type="text"
        placeholder="Enter the first line of your address"
        required
      />
      <FinalFormInputGroup
        name="address2"
        id="address2"
        label="Address line two"
        type="text"
        placeholder="Enter the second line of your address"
        required
      />
      <FinalFormInputGroup
        name="address3"
        id="address3"
        label="Address line three"
        type="text"
        placeholder="Enter the third line of your address"
      />
      <FinalFormInputGroup
        name="city"
        id="city"
        label="Town or City"
        type="text"
        placeholder="Enter your town or city"
        required
      />
      <FinalFormInputGroup
        name="postcode"
        id="postcode"
        label="Postal Code"
        type="text"
        placeholder="Enter your postal code"
        required
      />
    </div>
  );
};
