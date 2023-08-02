import { formatDate, formatDateSendDB } from "@/utils/date-format";
import { Button, Col, Divider, Row, Space, Tag } from "antd";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import {SwapLeftOutlined} from '@ant-design/icons';
export interface PostDetailPageProps {
	post: any;
}

const renderContent = (content: string) => {
	// let sliceConent = `${content.slice(0,200)}...`
	return (
		<div
			className="mce-content-body"
			dangerouslySetInnerHTML={{
				__html: content,
			}}
			style={{
				whiteSpace: "pre-wrap",
			}}
		></div>
	);
};


const PostDetailPage = ({ post }: PostDetailPageProps) => {
	const router = useRouter();

    const handleRedirect = () => {
        router.push('/posts')
    }
	// console.log(renderContent(post.content).toString().indexOf('  ') >= 0)

	if (!post) return null;
	return (
		<>
			<div className="pt-[10vw]">
				<div className="title-textbox md:px-48 md:pb-32 ">
					<div className="en font-black tracking-widest">
						<div className="relative flex gap-1">
							<div className="text-7xl">N</div>
							<div className="text-7xl">E</div>
							<div className="text-7xl">W</div>
							<div className="text-7xl">S</div>
						</div>
						<p className="font-Montserrat mt-2 font-normal">
							Trang tin tức
						</p>
					</div>
				</div>
				<div className="lowerlayer bg-mainPink md:h-80"></div>
				<div className="news_body bg-[#fff] md:w-screen-[85] m-auto md:py-16 md:px-36  relative -top-52 text-textBlack rounded-xl">
					<Space align="center" size={20} className="mb-4">
						<p className="!font-Montserrat font-semibold">
							{formatDate(post.createdAt)}
						</p>
						<Tag color="magenta">{post.topic.name}</Tag>
						{post.fund ? (
							<Tag color="red">{post.fund.name}</Tag>
						) : (
							<></>
						)}
					</Space>
					<Row>
						<Col span={24}>
							<p className="text-2xl uppercase font-medium !font-Montserrat">
								{post.title}
							</p>
						</Col>
					</Row>
					<Divider />
					<Image
						src={post.thumbnail_url}
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: "100%", height: "auto" }}
						alt=""
					/>
					<Row style={{
                        justifyContent : 'space-between'
                    }}>
						<Col span={1}
                            className="sticky top-5 pt-10"
                        >
                            <Space
                                direction="vertical"
                            >
                                <FacebookShareButton
                                    url={`${
                                        process.env.NEXT_PUBLIC_API_URL_DEV ||
                                        process.env.NEXT_PUBLIC_API_URL_PRODUCTION
                                    }/news/${post.id}`}
                                    quote={'Dummy text!'}
                                    hashtag="#happy_children"
                                    // className="sticky top-5"
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={`${
                                        process.env.NEXT_PUBLIC_API_URL_DEV ||
                                        process.env.NEXT_PUBLIC_API_URL_PRODUCTION
                                    }/news/${post.id}`}
                                    hashtags={["happy_children"]}
                                    >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <Divider />
                                <Button
                                    onClick={handleRedirect}
                                    className='report-list__table--button__delete'
                                    icon={<SwapLeftOutlined/>}
                                    shape='circle'
                                    style={{
                                        display : "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    // size='default'
                                >    
                                </Button>
                            </Space>
                        </Col>
						<Col span={22}>
							<div className="font-Montserrat mt-8 text-[16px]">
								{renderContent(post.content)}
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL_DEV ||
			process.env.NEXT_PUBLIC_API_URL_PRODUCTION
		}/news`
	);
	const data = await response.json();
	// console.log({data})

	return {
		paths: data.map((post: any) => ({
			params: {
				postId: post.id.toString(),
			},
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (
	context: GetStaticPropsContext
) => {
	const postId = context.params?.postId;
	if (!postId) {
		return {
			notFound: true,
		};
	}

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL_DEV ||
			process.env.NEXT_PUBLIC_API_URL_PRODUCTION
		}/news/${postId}`
	);
	const data = await response.json();
	console.log("\nGet static props", postId);
	return {
		props: {
			post: data,
		},
		revalidate: 5,
	};
};

export default PostDetailPage;
