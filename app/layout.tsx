import 'server-only';

import { ReactNode } from 'react';

import { createServerClient } from '../utils/supabase-server';

import RootStyleRegistry from './RootStyleRegistry';
import { Provider } from './provider';

export const revalidate = 0;

import './global.scss';

const MyApp = async ({ children }: { children: ReactNode }) => {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang='en'>
      <head />
      <body>
        <Provider session={session}>
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </Provider>
      </body>
    </html>
  );
};

export default MyApp;
