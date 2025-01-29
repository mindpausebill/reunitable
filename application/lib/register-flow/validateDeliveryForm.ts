import { ValidationErrors } from 'final-form';
import _ from 'lodash';

export interface DeliveryFormValues {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  postcode: string;
}

export const validateDeliveryForm = (values: DeliveryFormValues) => {
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
