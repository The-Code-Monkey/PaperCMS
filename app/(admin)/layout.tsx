import { ReactNode, Suspense } from 'react';

import useDB from '../../db';

import Nav from './Nav';

interface Props {
  children: ReactNode;
}

const AdminLayout = async ({ children }: Props) => {
  const DB = useDB<Record<string, string>>();
  const { data } = await DB.dbFunction('get_all_table_name');

  const routes = data?.map(table => table.tablename) ?? [];

  return (
    <div className='wrapper' id='outer'>
      <Nav routes={routes} />
      <Suspense>{children}</Suspense>
    </div>
  );
};

export default AdminLayout;
