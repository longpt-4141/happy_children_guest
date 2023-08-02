import FundDonate from '@/components/donate/FundDonate';
import ItemDonate from '@/components/donate/ItemDonate';
import NormalDonate from '@/components/donate/NormalDonate';
import { Tabs, TabsProps } from 'antd';
import React from 'react'

type Props = {}

const DonatePage = (props: Props) => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <div className='text-textBlack '>Quỹ chung</div>,
      children: <NormalDonate />,
    },
    {
      key: '2',
      label: <div className='text-textBlack '>Quyên góp sự kiện</div>,
      children: <FundDonate />, 
    },
    {
      key: '3',
      label: <div className='text-textBlack '>Từ thiện hiện vật</div>,
      children: <ItemDonate />, 
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
        <div className="donate_body bg-[#fff] md:w-screen-[85] m-auto md:py-10 md:px-16  relative -top-52">
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