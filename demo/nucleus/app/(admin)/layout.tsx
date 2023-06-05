import {useDB} from '@nucleus-cms/utils';
import { ReactNode } from 'react';


import Nav from './Nav';

interface Props {
  children: ReactNode;
}

const AdminLayout = async ({ children }: Props) => {
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
