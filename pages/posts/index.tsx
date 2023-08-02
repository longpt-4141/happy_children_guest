import AllPosts from '@/components/posts/AllPosts';
import Events from '@/components/posts/Events';
import Regular from '@/components/posts/Regular';
import { Tabs, TabsProps } from 'antd';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';

export interface  PostsPageProps {
    posts: any[],
    regularPosts: any[],
    eventPosts: any[],
}

export default function PostsPage ({posts, regularPosts,eventPosts}:  PostsPageProps) {
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: `Tát cả`,
          children: <AllPosts eventPosts={eventPosts} regularPosts={regularPosts} />,
        },
        {
          key: '2',
          label: `Tin tức thường ngày`,
          children: <Regular regularPosts={regularPosts} />, 
        },
        {
          key: '3',
          label: `Sự kiện`,
          children: <Events eventPosts={eventPosts} />,
        },
      ];
    
    const onChange = (key: string) => {
        console.log(key);
      };
  return (
    <div className='pt-[10vw]'>
        <div className="title-textbox md:px-48 md:pb-32 ">
            <div className="en font-black tracking-widest">
                <div className="relative flex gap-1">
                    <div className="text-7xl">N</div>
                    <div className="text-7xl">E</div>
                    <div className="text-7xl">W</div>
                    <div className="text-7xl">S</div>
                </div>
                <p className="font-Montserrat mt-2 font-normal">Trang tin tức</p>
            </div>
        </div>
        <div className="lowerlayer bg-mainPink md:h-80">
       
        </div>
        <div className="news_body bg-[#FCF1DD] md:w-screen-[85] m-auto md:py-10 md:px-16  relative -top-52">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered/>
        </div>
    </div>
  );
}

export const getStaticProps : GetStaticProps<PostsPageProps> = async (
    context : GetStaticPropsContext
) => {
 
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/news`)
    const data = await response.json()
    // console.log('\nGet static data', data)
    console.log('\nGet static props >>>>', context)
    return {
        props : {
            posts: data,
            regularPosts: data.filter((post: { fundId: null; }) => post.fundId === null),
            eventPosts: data.filter((post: { fundId: null; }) => post.fundId !== null)
        }
    }
}
