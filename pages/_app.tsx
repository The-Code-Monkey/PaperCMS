import { Box } from '@techstack/components';
import { SessionProvider, signOut } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';

import '../styles/global.scss';

import Auth from '../components/auth';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <Auth>
        <div className='wrapper'>
          <aside>
            <Box as='ul'>
              <Box as='li' className={router.pathname == '/' ? 'active' : ''}>
                <Link href={'/'}>
                  <a>
                    <span>Dashboard</span>
                  </a>
                </Link>
              </Box>
              <Box
                as='li'
                className={router.pathname.startsWith('/users') ? 'active' : ''}
              >
                <Link href={'/users'}>
                  <a>
                    <span>Users</span>
                  </a>
                </Link>
              </Box>
              <Box as='li'>
                <Link href=''>
                  <a onClick={() => signOut()}>
                    <span>Logout</span>
                  </a>
                </Link>
              </Box>
            </Box>
          </aside>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </Auth>
    </SessionProvider>
  );
}

export default MyApp;
