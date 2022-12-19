'use client';

import { Box, Icon } from '@techstack/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { capitalizeFirstLetter } from '../utils';

import { StyledAside } from './styled';

const routeToIcon: Record<string, ReactNode> = {
  products: <Icon name='box' />,
  blog: <Icon name='book' />,
};

interface Props {
  routes: Array<string>;
}

const Nav = ({ routes = [] }: Props) => {
  const pathname = usePathname() ?? '/';

  return (
    <StyledAside>
      <Box<'ul'> as='ul'>
        <Box<'li'> as='li' className={pathname == '/' ? 'active' : ''}>
          <Link href={'/'}>
            <Icon name='barchart2' />
            <span>Dashboard</span>
          </Link>
        </Box>
        <Box<'li'>
          as='li'
          className={pathname.startsWith('/users') ? 'active' : ''}
        >
          <Link href={'/list/users'}>
            <Icon name='users' />
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
              {routeToIcon?.[route] ?? <Icon name='helpcircle' />}
              <span>{capitalizeFirstLetter(route)}</span>
            </Link>
          </Box>
        ))}
        <Box<'li'> as='li'>
          <Link href='/auth/logout'>
            <Icon name='logout' />
            <span>Logout</span>
          </Link>
        </Box>
      </Box>
    </StyledAside>
  );
};

export default Nav;
