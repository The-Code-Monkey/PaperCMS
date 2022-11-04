import config from '../orchard.theme.config.json';

import useGetSupabase from './supabase';

const useDB = <
  R extends Record<string, unknown>,
  T extends string = '',
  F extends string = ''
>() => {
  const useGetDB = () => {
    switch (config.dbProvider) {
      case 'supabase':
      default: {
        return useGetSupabase<R>();
      }
    }
  };

  return useGetDB();
};

export default useDB;
