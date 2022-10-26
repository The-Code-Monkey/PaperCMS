import { Box } from '@techstack/components';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import useDB from '../../db';

interface Props {
  children: ReactNode;
}

const capitalizeFirstLetter = (
  [first, ...rest]: any,
  locale = navigator.language
) =>
  first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('');

const AdminLayout = ({ children }: Props) => {
  // const pathname = usePathname();
  const { asPath: pathname } = useRouter();
  const [routes, setRoutes] = useState<Array<string>>([]);
  const DB = useDB<{ tablename: string }>();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await DB.dbFunction('get_all_table_name');

      if (error) throw new Error(error);

      const tables: Array<string> = data?.map(table => table.tablename) ?? [];
      setRoutes(tables);
    };

    getData();
  }, [DB]);

  const handleSignOut = async () => {};

  return (
    <div className='wrapper'>
      <aside>
        <Box as='ul'>
          <Box as='li' className={pathname == '/' ? 'active' : ''}>
            <Link href={'/'}>
              <span>Dashboard</span>
            </Link>
          </Box>
          <Box
            as='li'
            className={pathname.startsWith('/users') ? 'active' : ''}
          >
            <Link href={'/admin/list/users'}>
              <span>Users</span>
            </Link>
          </Box>
          {routes.map(route => (
            <Box
              key={route}
              as='li'
              className={pathname.startsWith(`/list/${route}`) ? 'active' : ''}
            >
              <Link href={`/admin/list/${route}`}>
                <span>{capitalizeFirstLetter(route)}</span>
              </Link>
            </Box>
          ))}
          <Box as='li'>
            <Link href='/admin'>
              <span>Logout</span>
            </Link>
          </Box>
        </Box>
      </aside>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
