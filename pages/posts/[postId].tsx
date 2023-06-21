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
            id : 
            {post.id}
        </p>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/news`)
    const data = await response.json()
    // console.log({data})

    return {
        paths: data.map((post:any) => ({
            params: {
                postId : post.id.toString()
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_DEV || process.env.NEXT_PUBLIC_API_URL_PRODUCTION}/news/${postId}`)
    const data = await response.json()
    console.log('\nGet static props',postId)
    return {
        props : {
            post: data
        },
        revalidate: 5,
    }
}

export default PostDetailPage