import { useDB } from '@nucleus-cms/utils';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { NavItemType } from '../../types';

export type SiteThemeConfig = {
  menu: Array<NavItemType>;
  styles: {
    nav: Record<string, string>;
    body: Record<string, string>;
    content: Record<string, string>;
  };
};

export const SiteThemeContext = createContext<null | SiteThemeConfig>(null);

interface Props {
  children: ReactNode;
  menu?: Array<[string, string]>;
}

const SiteThemeProvider = ({ children }: Props) => {
  const DB = useDB();
  const [menu, setMenu] = useState<Array<NavItemType>>([
    {
      id: 0,
      parent: 0,
      droppable: false,
      text: 'Homepage',
      link: '/',
    },
  ]);

  useEffect(() => {
    const getInitialMenu = async () => {
      const { data } = await DB.get('menu');

      if (data) {
        setMenu(data as unknown as Array<NavItemType>);
      }
    };

    getInitialMenu();
  }, []);

  const config: SiteThemeConfig = {
    menu,
    styles: {
      body: {
        bg: 'neutrals.5',
      },
      nav: {
        flexDir: 'row',
        justifyContent: 'end',
        alignItems: 'center',
        p: '4',
        gap: '4',
        borderBottom: '1',
        borderColor: 'neutrals.20',
      },
      content: {
        bg: 'neutrals.5',
      },
    },
  };

  return (
    <SiteThemeContext.Provider value={config}>
      {children}
    </SiteThemeContext.Provider>
  );
};

export default SiteThemeProvider;
