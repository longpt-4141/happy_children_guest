import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';

export interface  PostsPageProps {
    posts: any[]
}

export default function PostsPage ({posts}:  PostsPageProps) {
  return (
    <div>
        {posts? 
        posts.map(post => (
            <li
            key={post.id}
            >
                <Link 
                    href={`/posts/${post.id}`}
                >
                    {post.title}
                </Link>
            </li>
        )) :
        null   
    }
    </div>
  );
}

export const getStaticProps : GetStaticProps<PostsPageProps> = async (
    context : GetStaticPropsContext
) => {
 
    const response = await fetch(`http://localhost:8080/news`)
    const data = await response.json()
    console.log('\nGet static data', data)
    console.log('\nGet static props', context)
    return {
        props : {
            posts: data
        }
    }
}
