import type { AppProps } from 'next/app'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className="wrapper">
    <Component {...pageProps} />
  </div>
}

export default MyApp
