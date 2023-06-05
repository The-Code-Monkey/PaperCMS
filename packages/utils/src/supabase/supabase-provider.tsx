import type { Session } from '@supabase/auth-helpers-nextjs';
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createContext, useContext, useState } from 'react';

import { createBrowserClient } from './supabase-browser';

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: Partial<SupabaseClient>;
  session: MaybeSession;
};

const Context = createContext<SupabaseContext>({
  supabase: {},
  session: null,
});

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: MaybeSession;
}) {
  const [supabase] = useState(() => createBrowserClient());

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => useContext(Context);
