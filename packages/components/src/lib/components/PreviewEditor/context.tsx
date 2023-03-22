import {createContext, ReactNode, useEffect, useState} from 'react';
import useDB from "../../utils/useDB";

export type SiteThemeConfig = {
  menu: Array<[string, string]>;
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

const SiteThemeProvider = ({children}: Props) => {
  const DB = useDB();
  const [menu, setMenu] = useState<Array<[string, string]>>([['Homepage', '/'], ['test', '/test']]);

  const updateMenu = (newMenuItem) => {
    setMenu(prevState => {
      const newState = [...prevState];
      newState.push([newMenuItem.title, newMenuItem.link]);
      return newState;
    })
  }

  const menuSub = DB.subscribe('menu', (payload) => updateMenu(payload.new))

  useEffect(() => {
    const getInitialMenu = async () => {
      const { data } = await DB.get<Array<Record<string, string>>>('menu');

      setMenu(data.map(entry => [entry.title, entry.link]))
    }

    getInitialMenu();

    () => DB.unsubscribe(menuSub);
  }, [])

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
