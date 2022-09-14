import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import { ThemeProvider } from '@techstack/components';

import '../styles/global.scss';

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
    <UserProvider supabaseClient={supabaseClient}>
      <ThemeProvider theme={theme}>
        <div>{getLayout(<Component {...pageProps} />)}</div>
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
