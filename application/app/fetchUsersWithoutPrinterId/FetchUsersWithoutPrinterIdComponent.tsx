'use client';

import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { User } from '@/types/supabaseTypes';
import { Ring } from '@uiball/loaders';
import axios from 'axios';
import { useState } from 'react';
import { v4 } from 'uuid';

interface FetchUsersWithoutPrinterIdComponentProps {
  user: string;
}

export const FetchUsersWithoutPrinterIdComponent: React.FC<FetchUsersWithoutPrinterIdComponentProps> = ({ user }) => {
  const [printerId, setPrinterId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { supabase } = useSupabase<'access'>('access');

  const handleClick = async () => {
    setLoading(true);

    const { data: usersWithPrinterId } = await supabase.from('User').select().not('metadata->printerId', 'is', 'null');

    let unqiueId = v4();

    while (usersWithPrinterId?.find((user) => (user.metadata as { printerId: string })?.printerId === unqiueId)) {
      unqiueId = v4();
    }

    try {
      await axios.post('/api/testPrinterIdUpdate', { printerId: unqiueId, userId: user?.split(',')[0] });
      setPrinterId(unqiueId);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const notIsHeader = user.split(',')[0] !== 'id';

  return (
    <div className="flex flex-col items-start gap-2">
      <pre>
        {!printerId && user}
        {printerId && `New printerId is ${printerId}`}
      </pre>
      {!printerId && notIsHeader && (
        <button
          onClick={handleClick}
          className="flex items-center justify-center rounded-md bg-alpha py-2 px-4 text-white"
        >
          {!loading && 'Associate with printerId'}
          {loading && <Ring size={20} color="white" />}
        </button>
      )}
    </div>
  );
};
