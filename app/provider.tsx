'use client';

import {
  ConfigContext,
  Context,
  ThemeModeEnum,
  ThemeProvider,
} from '@techstack/components';
import { Session } from '@supabase/supabase-js';
import useDarkMode from 'use-dark-mode';

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
  const { value: darkMode } = useDarkMode(
    localStorage.getItem('darkMode') === 'true' ?? false,
    {
      classNameDark: 'theme-dark',
      classNameLight: 'theme-light',
    }
  );

  return (
    <ConfigContext.Provider value={config as unknown as Context}>
      <SupabaseProvider session={session}>
        <SupabaseListener serverAccessToken={session?.access_token} />
        <ThemeProvider
          theme={theme}
          mode={darkMode ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT}
        >
          {children}
        </ThemeProvider>
      </SupabaseProvider>
    </ConfigContext.Provider>
  );
};
