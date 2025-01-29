'use client';

import { useOneSignal } from '../oneSignal/useOneSignal';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export type MaybeSession = Session | null;

export const PushNotificationWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { supabase } = useSupabase<'public'>('public');
  const { initialise } = useOneSignal();

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user ?? null;

      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') && user) {
        initialise(user.id);
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return <>{children}</>;
};
