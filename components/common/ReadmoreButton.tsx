import React from 'react'
import Arrow from '../../public/img/bg/arrow.svg'
import Image from 'next/image'
type Props = {}

const ReadmoreButton = (props: Props) => {
  return (
    <div>
        <span
          className='flex justify-center gap-3'
        >
          <p className='text-xs uppercase'>read more</p>
          <Arrow />
        </span>
    </div>
  )
}

export default ReadmoreButton