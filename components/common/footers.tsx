import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { TiSocialFacebook } from 'react-icons/ti'
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import Arrow from '../../public/img/bg/arrow.svg'
type Props = {}

const Footers = (props: Props) => {
  return (
    <footer className="flex h-48 px-24 py-4 bg-mainPink items-center justify-between">
    <p
    className='text-white font-semibold text-[14px]'
    >Copyright (c) OpenStreet Co., Ltd. All Rights Reserved</p>
    <div className='flex gap-4'>
        <motion.div
        className='p-2 border-2 border-white rounded-full'
        whileHover={{
            scale: 1.2
        }}
        >
        <Link href='https://www.facebook.com/longpt.0412/' className='text-2xl text-white'>
            <TiSocialFacebook />
        </Link>
        </motion.div>
        <motion.div
        className='p-3 border-2 border-white rounded-full m-auto'
        whileHover={{
            scale: 1.2
        }}
        >
        <Link href='https://www.facebook.com/longpt.0412/' className=' text-white'>
            <BsInstagram />
        </Link>
        </motion.div>
        <motion.div
        className='p-3 border-2 border-white rounded-full m-auto'
        whileHover={{
            scale: 1.2
        }}
        >
        <Link href='https://www.facebook.com/longpt.0412/'  className=' text-white'>
            <BsTwitter />
        </Link>
        </motion.div>
    </div>
    <Arrow width={40 } className=' -rotate-90' style={{stroke: 'white'}} />
    </footer>
  )
}

export default Footers