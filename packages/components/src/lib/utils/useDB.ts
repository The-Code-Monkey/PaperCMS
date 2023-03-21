import getSupabase from './supabase/getSupabase';

const useDB = () => {
  const getDB = () => {
    switch (process.env['dbProvider']) {
      case 'supabase':
      default: {
        return getSupabase();
      }
    }
  };

  return getDB();
};

export default useDB;
