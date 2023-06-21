import Link from 'next/link';
import * as React from 'react';
import NavbarStyle from '@/styles/Navbar.module.scss'
import Image from 'next/image';
import Full_logo from '../../public/img/logo/full_logo.svg'
import { useRef } from "react";
import { motion,useCycle } from "framer-motion";
import { useDimensions } from './use-dimension';
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
export interface INavBarProps {
}

export default function NavBar (props: INavBarProps) {
  const [isMenuOpen, setOpenMenu] = React.useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at ${100-6.5}vw 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
        duration :3
      }
    }),
    closed: {
      clipPath: `circle(30px at ${100-6.5}vw 40px)`,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration :3

      }
    }
  };

  const handleOpenMenu = () => {
    console.log('check');
    setOpenMenu(!isMenuOpen);
  }

  return (
    <header id="l-header" style={{opacity: 1, transform: "matrix(1, 0, 0, 1, 0, 0)"}} className={NavbarStyle.lHeader}>
            <div className='fixed right-48 z-[102]'>
              <Link href='/donate' className="bg-white border-2 border-mainPink rounded-full px-20 py-3 relative transition duration-150 ease-out hover:ease-in top-8 hover:bg-mainPink group hover:border-white">
                <span className="uppercase tracking-wider font-semibold font-Montserrat text-mainPink group-hover:text-white">Donate</span>
              </Link>
            </div>
            <div id="l-header__inner"
              className="w-full h-full relative flex flex-wrap justify-between items-start z-[101] "
            >
                <h1 id="l-header-logo" 
                className="
                  md:w-60
                  md:pt-3
                  md:pl-8
                  max-[767px]:w-50
                  max-[767px]:pt-2
                  max-[767px]:pl-6
                ">
                    <Link href="/" className='w-full h-full relative block z-[300]'>
                        <Full_logo className={!isMenuOpen ? NavbarStyle.color : NavbarStyle.colorIsClosed} />
                        <Full_logo className={isMenuOpen ? NavbarStyle.whiteIsOpened : NavbarStyle.white } />
                    </Link>
                </h1>
                <div id="l-header-trigger" 
                className="
                  md:w-12
                  md:h-12
                  md:mt-6
                  md:mr-8
                  max-[767px]:w-10
                  max-[767px]:h-10
                  max-[767px]:mt-5
                  max-[767px]:mr-5
                ">
                    {/* <input type="checkbox" className={NavbarStyle.navigation__checkbox} id="nav-toggle" checked={isMenuOpen} onChange={handleOpenMenu}/>
                    <label 
                      htmlFor="nav-toggle" className={NavbarStyle.navigation__button}
                    >
                      <span className={NavbarStyle.navigation__icon}  ></span>
                    </label>
                    <div className={NavbarStyle.navigation__background}></div>
                    <nav className={NavbarStyle.navigation__nav} role='navigation'>
                      <div className="navigation__inner relative w-full h-full block">
                        <div 
                          className="navigation__content
                            md:flex
                            md:justify-center
                            md:items-center
                            w-full
                            h-full
                            relative
                            block
                            z-[1]
                          ">
                          <div className="navi__contents__donate">

                          </div>
                          <ul className='navi__contents_main
                            max-[767px]:relative
                            max-[767px]:opacity-100
                            max-[767px]:py-[9.33333vw]
                            max-[767px]:px-[6vw]
                            
                          '>
                            <li 
                            className={
                              !isMenuOpen ?
                              ' opacity-0 translate-x-60 transition delay-500 duration-500 ease-in-out'
                              :
                              ' opacity-1 translate-x-0 transition delay-500 duration-500 ease-in-out'
                            }
                            data-target="about">
                              <Link href="/about" className="js__link">
                                <span className="en">ABOUT</span>
                                <span className="vn">Giới thiệu về Happy Children</span>
                              </Link>
                            </li>
                            <li 
                            className={
                              !isMenuOpen ?
                              ' opacity-0 '
                              :
                              ' animate-menuIn '
                            }
                            data-target="about">
                              <Link href="/about" className="js__link">
                                <span className="en">ABOUT</span>
                                <span className="vn">Giới thiệu về Happy Children</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div 
                          className="navigation__bg
                            w-full
                            h-full
                            absolute
                            block
                            top-0
                            left-0
                          ">

                        </div>
                      </div>
                  </nav> */}
                  <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef}
                    transition={
                      {duration : 3}
                    }
                    className={`absolute top-0 left-0 bottom-0 w-screen h-screen ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    <motion.div className="absolute top-0 left-0 bottom-0 w-screen bg-mainPink  " variants={sidebar} />
                    <Navigation toggle={() => toggleOpen()} />
                  </motion.nav>
                  <motion.div
                    animate={isOpen ? "open" : "closed"}
                  >
                    <MenuToggle toggle={() => toggleOpen()} />
                  </motion.div>
                </div>
            </div>
    </header>
  );
}
