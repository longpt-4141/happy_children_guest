import NormalDonate from '@/components/donate/NormalDonate';
import ItemReceiveTable from '@/components/reports/ItemReceiveTable';
import ReceiveReport from '@/components/reports/ReceiveReport';
import SpendReport from '@/components/reports/SpendReport';
import { Tabs, TabsProps } from 'antd';
import React from 'react'

type Props = {}

const ReportsPage = (props: Props) => {

  const items: TabsProps['items'] = [
    {
        key: '1',
        label: <div className='text-[#EB6446] text-base'>Tiền thu</div>,
        children: <ReceiveReport />,
    },
    {
        key: '2',
        label: <div className='text-[#EB6446] text-base'>Tiền chi</div>,
        children: <SpendReport />, 
    },
    {
      key: '3',
      label: <div className='text-[#EB6446] text-base'>Hiện vật</div>,
      children: <ItemReceiveTable />, 
  },
  ];

  return (
    <div>
          <div className='pt-[10vw]'>
        <div className="title-textbox md:px-48 md:pb-32 ">
            <div className="en font-black tracking-widest">
                <div className="relative flex gap-1">
                    <div className="text-7xl">R</div>
                    <div className="text-7xl">E</div>
                    <div className="text-7xl">P</div>
                    <div className="text-7xl">O</div>
                    <div className="text-7xl">R</div>
                    <div className="text-7xl">T</div>
                </div>
                <p className="font-Montserrat mt-2 font-normal">Trang báo cáo tài chính</p>
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

export default ReportsPage