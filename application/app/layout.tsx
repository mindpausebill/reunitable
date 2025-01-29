import '../styles/global.css';
import { PushNotificationWrapper } from '@/submodules/notifications/components/PushNotificationWrapper';
import { SettingsProvider } from '@/submodules/supabase-functions/components/SettingsProvider';
import SupabaseProvider from '@/submodules/supabase-functions/components/SupabaseProvider';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import 'server-only';

// import type { Database } from '../db_types';
export type TypedSupabaseClient = SupabaseClient /*<Database>*/;

// do not cache this layout
export const revalidate = 0;

export const metadata = {
  title: 'Reunitable',
  description: 'Never lose your prized, loved possessions again.'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseServerClient('public');

  let {
    data: { session }
  } = await supabase.auth.getSession();

  // If we have a session but permissions are missing, refresh the session (happens on OAuth signin)
  if (session?.user?.app_metadata && !session?.user?.app_metadata?.access) {
    let {
      data: { session: refreshedSession }
    } = await supabase.auth.refreshSession();
    session = refreshedSession;
  }

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#026dd9" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body className="flex min-h-screen flex-col bg-alpha-light-100 text-lg font-medium text-alpha-dark-600">
        <SupabaseProvider session={session}>
          <PushNotificationWrapper>
            <SettingsProvider>{children}</SettingsProvider>
          </PushNotificationWrapper>
        </SupabaseProvider>
      </body>
    </html>
  );
}
