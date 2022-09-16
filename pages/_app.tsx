import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
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

  return (
    <ConfigContext.Provider value={config as unknown as Context}>
      <UserProvider supabaseClient={supabaseClient}>
        <ThemeProvider theme={theme}>
          <div>{getLayout(<Component {...pageProps} />)}</div>
        </ThemeProvider>
      </UserProvider>
    </ConfigContext.Provider>
  );
}

export default MyApp;
