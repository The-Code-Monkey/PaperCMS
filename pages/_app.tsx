import type { AppProps } from 'next/app'
import {SessionProvider, signOut} from "next-auth/react"

import '../styles/global.scss'
import Auth from "../components/auth";
import Link from "next/link";
import {useRouter} from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const router = useRouter();

  return <SessionProvider session={session}>
    <Auth>
    <div className="wrapper">
        <aside>
          <ul>
              <li className={router.pathname == "/" ? "active" : ""} ><Link href={"/"}><a><span>Dashboard</span></a></Link></li>
              <li className={router.pathname.startsWith("/users") ? "active" : ""}><Link href={"/users"}><a><span>Users</span></a></Link></li>
            <li onClick={() => signOut()}><a><span>Logout</span></a></li>
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
