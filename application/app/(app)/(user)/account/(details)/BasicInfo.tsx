'use client';

import InputGroup from '@/components/shared/InputGroup';
import InputWrapper from '@/components/shared/InputWrapper';
import { PhoneInputField } from '@/components/shared/PhoneInputField';
import { User } from '@/types/supabaseTypes';
import React from 'react';

interface BasicInfoProps {
  currentUser: User;
  updateUserDetails: (userDetails: User) => void;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ currentUser, updateUserDetails }) => {
  const metadata = currentUser?.metadata as Record<string, unknown> | undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl text-alpha-dark-600">Basic Info</h2>
        <hr />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <InputGroup
          id="firstName"
          label="First name"
          type="text"
          placeholder="Enter your first name"
          value={currentUser.firstName}
          onChange={(e) => {
            updateUserDetails({ ...currentUser, firstName: e.target.value });
          }}
          required
        />
        <InputGroup
          id="lastName"
          label="Last name"
          type="text"
          placeholder="Enter your last name"
          value={currentUser.lastName}
          onChange={(e) => {
            updateUserDetails({ ...currentUser, lastName: e.target.value });
          }}
          required
        />
        <InputGroup
          id="email"
          label="Email address"
          type="email"
          placeholder="Enter your email address"
          value={currentUser.email}
          onChange={(e) => {
            updateUserDetails({ ...currentUser, email: e.target.value });
          }}
          required
        />
        <InputWrapper id="mobile-number" required={false} showOptionalText={true} icon={<></>} label={'Mobile number'}>
          <PhoneInputField
            onChange={(val) => updateUserDetails({ ...currentUser, metadata: { ...metadata, phone: val } })}
            value={metadata?.phone as string}
          />
        </InputWrapper>
      </div>
    </div>
  );
};
