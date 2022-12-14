import { ReactNode } from 'react';

import useDB from '../../db';

import Nav from './Nav';

import '../global.scss';

interface Props {
  children: ReactNode;
}

const AdminLayout = async ({ children }: Props) => {
  const DB = useDB<Record<string, string>>();
  const { data } = await DB.dbFunction('get_all_table_name');

  const routes = data?.map(table => table.tablename) ?? [];

  return (
    <div className='wrapper'>
      <Nav routes={routes} />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
