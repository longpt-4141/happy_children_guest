import Head from 'next/head'
import Image from 'next/image'
import { Lato } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import NavBar from '@/components/common/navbar'
import donate from '../public/img/bg/donate.gif'
import about from '../public/img/bg/about.gif'
import BaseImage from '../public/img/bg/base.svg'
import ReportImage from  '../public/img/bg/statistic.svg'
import NewsImage from  '../public/img/bg/news.svg'
import AboutImage from '../public/img/bg/about.svg'
import ReadmoreButton from '@/components/common/ReadmoreButton'
import AnimatedTextWord from '@/components/common/AnimatedTextWord';
import { motion,useCycle } from "framer-motion";
import { useState,useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import SignImage from '../public/img/bg/sign.svg'
import Donate1 from '../public/img/bg/donate_1.png'
import Donate2 from '../public/img/bg/donate_2.png'
import Donate3 from '../public/img/bg/donate_3.png'
import WWD1 from '../public/img/bg/donate_step.svg'
import WWD2 from '../public/img/bg/giveCenterMoney.svg'
import WWD3 from '../public/img/bg/report_invoice.svg'
import VisionCarosel from '@/components/common/VisionCarosel'
import Arrow from '../public/img/bg/arrow.svg'

import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { TiSocialFacebook } from "react-icons/ti";

// const inter = Lato({ subsets: ['latin'] })

const  Home : NextPageWithLayout = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isShownDonate, setIsShownDonate] = useState(false);
  const [isShownAbout, setIsShownAbout] = useState(false);
  const [isShownStatistic, setIsShownStatistic] = useState(false);
  const [isShownNews, setIsShownNews] = useState(false);
  // const [isShownDonate, setIsShownDonate] = useState(false);

  const router = useRouter();
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event: any) => {
    setScrollTop(window.scrollY);
  };
  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  console.log({scrollTop})

  const goToDetailPage = () => {
    router.push({
      pathname: '/posts',
    })
  }

  const scroll = {
    viewIn: {
      x: 0,
      y:0,
      transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
      },
    },
    viewOut: {
      x: -1000,
      y:0,
      transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
      },
    },
    aboutViewIn: {
      x: 0,
      y:0,
      opacity: 1,
      transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
      },
    },
    aboutViewOut: {
      x: 0,
      y: 250,
      opacity: 0,
      transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
      },
    },
    reportViewOut : {
      x: 0,
      y: -1000,
      transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
      },
    },
    newsViewOut : {
      x: 1000,
      y: 0,
      transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
      },
    }
  }

  const hoverImage = {
    mouseOn: {
      y: 0,
      transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
      },
    },
    mouseOut: {
      y: 50,
      transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
      },
    },
};

  return (
    <>
        <div className="landing__intro relative w-screen h-screen">
          <div className="intro__bg"></div>
          <div className="intro__inner relative w-screen h-screen">
            <motion.div 
              variants={scroll}
              // animate={scrollTop>0 ? 'aboutViewOut': 'aboutViewIn'}
            >
                  <div className="intro__base_bg absolute w-screen flex justify-center">
                    <BaseImage width={`${75}vw`} height={`${55}vw`} />
                  </div>
              </motion.div>
            <motion.div 
              variants={scroll}
              // animate={scrollTop>0? 'viewOut': 'viewIn'}
              whileHover={{
                y: -50,
                transition: {
                    type: "spring",
                    damping: 10,
                    stiffness: 400,
                }}}
              className="intro__donate absolute top-[5vw] left-[6vw]">
              <Link 
                href="/donate"
                onMouseEnter={() => setIsShownDonate(true)}
                onMouseLeave={() => setIsShownDonate(false)}
                className='relative'
              >
                <AnimatedTextWord text={'DONATE'} isShown={isShownDonate} />
                <div className="w-screen-[35] h-screen-[35]">
                  <Image src={donate}  alt={"donate"} />
                </div>
              </Link>
            </motion.div>
            <Parallax 
                className={`intro__about absolute top-[15vw] left-[26vw] z-[11] `}
            >
              <motion.div 
              variants={scroll}
              // animate={scrollTop>0? 'aboutViewOut': 'aboutViewIn'}
                whileHover={{
                  y: -50,
                  transition: {
                      type: "spring",
                      damping: 10,
                      stiffness: 400,
                  }}}
                // style={{transform: `translateY(${scrollTop * 0.8}px)`}}
                >
                <Link 
                  href="/about"
                  onMouseEnter={() => setIsShownAbout(true)}
                  onMouseLeave={() => setIsShownAbout(false)}
                  className='relative'
                >
                  <AnimatedTextWord text={'ABOUT'} isShown={isShownAbout} />
                  <div className="w-screen-[42] h-screen-[38]">
                    <Image priority src={about}  alt={"about"} />
                  </div>
                </Link>
              </motion.div>
            </Parallax>
            <motion.div 
              variants={scroll}
              // animate={scrollTop>0? 'reportViewOut': 'viewIn'}
              whileHover={{
                y: -50,
                transition: {
                    type: "spring",
                    damping: 10,
                    stiffness: 400,
                }}}
              className="intro__statistic absolute top-0 right-[34vw]">
              <Link 
                href="/report"
                onMouseEnter={() => setIsShownStatistic(true)}
                onMouseLeave={() => setIsShownStatistic(false)}
                className='relative'
              >
                <AnimatedTextWord text={'REPORT'} isShown={isShownStatistic} />
                <ReportImage width={`${27}vw`} height={`${25}vw`} alt={"about"} />
              </Link>
            </motion.div>
            <motion.div 
              variants={scroll}
              // animate={scrollTop>0? 'newsViewOut': 'viewIn'}
              whileHover={{
                y: -50,
                transition: {
                    type: "spring",
                    damping: 10,
                    stiffness: 400,
                }}}
              className="intro__posts absolute top-[5vw] right-[6vw]">
              <Link 
                href="/posts"
                onMouseEnter={() => setIsShownNews(true)}
                onMouseLeave={() => setIsShownNews(false)}
                className='relative'
              >
                <AnimatedTextWord text={'Newspaper'} isShown={isShownNews} />
                <NewsImage width={`${30}vw`} height={`${30}vw`} alt={"about"} />
              </Link>
            </motion.div>
            <motion.div className="absolute bottom-10 left-10 flex gap-6 text-[20px] text-textBlack">
              <Link href='https://www.facebook.com/longpt.0412/'>
                <BsFacebook />
              </Link>
              <BsInstagram />
              <BsTwitter />
            </motion.div>
          </div>
        </div>
        <main className='md:pt-[30vh]'>
          <div className='p-about md:pt-48 md:mb-80 text-textBlack'>
            <div className="p-section__inner w-[70vw] m-auto relative">
              <div className="p-section-content">
                <h2 className='mb-10 relative'>
                  <div className="no absolute rotate-90 flex items-center justify-evenly top-32 -left-24 w-28">
                    <div className="no-number text-lg font-black tracking-widest">01</div>
                    <div className="no-line w-14 h-[3px] bg-black"></div>
                  </div>
                  <div className="title-textbox">
                    <div className="sign ">
                      <SignImage width={360} height={80} />
                    </div>
                    <div className="en font-black tracking-widest">
                      <div className="relative flex gap-3">
                        <div className="text-9xl">H</div>
                        <div className="text-9xl">A</div>
                        <div className="text-9xl">P</div>
                        <div className="text-9xl">P</div>
                        <div className="text-9xl">Y</div>
                      </div>
                    </div>
                  </div>
                  
                </h2>
                <div className="p-section-lead js__tsc-show font-Montserrat leading-8 font-medium" >
                  Mọi trẻ em đều cần có một cuộc sống Hạnh Phúc. <br/>
                  Số liệu từ Bộ Lao động - Thương binh và Xã hội cho thấy,<br/> Việt Nam có khoảng <span className='underline decoration-pink-500 underline-offset-4 decoration-2'>170.000 </span>trẻ mồ côi.<br/>
                  Covid 19 đi qua đã để lại hơn <span className='underline decoration-pink-500 underline-offset-4 decoration-2'>4.400</span> trẻ em mồ côi cha mẹ. <br/>
                  Các em sẽ ra sao ? <br/>
                  Các trung tâm có đủ điều kiện để chăm sóc các em ? <br/>
                  Sẽ còn có bao nhiêu em trẻ phải hàng ngày kiếm miếng cơm manh áo ? <br/>
                  <p>Không !</p>
                  Các em xứng đáng được hạnh phúc ! <br/>
                  Các em xứng đáng có 1 cuộc sống tốt hơn ! <br />
                  Các em là tương lai của đất nước ! <br />
                  Chúng tôi, và các bạn, <br/>
                  sẽ là nhưng người nâng đỡ, chăm sóc và cho các em cuộc sống đầy đủ hơn. <br/>
                  Hạnh phúc hơn !!! <br/>
                  <div className='font-DancingScripts text-3xl mt-4'>
                    &quot; Trẻ em như búp trên cành <br /> 
                    Biết ăn ngủ, biết học hành là ngoan &quot;
                    <br />
                    <div className="text-[12px] font-Montserrat font-medium">- Chủ tịch Hồ Chí Minh -</div>
                  </div>
                  <br />
                  AND WE SAY HAPPY CHILDREN!
                </div>
                <Parallax
                  className="p-bg absolute top-12 -right-28 "
                  translateY={[-40,40]}
                >
                  <div >
                    <AboutImage  width={`${40}vw`} height={`${40}vw`} />
                  </div>
                </Parallax>
              </div>
            </div>
          </div>
          <div className='p-donate md:pt-12 md:mb-80 text-textBlack'>
            <div className="p-section__inner w-[70vw] m-auto relative">
              <div className="p-section-content">
                <h2 className='mb-4 relative'>
                  <div className="no absolute rotate-90 flex items-center justify-evenly top-12 -right-24 w-28">
                    <div className="no-number text-lg font-black tracking-widest">02</div>
                    <div className="no-line w-14 h-[3px] bg-black"></div>
                  </div>
                  <div className="title-textbox">
                    <div className="en font-black tracking-widest">
                      <div className="relative flex gap-1 justify-end">
                        <div className="text-6xl">H</div>
                        <div className="text-6xl">O</div>
                        <div className="text-6xl">W</div>
                        <p className="mr-2 ml-2"></p>
                        <div className="text-6xl">T</div>
                        <div className="text-6xl">O</div>
                      </div>
                      <div className="relative flex gap-1 justify-end">
                        <div className="text-7xl">D</div>
                        <div className="text-7xl">O</div>
                        <div className="text-7xl">N</div>
                        <div className="text-7xl">A</div>
                        <div className="text-7xl">T</div>
                        <div className="text-7xl">E</div>
                      </div>
                      <p className="text-end font-Montserrat mt-2">Hướng dẫn quyên góp</p>
                    </div>
                  </div>
                </h2>
                <div className="p-section-lead js__tsc-show font-Montserrat leading-8 font-medium text-end" >
                  <div className='font-DancingScripts text-2xl font-medium'>
                    &quot; Đừng bao giờ xem nhẹ sức mạnh của một hành động nhỏ nhặt, <br /> 
                    vì nó có thể mang lại sự thay đổi lớn lao cho cuộc sống của người khác. &quot;
                    <br />
                    <div className="text-[14px] font-Montserrat font-medium">–  Anne Frank  –</div>
                  </div>
                </div>
                <ul className='flex justify-between'>
                  <li className='relative -top-9'>
                    <p className="c-balloon-step relative block m-auto w-24 h-24 -top-[7px]">
                        <span className="c-balloon-step-text relative w-full block m-auto text-center z-[1] pt-6 text-white font-semibold">STEP</span>
                        <span className="c-balloon-step-num relative w-full block m-auto text-center z-[1]  text-white font-semibold text-xl ">01</span>
                        <span className="c-balloon-step-circle w-full h-full absolute rounded-full bg-mainPink top-0 left-0"></span>
                        <span className="c-balloon-step-line absolute bg-mainPink w-[2px] right-0 left-0 ml-auto mr-auto h-8 -bottom-8 ">
                        </span>
                    </p>
                    <div className="illust mt-10">
                      <Image src={Donate1} alt='donate_1' width={250} height={250} className="m-auto"></Image>
                    </div>
                    <dl className="font-Montserrat text-mainBlack mt-5">
                        <dt className='md:text-xl font-semibold mb-4 text-center'>Chuyển khoản</dt>
                        <dd className='text-center text-[14px]'>
                          Điền thông tin <br /> và chuyển khoản theo mã QR <br /> 
                          hoặc số tài khoản đã được gán trên màn hình. 
                        </dd>
                    </dl>
                  </li>
                  <li className='relative top-9'>
                    <p className="c-balloon-step relative block m-auto w-24 h-24 -top-[7px]">
                        <span className="c-balloon-step-text relative w-full block m-auto text-center z-[1] pt-6 text-white font-semibold">STEP</span>
                        <span className="c-balloon-step-num relative w-full block m-auto text-center z-[1]  text-white font-semibold text-xl ">02</span>
                        <span className="c-balloon-step-circle w-full h-full absolute rounded-full bg-mainPink top-0 left-0"></span>
                        <span className="c-balloon-step-line absolute bg-mainPink w-[2px] right-0 left-0 ml-auto mr-auto h-8 -bottom-8 ">
                        </span>
                    </p>
                    <div className="illust mt-10">
                      <Image src={Donate2} alt='donate_1' width={250} height={250} className="m-auto"></Image>
                    </div>
                    <dl className="font-Montserrat text-mainBlack mt-5">
                        <dt className='md:text-xl font-semibold mb-4 text-center'>Chuyển khoản</dt>
                        <dd className='text-center text-[14px]'>
                          Điền thông tin và chuyển khoản theo mã QR <br /> 
                          hoặc số tài khoản đã được gán trên màn hình
                        </dd>
                    </dl>
                  </li>
                  <li className='relative top-[108px]'>
                    <p className="c-balloon-step relative block m-auto w-24 h-24 -top-[7px]">
                        <span className="c-balloon-step-text relative w-full block m-auto text-center z-[1] pt-6 text-white font-semibold">STEP</span>
                        <span className="c-balloon-step-num relative w-full block m-auto text-center z-[1]  text-white font-semibold text-xl ">03</span>
                        <span className="c-balloon-step-circle w-full h-full absolute rounded-full bg-mainPink top-0 left-0"></span>
                        <span className="c-balloon-step-line absolute bg-mainPink w-[2px] right-0 left-0 ml-auto mr-auto h-8 -bottom-8 ">
                        </span>
                    </p>
                    <div className="illust mt-10">
                      <Image src={Donate3} alt='donate_1' width={250} height={250} className="m-auto"></Image>
                    </div>
                    <dl className="font-Montserrat text-mainBlack mt-5">
                        <dt className='md:text-xl font-semibold mb-4 text-center'>Chuyển khoản</dt>
                        <dd className='text-center text-[14px]'>
                          Điền thông tin và chuyển khoản theo mã QR <br /> 
                          hoặc số tài khoản đã được gán trên màn hình
                        </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='p-donate md:pt-12 md:mb-80 text-textBlack'>
            <div className="p-section__inner w-[70vw] m-auto relative">
              <div className="p-section-content">
              <h2 className='mb-10 relative'>
                  <div className="no absolute rotate-90 flex items-center justify-evenly top-10 -left-24 w-28">
                    <div className="no-number text-lg font-black tracking-widest">03</div>
                    <div className="no-line w-14 h-[3px] bg-black"></div>
                  </div>
                  <div className="title-textbox">
                    <div className="en font-black tracking-widest">
                      <div className="relative flex gap-1">
                        <div className="text-6xl">W</div>
                        <div className="text-6xl">H</div>
                        <div className="text-6xl">A</div> 
                        <div className="text-6xl">T</div>
                        <p className="mr-2 ml-2"></p>
                        <div className="text-6xl">W</div>
                        <div className="text-6xl">E</div>
                        <p className="mr-2 ml-2"></p>
                        <div className="text-6xl">D</div>
                        <div className="text-6xl">O</div>
                      </div>
                      <p className="text-start font-Montserrat mt-2">Chúng tôi làm những gì ?</p>
                    </div>
                  </div>
                  
                </h2>
                <div className="p-section-lead js__tsc-show font-Montserrat leading-8 font-medium text-start" >
                  <div className='text-lg'>
                    Nhiệm vụ của chúng tôi là gửi số tiền quyên góp <br /> 
                    đến với những trung tâm đang cần sự trợ giúp và <br />
                    báo cáo tài chính một cách mình bạch
                    <br />
                  </div>
                </div>
                <ul className='flex justify-between'>
                  <li className='relative top-[108px]'>
                    <p className="c-balloon-step relative block m-auto w-24 h-24 -top-[7px]">
                        <span className="c-balloon-step-text relative w-full block m-auto text-center z-[1] pt-6 text-white font-semibold">STEP</span>
                        <span className="c-balloon-step-num relative w-full block m-auto text-center z-[1]  text-white font-semibold text-xl ">03</span>
                        <span className="c-balloon-step-circle w-full h-full absolute rounded-full bg-mainPink top-0 left-0"></span>
                        <span className="c-balloon-step-line absolute bg-mainPink w-[2px] right-0 left-0 ml-auto mr-auto h-8 -bottom-8 ">
                        </span>
                    </p>
                    <div className="illust mt-10">
                      <WWD3 alt='wwd_3' width={250} height={250} className="m-auto" />
                    </div>
                    <dl className="font-Montserrat text-mainBlack mt-5">
                        <dt className='md:text-xl font-semibold mb-4 text-center'>Chuyển khoản</dt>
                        <dd className='text-center text-[14px]'>
                          Điền thông tin <br /> và chuyển khoản theo mã QR <br /> 
                          hoặc số tài khoản đã được gán trên màn hình. 
                        </dd>
                    </dl>
                  </li>
                  <li className='relative top-9'>
                    <p className="c-balloon-step relative block m-auto w-24 h-24 -top-[7px]">
                        <span className="c-balloon-step-text relative w-full block m-auto text-center z-[1] pt-6 text-white font-semibold">STEP</span>
                        <span className="c-balloon-step-num relative w-full block m-auto text-center z-[1]  text-white font-semibold text-xl ">02</span>
                        <span className="c-balloon-step-circle w-full h-full absolute rounded-full bg-mainPink top-0 left-0"></span>
                        <span className="c-balloon-step-line absolute bg-mainPink w-[2px] right-0 left-0 ml-auto mr-auto h-8 -bottom-8 ">
                        </span>
                    </p>
                    <div className="illust mt-10">
                      <WWD2 alt='wwd_2' width={250} height={250} className="m-auto" />
                    </div>
                    <dl className="font-Montserrat text-mainBlack mt-5">
                        <dt className='md:text-xl font-semibold mb-4 text-center'>Chuyển khoản</dt>
                        <dd className='text-center text-[14px]'>
                          Điền thông tin và chuyển khoản theo mã QR <br /> 
                          hoặc số tài khoản đã được gán trên màn hình
                        </dd>
                    </dl>
                  </li>
                  <li className='relative -top-9'>
                    <p className="c-balloon-step relative block m-auto w-24 h-24 -top-[7px]">
                        <span className="c-balloon-step-text relative w-full block m-auto text-center z-[1] pt-6 text-white font-semibold">STEP</span>
                        <span className="c-balloon-step-num relative w-full block m-auto text-center z-[1]  text-white font-semibold text-xl ">01</span>
                        <span className="c-balloon-step-circle w-full h-full absolute rounded-full bg-mainPink top-0 left-0"></span>
                        <span className="c-balloon-step-line absolute bg-mainPink w-[2px] right-0 left-0 ml-auto mr-auto h-8 -bottom-8 ">
                        </span>
                    </p>
                    <div className="illust mt-10">
                      <WWD1 alt='wwd_1' width={300} height={300} className="m-auto" />
                    </div>
                    <dl className="font-Montserrat text-mainBlack mt-5">
                        <dt className='md:text-xl font-semibold mb-4 text-center'>Chuyển khoản</dt>
                        <dd className='text-center text-[14px]'>
                          Điền thông tin và chuyển khoản theo mã QR <br /> 
                          hoặc số tài khoản đã được gán trên màn hình
                        </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='p-donate md:pt-12 md:mb-80 text-textBlack'>
            <div className="p-section__inner w-[70vw] m-auto relative">
              <div className="p-section-content">
                <h2 className='mb-4 relative'>
                  <div className="no absolute rotate-90 flex items-center justify-evenly top-12 -right-24 w-28">
                    <div className="no-number text-lg font-black tracking-widest">04</div>
                    <div className="no-line w-14 h-[3px] bg-black"></div>
                  </div>
                  <div className="title-textbox">
                    <div className="en font-black tracking-widest">
                      <div className="relative flex gap-1 justify-end">
                        <div className="text-6xl">V</div>
                        <div className="text-6xl">I</div>
                        <div className="text-6xl">S</div>
                        <div className="text-6xl">I</div>
                        <div className="text-6xl">O</div>
                        <div className="text-6xl">N</div>
                      </div>
                      <p className="text-end font-Montserrat mt-2">Mong muốn của chúng tôi</p>
                    </div>
                  </div>
                </h2>
                <div className="p-section-lead js__tsc-show font-Montserrat leading-8 font-medium text-end" >
                  <div className='font-DancingScripts text-2xl font-medium'>
                    &quot; Mọi trẻ em đều có quyền có được mái ấm, <br /> 
                    được đi học, được ăn ngon, được vui chơi, được hạnh phúc. &quot;
                    <br />
                    <div className="text-[14px] font-Montserrat font-medium">–  Happy Children  –</div>
                  </div>
                </div>
                <VisionCarosel />
              </div>
            </div>
          </div>
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
        </main>
    </>
  )
}

Home.Layout = MainLayout

export default Home
