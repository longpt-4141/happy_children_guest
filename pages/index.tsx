import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'

const inter = Inter({ subsets: ['latin'] })

const  Home : NextPageWithLayout = () => {

  const router = useRouter();

  const goToDetailPage = () => {
    router.push({
      pathname: '/posts',
    })
  }

  return (
    <>
        <button
          onClick={goToDetailPage}
        >
          Go to post detail page
        </button>
    </>
  )
}

Home.Layout = MainLayout

export default Home
