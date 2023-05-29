// import Header from '@/components/common/header';
import { MainLayout } from '@/components/layouts';
import dynamic from 'next/dynamic';
import * as React from 'react';

const Header = dynamic(() => import('@/components/common/header'), {ssr :false})

export interface AboutPageProps {
}

export default function AboutPage (props: AboutPageProps) {
  return (
    <div>
        about page
        <Header />
    </div>
  );
}

AboutPage.Layout = MainLayout
