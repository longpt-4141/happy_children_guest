import { GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

export interface  PostsPageProps {
    posts: any[]
}

export default function PostsPage ({posts}:  PostsPageProps) {
  return (
    <div>
        {posts? 
        posts.map(post => (
            <div key={post.id}>
                {post.title}
            </div>
        )) :
        null   
    }
    </div>
  );
}

export const getStaticProps : GetStaticProps<PostsPageProps> = async (
    context : GetStaticPropsContext
) => {

    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=1`)
    const data = await response.json()
    console.log('\nGet static data', data)
    console.log('\nGet static props', context)
    return {
        props : {
            posts: data
        }
    }
}
