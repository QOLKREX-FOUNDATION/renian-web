import { NextSeo } from "next-seo";
import Head from "next/head";
import Script from "next/script";

export const Layout = ({ children, title, description, url = "" }) => {
	return (
		<>
			<Head>
				<link rel="icon" href="/renian.ico" />
				<meta name="author" content="Qolkrex Foundation" />
				<noscript><img height="1" width="1" style={{ display: "none" }}
					src="https://www.facebook.com/tr?id=851043643312153&ev=PageView&noscript=1"
				/></noscript>

			</Head>
			<NextSeo
				title={title}
				description={description}
				canonical={`https://renian.pe/${ url }`}
				openGraph={{
					url: `https://renian.pe/${ url }`,
					title: title,
					description: description,
					images: [
						{
							url: "https://renian.pe/img/slides/slide_bg01.webp",
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
			<Script strategy="lazyOnload" async src="https://www.googletagmanager.com/gtag/js?id=G-7TLP5K551Y" />
			<Script
				id="my-script"
				strategy="lazyOnload"
				dangerouslySetInnerHTML={{
					__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
              gtag('config', 'G-7TLP5K551Y');
            `,
				}}
			/>
			<Script
				strategy="lazyOnload"
				src="https://cdn.lordicon.com/xdjxvujz.js"
			/>
			<Script
				id="google-analytics"
				strategy="lazyOnload"
				dangerouslySetInnerHTML={{
					__html: `
					!function(f,b,e,v,n,t,s)
					{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					n.callMethod.apply(n,arguments):n.queue.push(arguments)};
					if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
					n.queue=[];t=b.createElement(e);t.async=!0;
					t.src=v;s=b.getElementsByTagName(e)[0];
					s.parentNode.insertBefore(t,s)}(window, document,'script',
					'https://connect.facebook.net/en_US/fbevents.js');
					fbq('init', '851043643312153');
					fbq('track', 'PageView');
			`,
				}}
			/>
		</>
	);
};
