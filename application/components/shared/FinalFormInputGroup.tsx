import InputGroup from './InputGroup';
import React, { HTMLInputTypeAttribute } from 'react';
import { Field } from 'react-final-form';

export interface InputProps {
  id: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  showOptionalText?: boolean;
  icon?: React.ReactNode;
  datalistId?: string;
  datalistOptions?: Array<String>;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export const FinalFormInputGroup: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  showOptionalText = true,
  icon,
  datalistId,
  datalistOptions,
  name,
  minLength,
  maxLength,
  min,
  max
}) => {
  return (
    <Field
      name={name}
      render={({ input, meta }) => {
        const failedValidation = meta.error !== undefined && meta.submitFailed && !meta.modifiedSinceLastSubmit;
        return (
          <div className="flex flex-col gap-2">
            <InputGroup
              id={id}
              label={label}
              type={type}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              showOptionalText={showOptionalText}
              icon={icon}
              datalistId={datalistId}
              datalistOptions={datalistOptions}
              minLength={minLength}
              maxLength={maxLength}
              min={min}
              max={max}
              {...input}
            />
            {failedValidation && <p className="text-sm text-error-dark">{meta?.error}</p>}
          </div>
        );
      }}
    />
  );
};