import 'server-only';

import { useDB } from '@nucleus-cms/db';
import { PropsWithChildren } from 'react';

import Nav from './Nav';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const AdminLayout = async ({ children }: PropsWithChildren) => {
  const DB = useDB();
  const { data } = await DB.dbFunction<Record<string, string>[]>(
    'get_all_table_name'
  );

  const routes = data?.map(table => table.tablename) ?? [];

  return (
    <div className='wrapper' id='outer'>
      <Nav routes={routes} />
      {children}
    </div>
  );
};

export default AdminLayout;
