import { EmptyLayout } from '@/components/layouts'
import { AppPropsWithLayout } from '@/models'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  console.log('app re render')

  const Layout = Component.Layout ?? EmptyLayout

  return (
    <SessionProvider session={session}>
      <ParallaxProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ParallaxProvider>
    </SessionProvider>
  )
}


