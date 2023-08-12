import { HomeView, Layout } from "../components";
import { URL_RENIAN_NOTICES } from "../config/constants/endpoints";

export default function Home({ news }) {
	return (
		<Layout
			title="Renian | Registro Nacional de Identidad Animal"
			description="En RENIAN nos encargamos del registro civil dentro de un marco de Políticas Públicas de Protección"
		>
			<HomeView news={news} />
		</Layout>
	);
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async (ctx) => {
	try {
		const content = await fetch(URL_RENIAN_NOTICES);
		const news = await content.json();

		if (!Array.isArray(news)) {
			throw new Error("Fetched data is not an array.");
		}
		return {
			props: {
				news,
			},
			revalidate: 42000, // In seconds
		};
	} catch (error) {
		return {
			props: {
				news: [],
			},
			revalidate: 42000, // In seconds
		};
	}
};
