import NormalDonate from '@/components/donate/NormalDonate';
import { Tabs, TabsProps } from 'antd';
import React from 'react'

type Props = {}

const DonatePage = (props: Props) => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <div className='text-[#EB6446] text-base'>Quỹ chung</div>,
      children: <NormalDonate />,
    },
    {
      key: '2',
      label: <div className='text-[#EB6446] text-base'>Quyên góp sự kiện</div>,
      children: '3', 
    },
    {
      key: '3',
      label: <div className='text-[#EB6446] text-base'>Từ thiện hiện vật</div>,
      children: '2', 
    },
  ];

  return (
    <div>
          <div className='pt-[10vw]'>
        <div className="title-textbox md:px-48 md:pb-32 ">
            <div className="en font-black tracking-widest">
                <div className="relative flex gap-1">
                    <div className="text-7xl">D</div>
                    <div className="text-7xl">O</div>
                    <div className="text-7xl">N</div>
                    <div className="text-7xl">A</div>
                    <div className="text-7xl">T</div>
                    <div className="text-7xl">E</div>
                </div>
                <p className="font-Montserrat mt-2 font-normal">Trang từ thiện</p>
            </div>
        </div>
        <div className="lowerlayer bg-mainPink md:h-80">
       
        </div>
        <div className="news_body bg-[#fff] md:w-screen-[85] m-auto md:py-10 md:px-16  relative -top-52">
        <Tabs
          type="card"
          items={items}
        />
        </div>
    </div>
    </div>
  )
}

export default DonatePage