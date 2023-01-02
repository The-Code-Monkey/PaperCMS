import config from '../orchard.theme.config.json';

import getSupabase from './supabase';

const useDB = <R extends any>() => {
  const getDB = () => {
    switch (config.dbProvider) {
      case 'supabase':
      default: {
        return getSupabase<R>();
      }
    }
  };

  return getDB();
};

export default useDB;
