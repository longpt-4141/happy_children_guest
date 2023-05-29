import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

export interface PostDetailPageProps {
    post: any
}

const PostDetailPage = ({post}: PostDetailPageProps) => {
    const router = useRouter()
    
    if(!post) return null
  return (
    <>
        <h1>Post detail page</h1>
        <p>
            {post.title}
        </p>
        <p>
            {post.author}
        </p>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
    const data = await response.json()


    return {
        paths: data.data.map((post:any) => ({
            params: {
                postId : post.id
            }
        })),
        fallback: false
    }
}

export const getStaticProps : GetStaticProps<PostDetailPageProps> = async (
    context : GetStaticPropsContext
) => {

    const postId = context.params?.postId
    if(!postId) {
        return {
            notFound : true
        }
    }

    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
    const data = await response.json()
    console.log('\nGet static props',context.params?.postId)
    return {
        props : {
            post: data
        },
        revalidate: 5,
    }
}

export default PostDetailPage