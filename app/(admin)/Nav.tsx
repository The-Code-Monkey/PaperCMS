'use client';

import { Box } from '@techstack/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { use } from 'react';

import useDB from '../../db';
import { DbReturnType } from '../../db/types';

const capitalizeFirstLetter = ([first, ...rest]: any) =>
  first === undefined ? '' : first.toUpperCase() + rest.join('');

const getData = async (
  DB: DbReturnType<'products', { tablename: string }, 'get_all_table_name'>
): Promise<Array<string>> => {
  const { data, error } = await DB.dbFunction('get_all_table_name');

  if (error) {
    throw new Error(`Fetch table names: ${error}`);
  }

  return data?.map(table => table.tablename) ?? [];
};

const Nav = () => {
  const pathname = usePathname();
  const DB = useDB<{ tablename: string }>();

  const routes = use(getData(DB));

  const handleSignOut = async () => {};

  return (
    <aside>
      <Box<'ul'> as='ul'>
        <Box<'li'> as='li' className={pathname == '/' ? 'active' : ''}>
          <Link href={'/'}>
            <span>Dashboard</span>
          </Link>
        </Box>
        <Box<'li'>
          as='li'
          className={pathname.startsWith('/users') ? 'active' : ''}
        >
          <Link href={'/list/users'}>
            <span>Users</span>
          </Link>
        </Box>
        {routes.map(route => (
          <Box<'li'>
            key={route}
            as='li'
            className={pathname.startsWith(`/list/${route}`) ? 'active' : ''}
          >
            <Link href={`/list/${route}`}>
              <span>{capitalizeFirstLetter(route)}</span>
            </Link>
          </Box>
        ))}
        <Box<'li'> as='li'>
          <Link href='/'>
            <span>Logout</span>
          </Link>
        </Box>
      </Box>
    </aside>
  );
};

export default Nav;
