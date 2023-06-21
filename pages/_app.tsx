import { EmptyLayout } from '@/components/layouts'
import { AppPropsWithLayout } from '@/models'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react';
import { ParallaxProvider } from 'react-scroll-parallax';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  console.log('app re render')

  const Layout = Component.Layout ?? EmptyLayout

  return (
    <SessionProvider session={session}>
      <ParallaxProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </ParallaxProvider>
    </SessionProvider>
  )
}


