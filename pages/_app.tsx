import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { ConfigContext, ThemeProvider, Context } from '@techstack/components';

import '../styles/global.scss';
import config from '../orchard.theme.config.json';
import theme from '../theme';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page);
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <ConfigContext.Provider value={config as unknown as Context}>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <ThemeProvider theme={theme}>
          <div>{getLayout(<Component {...pageProps} />)}</div>
        </ThemeProvider>
      </SessionContextProvider>
    </ConfigContext.Provider>
  );
}

export default MyApp;
