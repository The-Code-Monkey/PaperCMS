import { useSessionContext } from '@supabase/auth-helpers-react';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/gotrue-js/src/lib/types';

import { DbReturnType, AuthOptions } from '../types';

import { Database } from './database-types';

type Functions = keyof Database['public']['Functions'];

type Tables = keyof Database['public']['Tables'];

const useGetSupabase = <R extends Record<string, unknown>>(): DbReturnType<
  Tables,
  R,
  Functions
> => {
  type TableType = Database['public']['Tables'][Tables]['Row'];

  const { supabaseClient: supabase } = useSessionContext();

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

  return { signIn, signUp, get, dbFunction, type: 'supabase' };
};

export default useGetSupabase;
