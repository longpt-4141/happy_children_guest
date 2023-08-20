import Head from "next/head";
import React from "react";

type Props = {};

export interface SeoData {
	title: string;
	description: string;
	url: string;
	thumbnail_url: string;
}

export interface SeoProps {
	data: SeoData;
}
//"Happy Children"

// Nhiệm vụ của chúng tôi là gửi số tiền quyên góp
// đến với những trung tâm đang cần sự trợ giúp và
// báo cáo tài chính một cách mình bạch



const Seo = ({ data }: SeoProps) => {
	const { title, description, url, thumbnail_url } = data;
	return (
		<Head>
			{/* <!-- Primary Meta Tags --> */}
			<title>Happy Children</title>
			<meta name="title" content={title} />
			<meta
				name="description"
				content={description}
			/>

			{/* <!-- Open Graph / Facebook --> */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta
				property="og:description"
				content={description}
			/>
			<meta
				property="og:image"
				content={thumbnail_url}
			/>

			{/* <!-- Twitter --> */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={url} />
			<meta property="twitter:title" content={title} />
			<meta
				property="twitter:description"
				content={description}
			/>
			<meta
				property="twitter:image"
				content={thumbnail_url}
			/>

			{/* <!-- Meta Tags Generated with https://metatags.io --> */}
		</Head>
	);
};

export default Seo;
