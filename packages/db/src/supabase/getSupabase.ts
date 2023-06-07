import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/gotrue-js';
import { StorageError } from '@supabase/storage-js/dist/module/lib/errors';
import { RealtimeChannel, Session, User } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';

export const createBrowserClient = () => createBrowserSupabaseClient();

import type {
  DbReturnType,
  AuthOptions,
  RecordReturnType,
  dbFunctionReturnType,
  GetOptions,
} from '@nucleus-cms/types';

import { Database } from './database-types';

type Functions = keyof Database['public']['Functions'];

type Tables = string;

const useSupabase = (): DbReturnType<Tables, Functions> => {
  type TableType = Database['public']['Tables'][Tables]['Row'];

  const supabase = createBrowserClient();

  // Sign In
  const signIn: DbReturnType<Tables, Functions>['signIn'] = async (
    credentials: SignInWithPasswordCredentials,
    options?: AuthOptions
  ) => {
    return (await supabase.auth.signInWithPassword({
      ...credentials,
      ...options,
    })) as unknown as Promise<
      | { data: { user: User | null; session: Session | null }; error: null }
      | { data: { user: null; session: null }; error: Record<string, unknown> }
    >;
  };

  // Sign Up
  const signUp: DbReturnType<Tables, Functions>['signUp'] = async (
    credentials: SignUpWithPasswordCredentials,
    options?: AuthOptions
  ) => {
    return (await supabase.auth.signUp({
      ...credentials,
      ...options,
    })) as unknown as Promise<
      | { data: { user: User | null; session: Session | null }; error: null }
      | { data: { user: null; session: null }; error: Record<string, unknown> }
    >;
  };

  // Sign Out
  const signOut: DbReturnType<Tables, Functions>['signOut'] = async () => {
    return (await supabase.auth.signOut()) as unknown as Promise<{
      error: Record<string, unknown> | null;
    }>;
  };

  // Remove Subscription
  const unsubscribe: DbReturnType<Tables, Functions>['unsubscribe'] = (
    channel: RealtimeChannel
  ): Promise<'error' | 'ok' | 'timed out'> => {
    return supabase.removeChannel(channel);
  };

  // Subscribe
  const subscribe: DbReturnType<Tables, Functions>['subscribe'] = (
    table: Tables,
    onChange: (payload) => void
  ): RealtimeChannel => {
    return supabase
      .channel('any')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table,
        },
        onChange
      )
      .subscribe();
  };

  // Get
  const get: DbReturnType<Tables, Functions>['get'] = async <
    R extends RecordReturnType
  >(
    table: Tables,
    options?: GetOptions
  ): Promise<dbFunctionReturnType<R>> => {
    const { columns, where } = options ?? {};

    const result = await supabase
      .from<Tables, TableType>(table)
      .select(columns ?? '*')
      .eq(...(where ?? ['', '']));

    const data = result.data as unknown as R | null;
    const error = result.error;

    return { data, error: error?.message };
  };

  // Put
  const put: DbReturnType<Tables, Functions>['put'] = async (
    table: Tables,
    data: Record<string, unknown>,
    row?: string
  ) => {
    let error;

    if (row) {
      if (data['id']) {
        delete data['id'];
      }
      const res = await supabase
        .from(table)
        .update(data)
        .eq('id', parseInt(row, 10));

      error = res.error;
    } else {
      const res = await supabase.from(table).insert(data);
      error = res.error;
    }

    return { error } as unknown as { error: string };
  };

  // Delete
  const remove: DbReturnType<Tables, Functions>['remove'] = async (
    table: Tables,
    id: string
  ) => {
    const { error } = await supabase.from(table).delete().eq('id', id);

    return { error: error?.message };
  };

  // Function
  const dbFunction: DbReturnType<Tables, Functions>['dbFunction'] = async <
    R extends RecordReturnType
  >(
    funcName: Functions,
    args?: Record<string, unknown>
  ): Promise<dbFunctionReturnType<R>> => {
    const result = await supabase.rpc(funcName, args);

    const data = result.data as R | null;
    const error = result.error;

    return { data, error: error?.message };
  };

  // Upload
  const upload: DbReturnType<Tables, Functions>['upload'] = async (
    files,
    filePath,
    store = 'images'
  ) =>
    Promise.all<{ url: string | null; error: StorageError | null }>(
      Array.from(files).map(async file => {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(store)
          .upload(`${filePath}/${uuid()}`, file);

        if (uploadData?.path) {
          const { data } = supabase.storage
            .from(store)
            .getPublicUrl(uploadData.path);

          return { url: data?.publicUrl, error: null };
        }

        return { error: uploadError as StorageError, url: null };
      })
    );

  return {
    signIn,
    signUp,
    signOut,
    get,
    put,
    remove,
    dbFunction,
    upload,
    subscribe,
    unsubscribe,
  };
};

export default useSupabase;
