import { ReactNode } from 'react';

import RootStyleRegistry from './RootStyleRegistry';
import { Provider } from './provider';

import './global.scss';

const MyApp = async ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <RootStyleRegistry>{children}</RootStyleRegistry>
    </Provider>
  );
};

export default MyApp;
