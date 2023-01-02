import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/gotrue-js/src/lib/types';
import { AuthError, Session, User } from '@supabase/supabase-js';

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

export interface DbReturnType<
  T extends string,
  R extends Record<string, unknown>,
  F extends string
> {
  get: (
    table: T,
    options?: GetOptions
  ) => Promise<{ data: R[] | null; error: string | undefined }>;
  put: (
    table: T,
    data: Record<string, unknown>,
    row?: string
  ) => Promise<{ error: string }>;
  remove: (table: T, id: string) => Promise<{ error: string }>;
  signIn: (
    credentials: SignInWithPasswordCredentials,
    options?: AuthOptions
  ) => Promise<
    | { data: { user: User | null; session: Session | null }; error: null }
    | { data: { user: null; session: null }; error: AuthError }
  >;
  signUp: (
    credentials: SignUpWithPasswordCredentials,
    options?: AuthOptions
  ) => Promise<
    | { data: { user: User | null; session: Session | null }; error: null }
    | { data: { user: null; session: null }; error: AuthError }
  >;
  signOut: () => Promise<{ error: AuthError | null }>;
  dbFunction: (
    funcName: F,
    args?: Record<string, unknown>
  ) => Promise<{ data: R | null; error: string | undefined }>;
}
