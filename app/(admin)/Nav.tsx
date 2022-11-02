'use client'

import {Box} from "@techstack/components";
import Link from "next/link";
import {usePathname} from "next/navigation";
import useDB from "../../db";
import {use} from "react";

const capitalizeFirstLetter = (
  [first, ...rest]: any
) =>
  first === undefined ? '' : first.toUpperCase() + rest.join('');

const Nav = () => {
  const pathname = usePathname();
  const DB = useDB<{ tablename: string }>();

  const getData = async (): Promise<Array<string>> => {
    const { data, error } = await DB.dbFunction('get_all_table_name');

    return data?.map((table) => table.tablename) ?? [];
  };

  const routes = use(getData());

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
  )
}

export default Nav;