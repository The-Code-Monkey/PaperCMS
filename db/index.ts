import config from '../orchard.theme.config.json';

import getSupabase from './supabase';

const DB = <R extends Record<string, unknown>>() => {
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

export default DB;
