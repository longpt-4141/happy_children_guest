import React from 'react'
import {Carousel} from 'antd';
import Vision1 from '../../public/img/bg/vision1.svg'
import Vision2 from '../../public/img/bg/vision2.svg'
import Vision3 from '../../public/img/bg/vision3.svg'

type Props = {}

const contentStyle: React.CSSProperties = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#FEE8C2',
    borderRadius: '10px'
  };

const VisionCarosel = (props: Props) => {
  return (
    <Carousel autoplay>
        <div className="!flex w-full !h-[460px] justify-evenly bg-[#F89A85] items-center">
            <div className="text-white font-Montserrat">
                <h3 className="font-medium text-xl mb-3">Học tập</h3>
                <div>
                    Với số tiền ủng hộ, quỹ sẽ thúc đẩy <br/> và hỗ trợ để giúp các em được học tập đầy đủ <br/>
                    Có đủ hành trang để giúp các em có nhiều cơ hội hơn <br/>
                    trong tương lai, có thể là đại hoc, cao đẳng hoặc học nghề
                </div>
            </div>
            <div className="">
                <Vision1 width={300} height={300} />
            </div>
        </div>
        <div className="!flex w-full !h-[460px] justify-evenly bg-[#FBC142] items-center">
            <div className="">
                <Vision2 width={300} height={300} />
            </div>
            <div className="text-white font-Montserrat">
                <h3 className="font-medium text-xl mb-3">Học tập</h3>
                <div>
                    Với số tiền ủng hộ, quỹ sẽ thúc đẩy <br/> và hỗ trợ để giúp các em được học tập đầy đủ <br/>
                    Có đủ hành trang để giúp các em có nhiều cơ hội hơn <br/>
                    trong tương lai, có thể là đại hoc, cao đẳng hoặc học nghề
                </div>
            </div>
        </div>
        <div className="!flex w-full !h-[460px] justify-evenly bg-[#2E9E9D] items-center">
        <div className="text-white font-Montserrat">
                <h3 className="font-medium text-xl mb-3">Học tập</h3>
                <div>
                    Với số tiền ủng hộ, quỹ sẽ thúc đẩy <br/> và hỗ trợ để giúp các em được học tập đầy đủ <br/>
                    Có đủ hành trang để giúp các em có nhiều cơ hội hơn <br/>
                    trong tương lai, có thể là đại hoc, cao đẳng hoặc học nghề
                </div>
            </div>
            <div className="">
                <Vision3 width={300} height={300} />
            </div>
        </div>
  </Carousel>
  )
}

export default VisionCarosel
