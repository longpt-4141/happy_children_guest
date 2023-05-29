import { EmptyLayout } from '@/components/layouts'
import { AppPropsWithLayout } from '@/models'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  console.log('app re render')

  const Layout = Component.Layout ?? EmptyLayout

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}


