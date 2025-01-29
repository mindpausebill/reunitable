'use client';

import { useEffect, useState } from 'react';
import { SettingsContext } from '../lib/settings/SettingsContext';
import { Setting } from '../types/Setting';
import { useSupabase } from './SupabaseProvider';

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Setting[] | null>();
  const { supabase } = useSupabase<'public'>('public');

  useEffect(() => {
    const fetchSettings = async () => {
      setSettings((await supabase.from('Setting').select())?.data ?? []);
    };
    fetchSettings();
  }, []);

  return <SettingsContext.Provider value={settings ?? []}>{children}</SettingsContext.Provider>;
};
