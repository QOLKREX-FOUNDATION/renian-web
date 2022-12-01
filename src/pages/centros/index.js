import { CentersView } from "../../components";

export default function CentersMain({ centers }) {
	return <CentersView centers={centers} />;
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async () => {
	const content = await fetch("https://admin.renian.pe/api/centers");
	const centers = await content.json();

	return {
		props: { centers },
	};
};
