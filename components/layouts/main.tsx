import { LayoutProps } from '@/models';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import NavBar from '../common/navbar';

export function MainLayout ({children}: LayoutProps) {

    React.useEffect(() => {
        console.log('mounting')
    
      return () => {
        console.log('unmouting')
      }
    }, [])
    
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
        </div>
    </div>
  );
}
