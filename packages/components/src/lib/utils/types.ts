import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/gotrue-js';
import {RealtimeChannel, Session, User} from '@supabase/supabase-js';
import { StorageError } from '@supabase/storage-js/dist/module/lib/errors';

import { RecordType } from '../types';

export type RecordReturnType =
  | Record<string, string>
  | Record<string, string>[]
  | Record<string, Array<RecordType>>[]
  | Record<string, any>;

export type AuthOptions = {
  redirectTo?: string;
  scopes?: string;
  captchaToken?: string;
  queryParams?: { [key: string]: string };
};

export type GetOptions = {
  where?: [string, string];
  columns?: string;
};

export interface DbReturnType<T extends string, F extends string> {
  unsubscribe: (
    channel: RealtimeChannel
  ) => Promise<"error" | "ok" | "timed out">
  subscribe: <R extends RecordReturnType>(
    table: T,
    onChange: (payload) => void
  ) => RealtimeChannel;
  get: <R extends RecordReturnType>(
    table: T,
    options?: GetOptions
  ) => Promise<dbFunctionReturnType<R>>;
  put: (
    table: T,
    data: Record<string, unknown>,
    row?: string
  ) => Promise<{ error: string }>;
  remove: (table: T, id: string) => Promise<{ error: string | undefined }>;
  signIn: (
    credentials: SignInWithPasswordCredentials,
    options?: AuthOptions
  ) => Promise<{ data: { user: User | null; session: Session | null }; error: null }
    | { data: { user: null; session: null }; error: Record<string, unknown> }>;
  signUp: (
    credentials: SignUpWithPasswordCredentials,
    options?: AuthOptions
  ) => Promise<{ data: { user: User | null; session: Session | null }; error: null }
    | { data: { user: null; session: null }; error: Record<string, unknown> }>;
  signOut: () => Promise<{ error: Record<string, unknown> | null }>;
  dbFunction: <R extends RecordReturnType>(
    funcName: F,
    args?: Record<string, unknown>
  ) => Promise<dbFunctionReturnType<R>>;
  upload: (
    files: FileList,
    filePath: string,
    store?: string
  ) => Promise<{ url: string | null; error: StorageError | null }[]>;
}

export type dbFunctionReturnType<R extends RecordReturnType> = {
  data: R | null;
  error: string | undefined;
};
