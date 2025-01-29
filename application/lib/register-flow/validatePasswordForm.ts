import { ValidationErrors } from 'final-form';
import _ from 'lodash';

export const validatePasswordForm = (values: { password: string; confirmPassword: string }) => {
  let errors: ValidationErrors = {};

  const passwordRegEx = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$');
  if (!passwordRegEx.test(values.password)) {
    errors.password =
      'Password does not meet requirements - must be at least 8 characters, contain at least one letter, one number, and one special character';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
