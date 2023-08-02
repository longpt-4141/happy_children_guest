import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 4 },
  },
  closed: {
    transition: { staggerChildren: 0.09, staggerDirection: -1 }
  }
};
const mainMenuItems = [
    {
        id: 1,
        route : 'about',
        text : 'about',
        subtext : 'Giới thiệu về Happy Children',
        bg: 'https://firebasestorage.googleapis.com/v0/b/happy-children-6bac7.appspot.com/o/about.svg?alt=media&token=7f81d85f-b938-4270-bc39-f042aab4bcfc&_gl=1*7qzo9a*_ga*MTQ2MTU5ODE4Ny4xNjg0MDQzMjcx*_ga_CW55HF8NVT*MTY4NTk2NDg3NC44LjEuMTY4NTk2NTE1OS4wLjAuMA..'
    },
    {
        id: 2,
        route : 'donate',
        text : 'donate',
        subtext : 'Từ thiện',
        bg: 'https://firebasestorage.googleapis.com/v0/b/happy-children-6bac7.appspot.com/o/Donate.svg?alt=media&token=8efc71f2-847d-4e18-be47-fc51412670d3&_gl=1*koctoc*_ga*MTQ2MTU5ODE4Ny4xNjg0MDQzMjcx*_ga_CW55HF8NVT*MTY4NTk2NDg3NC44LjEuMTY4NTk2NTMwMC4wLjAuMA..'
    },
    {
        id: 3,
        route : 'posts',
        text : 'news',
        subtext : 'Trang tin tức',
        bg: 'https://firebasestorage.googleapis.com/v0/b/happy-children-6bac7.appspot.com/o/News.svg?alt=media&token=5ecb2f84-8567-4753-bf8b-73a470de3c4d&_gl=1*nod3vz*_ga*MTQ2MTU5ODE4Ny4xNjg0MDQzMjcx*_ga_CW55HF8NVT*MTY4NTk2NDg3NC44LjEuMTY4NTk2NTM1MS4wLjAuMA..'
    },
    {
        id: 4,
        route : 'reports',
        text : 'reports',
        subtext : 'Báo cáo tài chính',
        bg: 'https://firebasestorage.googleapis.com/v0/b/happy-children-6bac7.appspot.com/o/statistic.svg?alt=media&token=40f7e5fc-8749-4584-940d-0112631c4614&_gl=1*ihgjbx*_ga*MTQ2MTU5ODE4Ny4xNjg0MDQzMjcx*_ga_CW55HF8NVT*MTY4NTk2NDg3NC44LjEuMTY4NTk2NTM3Ny4wLjAuMA..'
    },
    {
        id: 5,
        route : 'funds',
        text : 'funds',
        subtext : 'Các quỹ từ thiện',
        bg: 'https://firebasestorage.googleapis.com/v0/b/happy-children-6bac7.appspot.com/o/funds.svg?alt=media&token=fee12709-23e2-4772-b318-b77c02a91dc6&_gl=1*1lnx9d0*_ga*MTQ2MTU5ODE4Ny4xNjg0MDQzMjcx*_ga_CW55HF8NVT*MTY4NTk2ODI2My45LjEuMTY4NTk2ODI3My4wLjAuMA..'
    }
];

const subMenuItems = [
    {
        id: 1,
        route : 'term_of_use',
        text : 'term of use',
        subtext : 'Cách sử dụng trang web'
    },
    {
        id: 2,
        route : 'contact',
        text : 'contact',
        subtext : 'Cách liên hệ'
    },
    {
        id: 3,
        route : 'privacy_policy',
        text : 'privacy policy',
        subtext : 'Chính sách bảo mật'
    },
    {
        id: 4,
        route : 'faq',
        text : 'faq',
        subtext : 'Những câu hỏi thường gặp'
    },
    {
        id: 5,
        route : 'benefactor',
        text : 'benefactor',
        subtext : 'Các nhà hảo tâm'
    },
    {
        id: 6,
        route : 'volunteer',
        text : 'volunteer',
        subtext : 'Tham gia tình nguyện'
    }
];

export const Navigation = ({ toggle }: any) => (
  <motion.ul variants={variants}>
    <div 
        style={{
        display: 'flex',
        flexDirection: 'row'
    }}
        className="justify-center relative z-100 h-screen items-center"
    >
      <div className='column1 md:mr-[6.5vw]'>
      {mainMenuItems.map(i => (
        <MenuItem i={i} key={i.id} type={`main`} toggle={toggle}/>
      ))}
      </div>
      <div className='column2 grid grid-cols-2 gap-6 relative z-2'>
      {subMenuItems.map(i => (
        <MenuItem i={i} key={i.id} type={`sub`} toggle={toggle}/>
      ))}
      </div>

    </div>
  </motion.ul>
);

