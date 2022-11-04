import { ReactNode } from 'react';

// import RootStyleRegistry from './RootStyleRegistry';
import { Provider } from './provider';

import './global.scss';

const MyApp = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>
        <Provider>
          {/*<RootStyleRegistry>*/}
          {children}
          {/*</RootStyleRegistry>*/}
        </Provider>
      </body>
    </html>
  );
};

export default MyApp;
