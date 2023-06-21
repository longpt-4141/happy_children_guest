import { LayoutProps } from '@/models';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import NavBar from '../common/navbar';
import Footers from '../common/footers';

export function EmptyLayout ({children}: LayoutProps) {
  return (
    <div> 
      <Head>
        <title>Happy Children</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/img/logo/short_logo.svg" />
      </Head>
      <div>
          <NavBar />
            {children}
          <Footers />
      </div>
    </div>
  );
}
