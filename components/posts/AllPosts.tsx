import dynamic from 'next/dynamic'
import React from 'react'
// import Regular from './Regular'
// import Events from './Events'
const Regular = dynamic(
  () => import('./Regular'),
  { ssr: false }
)
const Events = dynamic(
  () => import('./Events'),
  { ssr: false }
)

type Props = {
    eventPosts: any[],
    regularPosts: any[],
}

const AllPosts = ({regularPosts, eventPosts}: Props) => {
  return (
    <div>
        <div>
            <Regular regularPosts={regularPosts} />
        </div>
        <div>
            <Events eventPosts={eventPosts} />
        </div>
    </div>
  )
}

export default AllPosts