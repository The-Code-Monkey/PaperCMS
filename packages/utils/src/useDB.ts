import getSupabase from './supabase/getSupabase';

const useDB = () => {
  const getDB = () => {
    switch (process.env['NEXT_PUBLIC_DB_PROVIDER']) {
      case 'supabase':
      default: {
        return getSupabase();
      }
    }
  };

  return getDB();
};

export default useDB;
