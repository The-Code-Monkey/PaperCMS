import config from '../orchard.theme.config.json';
import {UserCredentials} from "@supabase/gotrue-js/src/lib/types";

interface DbReturnType<T> {
    signIn: (credentials: any, options: any) => any;
    signUp: (credentials: any, options: any) => any;
    get: (table: string, columns?: string) => Promise<{ data: T[] | null; error: string | undefined }>;
    dbFunction: (funcName: string) => Promise<{ data: T[] | null, error: string | undefined }>;
}

const DB = async <T extends Record<string, unknown>>(): Promise<DbReturnType<T>> => {
    switch (config.dbProvider) {
        case "supabase":
        default: {
            type AuthOptions = {
                redirectTo?: string
                scopes?: string
                captchaToken?: string
                queryParams?: { [key: string]: string }
            }

            const {default: supabase} = await import('./supabase');

            const signIn = async (credentials: UserCredentials, options: AuthOptions) => {
                return await supabase.auth.signIn(credentials, {...options, shouldCreateUser: false})
            }

            const signUp = async (credentials: UserCredentials, options: AuthOptions) => {
                return await supabase.auth.signUp(credentials, options)
            }

            const get: DbReturnType<T>['get'] = async (table, columns = "*") => {
                const { data, error } = await supabase.from<T>(table).select(columns);

                return new Promise(resolve => resolve({ data, error: error?.message }));
            }

            const dbFunction: DbReturnType<T>['dbFunction'] = async (funcName: string) => {
                const { data, error } = await supabase.rpc<T>(funcName);

                return new Promise(resolve => resolve({
                    data,
                    error: error?.message
                }));
            }

            return new Promise((resolve) => resolve({ signIn, signUp, get, dbFunction }));
        }
    }
}

export default DB;