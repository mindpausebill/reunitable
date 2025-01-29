import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputFieldProps {
  onChange: (value: string) => void;
  value?: string | null;
}

export const PhoneInputField = ({ onChange, value }: PhoneInputFieldProps) => {
  return (
    <PhoneInput
      inputClass={'placeholder:text-alpha-600 w-full bg-transparent focus:outline-alpha p-4'}
      inputStyle={{
        height: '3.7em',
        borderColor: '#e5e7eb',
        width: '100%',
        fontSize: '100%'
      }}
      buttonStyle={{
        borderColor: '#e5e7eb'
      }}
      value={value ?? undefined}
      specialLabel=""
      onChange={(phone, data) => {
        const phoneWithoutCountryCode = phone.replace((data as CountryData).dialCode, '');
        const newValue = phoneWithoutCountryCode.startsWith('0')
          ? phoneWithoutCountryCode.replace('0', '')
          : phoneWithoutCountryCode;

        const pNumber = `+${(data as CountryData).dialCode}${newValue}`;

        onChange(pNumber);
      }}
      country={'gb'}
      preferredCountries={['gb', 'us', 'de', 'fr', 'ru']}
      enableLongNumbers={true}
      placeholder={'Enter a mobile number'}
      disableSearchIcon={true}
    />
  );
};
