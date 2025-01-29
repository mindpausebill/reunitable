import { initialiseOneSignal } from './initialiseOneSignal';
import { useState } from 'react';

export const useOneSignal = () => {
  const [isInitialised, setIsInitialised] = useState(false);

  const initialise = async (userId: string) => {
    if (!isInitialised) {
      initialiseOneSignal(userId);
      setIsInitialised(true);
    }
  };

  return { initialise };
};
