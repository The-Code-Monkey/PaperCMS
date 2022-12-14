'use client';

import { Box } from '@techstack/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const capitalizeFirstLetter = ([first, ...rest]: any) =>
  first === undefined ? '' : first.toUpperCase() + rest.join('');

interface Props {
  routes: Array<string>;
}

const Nav = ({ routes = [] }: Props) => {
  const pathname = usePathname() ?? '/';

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
          <Link href='/auth/logout'>
            <span>Logout</span>
          </Link>
        </Box>
      </Box>
    </aside>
  );
};

export default Nav;
