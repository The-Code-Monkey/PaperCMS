import type { AppProps } from 'next/app'
import {SessionProvider, signOut} from "next-auth/react"

import '../styles/global.scss'
import Auth from "../components/auth";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <SessionProvider session={session}>
    <Auth>
    <div className="wrapper">
        <aside>
          <ul>
            <li><span>Dashboard</span></li>
            <li><span>Users</span></li>
            <li onClick={() => signOut()}><span>Logout</span></li>
          </ul>
        </aside>
        <main>
          <Component {...pageProps} />
        </main>
  </div>
    </Auth>
  </SessionProvider>
}

export default MyApp
