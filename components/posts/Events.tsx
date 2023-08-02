import React from 'react'
import { formatDateSendDB, formatRequestCreate } from '@/utils/date-format'
import { Card, Col, List, Row, Tag } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
type Props = {
    eventPosts: any[],

}

export const TAG_COLOR = [
    "magenta", "purple", "red" ,"geekblue", "volcano", "green", "orange", "gold" ,"lime",  "cyan", "blue", 
];

const {Meta} = Card

const renderContent = (content: string) => {
    // let sliceConent = `${content.slice(0,200)}...`
    return (
      <div 
          className="mce-content-body"
          dangerouslySetInnerHTML={{
          __html: content,
          }}
      >

      </div>
    )
  }


const Events = ({eventPosts}: Props) => {
  return (
    <div className='font-Montserrat'>
        <h1 className='font-medium uppercase relative text-2xl md:mb-12'>
            <p className='relative z-20'>Tin tức sự kiện</p>
            <div className='bg-[#FFD4B8] w-52 h-3 absolute z-0 top-4'></div>
        </h1>
        {
            eventPosts? 
            <Link href={`/posts/${eventPosts[0]?.id}`} >

                <div className='flex justify-between h-[325px]'>
                    <div className="description">
                        <div className='flex gap-5'>
                            <p>{formatDateSendDB(eventPosts[0].updatedAt)}</p>
                            <p>-</p>
                            <p>{eventPosts[0].read_minute} phút đọc</p>
                        </div>
                        <div className='text-3xl font-medium mt-3'>
                            {eventPosts[0].title}
                        </div>
                        <div className='w-[500px] line-clamp-6 mt-6 leading-loose'>
                            {renderContent(eventPosts[0].content)}
                        </div>
                    </div>
                    <div className="image">
                        <Image src={eventPosts[0].thumbnail_url} alt='thumbnail' width={600} height={400}></Image>
                    </div>
                </div>
            </Link>
            :
            null
        }
        <List
            className='mt-16'
            grid={{
                gutter: 48,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 4,
            }}
            dataSource={eventPosts.slice(1)}
            renderItem={(item, index) => (
                <List.Item
                className='list-article__item'
                key={item.id}

                >
                    <Link href={`/posts/${item?.id}`}>

                <Card
                    bordered={false}
                    className='list-article__item-card'
                    bodyStyle={{
                        backgroundColor: '#FCF1DD',
                        border: 'none'
                    }}
                // style={{
                //   height : 300,
                // }}
                cover={
                    <Image src={item?.thumbnail_url} alt='thumbnail' width={250} height={200}></Image>
                }
                // actions={[
                //   <EyeOutlined key="detail" 
                //     onClick={() => {
                //       navigate(`${item.id}`)
                //     }}
                //   />,
                //   <EditOutlined key="edit" onClick={() => {
                //     navigate(`${item.id}/edit`)
                //   }}/>,
                //   <DeleteOutlined 
                //     key="ellipsis" 
                //     onClick={() => showDeleteModal(item)} 
                //     />,
                // ]}
                >
                    <Meta
                    className='line-clamp-4'
                    title= {item.title}
                    description= {<div className='line-clamp-4'>{renderContent(item.content)}</div>}
                    />
                    <div className="tag_information">
                    <Row className='mt-4 mb-4'>
                        <Col span={10}>
                        <Tag color={TAG_COLOR[index]}>
                            {item.topic.name}
                        </Tag>
                        </Col>
                        <Col span={10}>
                        <Tag color={TAG_COLOR[index+1]}>
                            {item.fund ? item.fund.name : null}
                        </Tag>
                        </Col>
                    </Row>
                    </div>
                    <div className="time_information">
                    <Row>
                        <Col span={10}>
                        {item.read_minute} phút đọc
                        </Col>
                        <Col span={10}>
                        {formatRequestCreate(item.createdAt)}
                        </Col>
                    </Row>
                    </div>
                </Card>
                </Link>
                </List.Item>
            )}
        />
    </div>
  )
}

export default Events