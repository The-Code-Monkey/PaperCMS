'use client';

import {capitalizeFirstLetter} from "@nucleus-cms/components";
import { Box, ConfigContext, Context, Icon } from '@techstack/components';
import { IconTypes } from '@techstack/react-feather';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import useDarkMode from 'use-dark-mode';

import { StyledAside } from './styled';

const routeToIcon: Record<string, IconTypes> = {
  products: 'box',
  blog: 'book',
  authCode: 'hash',
  pages: 'bookopen',
};

interface Props {
  routes: Array<string>;
}

const Nav = ({ routes = [] }: Props) => {
  const pathname = usePathname() ?? '/';
  const { toggle, value } = useDarkMode();
  // @ts-ignore
  const { hasUsers } = useContext<Context>(ConfigContext);

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
        {/*// @ts-ignore*/}
        <Link href={href}>
          <>
            {/*// @ts-ignore*/}
            <Icon name={icon} />
            <span>{title}</span>
          </>
        </Link>
      </Box>
    );
  };

  return (
    <StyledAside>
      <Box<'ul'> as='ul' m='0' py='3' px='0' bg='neutrals.8' flex='1'>
        {renderListItem('/', 'barchart2', 'Dashboard')}
        {hasUsers && renderListItem('/users', 'users', 'Users')}
        {routes.map(route => route !== 'settings' &&
          renderListItem(
            `/list/${route}`,
            routeToIcon?.[route] ?? 'helpcircle',
            capitalizeFirstLetter(route)
          )
        )}
      </Box>
      <Box<'ul'> as='ul' m='0' py='3' px='0' bg='neutrals.8'>
        {renderListItem('/settings', 'settings', 'Settings', { h: '10' })}
        <Box<'li'> as='li' d='flex' w='full' h='10' cursor='pointer' mb='3'>
          <a onClick={toggle} style={{ cursor: 'pointer' }}>
            {/*// @ts-ignore*/}
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
