'use client'

import { ReactNode } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { ConfigContext, ThemeProvider, Context } from '@techstack/components';

import './global.scss';
import config from '../orchard.theme.config.json';
import theme from '../theme';

function MyApp({ children }: { children: ReactNode }) {
  return (
    <ConfigContext.Provider value={config as unknown as Context}>
      <SessionContextProvider supabaseClient={createBrowserSupabaseClient()}>
        <ThemeProvider theme={theme}>
          <div>{children}</div>
        </ThemeProvider>
      </SessionContextProvider>
    </ConfigContext.Provider>
  );
}

export default MyApp;
