import { ReactNode } from 'react';
import {
  CookieOptions,
  createServerSupabaseClient as _createServerSupabaseClient,
} from '@supabase/auth-helpers-shared';
import { cookies, headers } from 'next/headers';

import RootStyleRegistry from './RootStyleRegistry';
import { Provider } from './provider';

import './global.scss';

function createServerSupabaseClient<
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database
>({
  cookieOptions,
}: {
  cookieOptions?: CookieOptions;
} = {}) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables are required!'
    );
  }

  return _createServerSupabaseClient<Database, SchemaName>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    getRequestHeader: key => headers().get(key) ?? undefined,

    getCookie(name) {
      return cookies().get(name)?.value;
    },
    setCookie(name, value, options) {
      // TODO: figure out how to access response object
      // const newSetCookies = filterCookies(
      //   ensureArray(context.res.getHeader('set-cookie')?.toString() ?? []),
      //   name
      // );
      // const newSessionStr = serializeCookie(name, value, {
      //   ...options,
      //   // Allow supabase-js on the client to read the cookie as well
      //   httpOnly: false
      // });
      // context.res.setHeader('set-cookie', [...newSetCookies, newSessionStr]);
    },
    options: {
      global: {
        // fetch // TODO: is this needed?
      },
    },
    cookieOptions,
  });
}

const MyApp = async ({ children }: { children: ReactNode }) => {
  const supabase = createServerSupabaseClient();
  let session = await supabase.auth.getSession();

  return (
    <html lang='en'>
      <head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <RootStyleRegistry>
          <Provider session={session.data.session}>{children}</Provider>
        </RootStyleRegistry>
      </body>
    </html>
  );
};

export default MyApp;
