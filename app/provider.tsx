'use client';

import { ConfigContext, ThemeProvider, Context } from '@techstack/components';
import { Session } from '@supabase/supabase-js';

import SupabaseListener from '../components/supabase-listener';
import SupabaseProvider from '../components/supabase-provider';
import theme from '../theme';
import config from '../orchard.theme.config.json';

export const revalidate = 0;

export const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <ConfigContext.Provider value={config as unknown as Context}>
      <SupabaseProvider session={session}>
        <SupabaseListener serverAccessToken={session?.access_token} />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SupabaseProvider>
    </ConfigContext.Provider>
  );
};
