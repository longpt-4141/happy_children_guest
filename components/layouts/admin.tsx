import { LayoutProps } from '@/models';
import Link from 'next/link';
import * as React from 'react';

export function AdminLayout ({children}: LayoutProps) {
  return (
    <div> 
        <h1>Admin Layout</h1>
        <div>Side bar</div>
        <Link href='/'>
            Home
        </Link>
        <Link href='/about'>
            Home
        </Link>
        <div>
            {children}
        </div>
    </div>
  );
}
