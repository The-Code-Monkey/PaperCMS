import { withPageAuth } from '@supabase/auth-helpers-nextjs';

const Index = () => {
  return <>Dashboard</>;
};

export const getServerSideProps = withPageAuth({ redirectTo: '/auth/login' });

export default Index;
