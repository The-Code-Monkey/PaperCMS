import config from '../orchard.theme.config.json';
import {useSessionContext} from "@supabase/auth-helpers-react";
import {SignInWithPasswordCredentials, SignUpWithPasswordCredentials} from "@supabase/gotrue-js/src/lib/types";

interface DbReturnType<T> {
  signIn: (credentials: any, options?: any) => any;
  signUp: (credentials: any, options?: any) => any;
  get: (table: string, columns?: string) => Promise<{ data: T[] | null; error: string | undefined }>;
  dbFunction: (funcName: string) => Promise<{ data: T[] | null, error: string | undefined }>;
}

const DB = <T extends Record<string, unknown>>(): DbReturnType<T> => {
  const getDB = () => {
    switch (config.dbProvider) {
      case "supabase":
      default: {
        type AuthOptions = {
          redirectTo?: string
          scopes?: string
          captchaToken?: string
          queryParams?: { [key: string]: string }
        }

        const {supabaseClient: supabase} = useSessionContext();

        const signIn = async (credentials: SignInWithPasswordCredentials, options: AuthOptions) => {
          return await supabase.auth.signInWithPassword({...credentials, ...options})
        }

        const signUp = async (credentials: SignUpWithPasswordCredentials, options: AuthOptions) => {
          return await supabase.auth.signUp({...credentials, ...options})
        }

        const get: DbReturnType<T>['get'] = async (table, columns = "*") => {
          const { data, error } = await supabase.from(table).select(columns);

          return new Promise(resolve => resolve({ data, error: error?.message }));
        }

        const dbFunction: DbReturnType<T>['dbFunction'] = async (funcName: string) => {
          const {data, error} = await supabase.rpc(funcName);

          return new Promise(resolve => resolve({
            data,
            error: error?.message
          }));
        }

        return {signIn, signUp, get, dbFunction};
      }
    }
  }

  return getDB();
}

export default DB;