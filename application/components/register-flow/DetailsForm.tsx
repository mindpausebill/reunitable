import { FinalFormInputGroup } from '@/components/shared/FinalFormInputGroup';

export const DetailsForm = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
      <FinalFormInputGroup
        name="firstName"
        id="first-name"
        label="First name"
        placeholder="Enter your first name"
        type="text"
        required
      />
      <FinalFormInputGroup
        name="lastName"
        id="last-name"
        label="Last name"
        placeholder="Enter your last name"
        type="text"
        required
      />
    </div>
  );
};
