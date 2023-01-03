import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/gotrue-js/src/lib/types';

import {
  DbReturnType,
  AuthOptions,
  dbFunctionReturnType,
  RecordReturnType,
  GetOptions,
} from '../types';
import { createBrowserClient } from '../../utils/supabase-browser';

import { Database } from './database-types';

type Functions = keyof Database['public']['Functions'];

type Tables = keyof Database['public']['Tables'];

const getSupabase = (): DbReturnType<Tables, Functions> => {
  type TableType = Database['public']['Tables'][Tables]['Row'];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = createBrowserClient();

  const signIn: DbReturnType<Tables, Functions>['signIn'] = async (
    credentials: SignInWithPasswordCredentials,
    options?: AuthOptions
  ) => {
    return await supabase.auth.signInWithPassword({
      ...credentials,
      ...options,
    });
  };

  const signUp: DbReturnType<Tables, Functions>['signUp'] = async (
    credentials: SignUpWithPasswordCredentials,
    options?: AuthOptions
  ) => {
    return await supabase.auth.signUp({ ...credentials, ...options });
  };

  const signOut: DbReturnType<Tables, Functions>['signOut'] = async () => {
    return await supabase.auth.signOut();
  };

  const get: DbReturnType<Tables, Functions>['get'] = <
    R extends RecordReturnType
  >(
    table: Tables,
    options?: GetOptions
  ): Promise<dbFunctionReturnType<R>> =>
    new Promise(async resolve => {
      const { columns, where } = options ?? {};

      const result = await supabase
        .from<Tables, TableType>(table)
        .select(columns ?? '*')
        // @ts-ignore
        .eq(...(where ?? ['', '']));

      const data = result.data as R | null;
      const error = result.error;

      resolve({ data, error: error?.message });
    });

  const put: DbReturnType<Tables, Functions>['put'] = (
    table: Tables,
    data: Record<string, unknown>,
    row?: string
  ) =>
    new Promise(async resolve => {
      let error;

      if (row) {
        delete data.id;
        const res = await supabase
          .from(table)
          .update(data)
          .eq('id', parseInt(row, 10));

        error = res.error;
      } else {
        const res = await supabase.from(table).insert(data);
        error = res.error;
      }

      resolve({ error } as unknown as { error: string });
    });

  const remove: DbReturnType<Tables, Functions>['remove'] = (
    table: Tables,
    id: string
  ) =>
    new Promise(async resolve => {
      const { error } = await supabase.from(table).delete().eq('id', id);

      resolve({ error: error?.message });
    });

  const dbFunction: DbReturnType<Tables, Functions>['dbFunction'] = <
    R extends RecordReturnType
  >(
    funcName: Functions,
    args?: Record<string, unknown>
  ): Promise<dbFunctionReturnType<R>> =>
    new Promise(async resolve => {
      const result = await supabase.rpc(funcName, args);

      const data = result.data as R | null;
      const error = result.error;

      resolve({ data, error: error?.message });
    });

  return { signIn, signUp, signOut, get, put, remove, dbFunction };
};

export default getSupabase;
