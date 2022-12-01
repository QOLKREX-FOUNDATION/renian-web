import { HomeView } from "../components";
import { URL_RENIAN_NOTICES } from "../config/constants/endpoints";

export default function Home({ news }) {
	return <HomeView news={news} />;
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async (ctx) => {
	const content = await fetch(URL_RENIAN_NOTICES);
	const news = await content.json();

	return {
		props: {
			news,
		},
		revalidate: 42000, // In seconds
	};
};
