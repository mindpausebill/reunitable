import { AddressFormValues } from '@/types/register-flow/AddressFormValues';
import { ValidationErrors } from 'final-form';
import _ from 'lodash';

export const validateAddressForm = (values: AddressFormValues) => {
  let errors: ValidationErrors = {};

  Object.entries(values)
    .filter(([key]) => key !== 'address3')
    .forEach(([key, value]) => {
      if (!value) {
        errors = { ...errors, [key]: `${_.startCase(key)} is a required field.` };
      }
    });

  return errors;
};
