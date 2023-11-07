import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/gotrue-js';
import { StorageError } from '@supabase/storage-js/dist/module/lib/errors';
import { RealtimeChannel, Session, User } from '@supabase/supabase-js';

export type CarouselRecordType = {
  id: string;
  order: number;
  type: 'carousel';
  indexes?: Array<number>;
  value: {
    images?: Array<string>;
    titles?: Array<string>;
    singleTitle: boolean;
    autoPlay: boolean;
    blur?: string;
    shadow?: string;
    showArrows: boolean;
    showIndicators: boolean;
    showStatus: boolean;
    showThumbs: boolean;
    height: string | number;
  };
};

export type DefaultRecordType = {
  id: string;
  type?: string;
  value?: string;
  order: number;
  indexes?: Array<number>;
};

export type InnerSectionType = {
  id: string;
  order: number;
  type: 'inner-section';
  value?: Array<RecordType>;
  indexes?: Array<number>;
};

export type ColumnType = {
  id: string;
  order: number;
  type: 'column';
  columns: number;
  value?: Array<Array<RecordType>>;
  indexes?: Array<number>;
}

export type ImageRecordType = {
  id?: string;
  type?: 'image' | 'image-text';
  value?: Record<string, unknown>;
  order?: number;
  url?: string | Array<string>;
  indexes?: Array<number>;
};

export type RecordType =
  | DefaultRecordType
  | ImageRecordType
  | CarouselRecordType
    | ColumnType
  | InnerSectionType;

export type RecordReturnType =
  | Record<string, string>
  | Record<string, string>[]
  | Record<string, Array<RecordType>>[];

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
  ) => Promise<'error' | 'ok' | 'timed out'>;
  subscribe: (table: T, onChange: (payload) => void) => RealtimeChannel;
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
  ) => Promise<
    | { data: { user: User | null; session: Session | null }; error: null }
    | { data: { user: null; session: null }; error: Record<string, unknown> }
  >;
  signUp: (
    credentials: SignUpWithPasswordCredentials,
    options?: AuthOptions
  ) => Promise<
    | { data: { user: User | null; session: Session | null }; error: null }
    | { data: { user: null; session: null }; error: Record<string, unknown> }
  >;
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
