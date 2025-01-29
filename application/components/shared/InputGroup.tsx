'use client';

import InputWrapper from './InputWrapper';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import React, { HTMLInputTypeAttribute, useState } from 'react';

export interface InputProps {
  id: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value?: any; // used any as I'm not sure what it should be with the input type being dynamic
  disabled?: boolean;
  showOptionalText?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  datalistId?: string;
  datalistOptions?: Array<String>;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const InputGroup = ({
  id,
  label,
  type = 'text',
  name,
  placeholder,
  required = false,
  value,
  disabled = false,
  showOptionalText = true,
  onChange,
  onBlur,
  icon,
  datalistId,
  datalistOptions,
  maxLength,
  minLength,
  min,
  max
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const currentType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <InputWrapper icon={icon} id={id} required={required} showOptionalText={showOptionalText} label={label}>
      <input
        className={clsx(
          'placeholder:text-alpha-600 w-full bg-transparent focus:outline-alpha',
          icon ? 'py-4 pl-14 pr-4' : 'p-4'
        )}
        id={id}
        name={name}
        type={currentType}
        placeholder={placeholder}
        required={required}
        defaultValue={value}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        list={datalistId}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
      />
      {type === 'password' && (
        <button onClick={showPasswordClick} className="absolute top-1/2 right-0 h-full -translate-y-1/2 px-6">
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      )}
      {datalistId && (
        <datalist id={datalistId}>
          {datalistOptions?.map((option, i) => (
            <option key={`${i} + ${option}`}>{option}</option>
          ))}
        </datalist>
      )}
    </InputWrapper>
  );
};

export default InputGroup;
