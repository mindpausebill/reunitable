import register from '/public/images/characters/5.svg';
import InputGroup from '@/components/shared/InputGroup';
import { User } from '@/types/supabaseTypes';
import { useState } from 'react';

interface NameChooserProps {
  tagOwner: User;
  onNameChosen: (name: string) => void;
}

export const NameChooser: React.FC<NameChooserProps> = ({ tagOwner, onNameChosen }) => {
  const [name, setName] = useState('');
  return (
    <>
      {/* Overlay */}
      <div className="backdrop-blur-xs absolute inset-0 bg-alpha-dark-800/80"></div>

      {/* Image */}
      <div className="absolute bottom-0">
        <img
          className="absolute top-0 left-0 h-auto w-full min-w-[40rem] -translate-y-[36rem] -translate-x-[14.5rem]"
          src={register.src}
          alt=""
        />
        <div className="w-full translate-x-40 -translate-y-[25rem] rounded-md bg-success-light p-6 shadow-md">
          <svg
            className="absolute left-0 w-6 -translate-x-3 text-success-light"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 9 12"
          >
            <path
              fill="currentColor"
              d="M1.03 6.792a1 1 0 0 1 0-1.584L7.39.31A1 1 0 0 1 9 1.104v9.792a1 1 0 0 1-1.61.793L1.03 6.792Z"
            />
          </svg>

          <p className="font-heading text-xl text-success-darkest">You're awesome!</p>
        </div>
      </div>

      {/* Samaritan name */}
      <div className="absolute bottom-0 left-0 w-full rounded-t-xl bg-white px-3 py-6 shadow-xl lg:p-6">
        <div className="flex flex-col gap-6">
          <p>
            We&apos;re connecting you with <strong>{tagOwner.firstName}</strong> and sharing your location with him.
          </p>
          <InputGroup
            id="samartian-name"
            label={`What's your name, good samaritan?`}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="[ reunitable-button ]" onClick={() => onNameChosen(name)}>
            Start chat
          </button>
        </div>
      </div>
    </>
  );
};
