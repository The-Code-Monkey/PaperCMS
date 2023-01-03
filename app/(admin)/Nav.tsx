'use client';

import { Box, Icon } from '@techstack/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useDarkMode from 'use-dark-mode';
import { IconTypes } from '@techstack/react-feather';

import { capitalizeFirstLetter } from '../utils';

import { StyledAside } from './styled';

const routeToIcon: Record<string, IconTypes> = {
  products: 'box',
  blog: 'book',
  'auth-code': 'hash',
};

interface Props {
  routes: Array<string>;
}

const Nav = ({ routes = [] }: Props) => {
  const pathname = usePathname() ?? '/';
  const { toggle, value } = useDarkMode();

  const renderListItem = (
    href: string,
    icon: IconTypes,
    title: string,
    styles?: Record<string, string>
  ) => {
    return (
      <Box<'li'>
        key={title}
        as='li'
        className={pathname == href ? 'active' : ''}
        d='flex'
        w='full'
        cursor='pointer'
        mb='2'
        {...styles}
      >
        <Link href={href}>
          <Icon name={icon} />
          <span>{title}</span>
        </Link>
      </Box>
    );
  };

  return (
    <StyledAside>
      <Box<'ul'> as='ul' m='0' py='3' px='0' bg='neutrals.8' flex='1'>
        {renderListItem('/', 'barchart2', 'Dashboard')}
        {renderListItem('/users', 'users', 'Users')}
        {routes.map(route =>
          renderListItem(
            `/list/${route}`,
            routeToIcon?.[route] ?? 'helpcircle',
            capitalizeFirstLetter(route)
          )
        )}
      </Box>
      <Box<'ul'> as='ul' m='0' py='3' px='0' bg='neutrals.8'>
        <Box<'li'> as='li' d='flex' w='full' h='10' cursor='pointer' mb='3'>
          <a onClick={toggle} style={{ cursor: 'pointer' }}>
            <Icon name={value ? 'sun' : 'moon'} />
            <span>Switch Theme</span>
          </a>
        </Box>
        {renderListItem('/auth/logout', 'logout', 'Logout', { h: '10' })}
      </Box>
    </StyledAside>
  );
};

export default Nav;
