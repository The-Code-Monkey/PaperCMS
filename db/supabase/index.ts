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
    where: [string, string] = ['', ''],
    columns = '*'
  ) => {
    const { data, error } = await supabase
      .from<Tables | string, TableType>(table)
      .select(columns)
      .eq(...where);

    return { data, error: error?.message } as unknown as Promise<{
      data: R[] | null;
      error: string | undefined;
    }>;
  };

  const put: DbReturnType<Tables | string, R, Functions>['put'] = async (
    table: Tables | string,
    data: Record<string, unknown>,
    row?: string
  ) => {
    let error;

    if (row) {
      delete data.id;
      const res = await supabase
        .from(table)
        .update(data)
        .eq('id', parseInt(row, 10));

      error = res.error;
    } else {
      error = await supabase.from(table).insert(data);
    }

    return { error } as unknown as Promise<{ error: string }>;
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

  return { signIn, signUp, signOut, get, put, dbFunction };
};

export default getSupabase;
