import { GetSettingsReturnType } from '../../types/GetSettingsReturnType';
import { createSupabaseServerClient } from '../supabase-server';

export const getAsyncSettings = async <T = Record<string, any>, K extends keyof T = keyof T>(keys: K[]) => {
  const supabase = createSupabaseServerClient<'public'>('public');

  const { data: settings } = await supabase.from('Setting').select().in('key', keys);

  return settings?.reduce((prev, current) => {
    return { ...prev, [current.key]: current?.value };
  }, {}) as GetSettingsReturnType<T, K>;
};
