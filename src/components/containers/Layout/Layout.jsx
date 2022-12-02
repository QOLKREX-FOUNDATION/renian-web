import { NextSeo } from "next-seo";
import Head from "next/head";
import Script from "next/script";

export const Layout = ({ children, title, description, url = "" }) => {
	return (
		<>
			<Head>
				<link rel="icon" href="/renian.ico" />
				<meta author="Qolkrex Foundation/" />
			</Head>
			<NextSeo
				title={title}
				description={description}
				canonical={`https://renian.pe/${url}`}
				openGraph={{
					url: `https://renian.pe/${url}`,
					title: title,
					description: description,
					images: [
						{
							url: "https://renian.pe/img/slides/slide_bg01.jpg",
							width: 800,
							height: 600,
							alt: "Renian",
							type: "image/jpeg",
						},
					],
					siteName: "RENIAN",
				}}
			/>
			<main>{children}</main>
			<Script src="https://cdn.lordicon.com/xdjxvujz.js" />
		</>
	);
};
