import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/gotrue-js/src/lib/types';

import { DbReturnType, AuthOptions } from '../types';
import { createBrowserClient } from '../../utils/supabase-browser';

import { Database } from './database-types';

type Functions = keyof Database['public']['Functions'];

type Tables = keyof Database['public']['Tables'];

const getSupabase = <R extends Record<string, unknown>>(): DbReturnType<
  Tables,
  R,
  Functions
> => {
  type TableType = Database['public']['Tables'][Tables]['Row'];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = createBrowserClient();

  const signIn: DbReturnType<Tables, R, Functions>['signIn'] = async (
    credentials: SignInWithPasswordCredentials,
    options?: AuthOptions
  ) => {
    return await supabase.auth.signInWithPassword({
      ...credentials,
      ...options,
    });
  };

  const signUp: DbReturnType<Tables, R, Functions>['signUp'] = async (
    credentials: SignUpWithPasswordCredentials,
    options?: AuthOptions
  ) => {
    return await supabase.auth.signUp({ ...credentials, ...options });
  };

  const signOut: DbReturnType<Tables, R, Functions>['signOut'] = async () => {
    return await supabase.auth.signOut();
  };

  const get: DbReturnType<Tables | string, R, Functions>['get'] = async (
    table: Tables | string,
    columns = '*'
  ) => {
    const { data, error } = await supabase
      .from<Tables | string, TableType>(table)
      .select(columns);

    return { data, error: error?.message } as unknown as Promise<{
      data: R[] | null;
      error: string | undefined;
    }>;
  };

  const dbFunction: DbReturnType<Tables, R, Functions>['dbFunction'] = async (
    funcName: Functions
  ) => {
    const { data, error } = await supabase.rpc(funcName);

    return {
      data,
      error: error?.message,
    };
  };

  return { signIn, signUp, signOut, get, dbFunction };
};

export default getSupabase;
