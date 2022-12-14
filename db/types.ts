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

export interface DbReturnType<
  T extends string,
  R extends Record<string, unknown>,
  F extends string
> {
  get: (
    table: T,
    columns?: string
  ) => Promise<{ data: R[] | null; error: string | undefined }>;
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
    funcName: F
  ) => Promise<{ data: R[] | null; error: string | undefined }>;
}
