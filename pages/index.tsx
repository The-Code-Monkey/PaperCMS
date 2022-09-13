import { ReactElement } from 'react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

import AdminLayout from '../layouts/Admin';

import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
  return <>Dashboard</>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuth({ redirectTo: '/auth/login' });

export default Page;
