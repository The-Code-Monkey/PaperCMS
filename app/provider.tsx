'use client'

import config from "../orchard.theme.config.json";
import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { ConfigContext, ThemeProvider, Context } from '@techstack/components';
import theme from "../theme";
import {useState} from "react";

export const Provider = ({
                    children,
                    session,
                  }: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <ConfigContext.Provider value={config as unknown as Context}>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={session}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </SessionContextProvider>
    </ConfigContext.Provider>
  )
}