const useDB = () => {
  const getDB = async () => {
    switch (process.env.dbProvider) {
      case 'supabase':
      default: {
        return await import('./supabase/getSupabase');
      }
    }
  };

  return getDB();
};

export default useDB;
