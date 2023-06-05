'use client';

import { SiteThemeProvider, SupabaseListener, SupabaseProvider } from '@nucleus-cms/components';
import { Session } from '@supabase/supabase-js';
import { ConfigContext, Context, ThemeProvider } from '@techstack/components';
import { ReactNode } from 'react';
import useDarkMode from 'use-dark-mode';

import config from '../orchard.theme.config.json';
import theme from '../theme';
import { ThemeModeEnum } from '../theme/enum';


import GlobalStyle from './globalStyles';
export const revalidate = 0;

const Provider = ({
  children,
  session,
}: {
  children: ReactNode;
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
          <GlobalStyle />
          <SiteThemeProvider>{children}</SiteThemeProvider>
        </ThemeProvider>
      </SupabaseProvider>
    </ConfigContext.Provider>
  );
};

export default Provider;
