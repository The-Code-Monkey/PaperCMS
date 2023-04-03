

import { ReactNode } from 'react';

import { createServerClient } from '../utils/supabase-server';
import StyledComponentsRegistry from '../lib/registry';

import Provider from './provider';

const MyApp = async ({ children }: { children: ReactNode }) => {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang='en' id='html'>
      <head />
      <body>
        <Provider session={session}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  );
};

export default MyApp;
