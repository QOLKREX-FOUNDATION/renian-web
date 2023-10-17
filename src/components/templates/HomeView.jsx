import { lazy, Suspense } from "react";
import {
	MainHomeSection,
	// Functionality,
	// OurMission,
	// Advantage,
	// News,
	Contact,
	Back,
} from "..";

const Functionality = lazy(() => import("../../components/organisms/Functionality/Functionality"));

const OurMission = lazy(() => import("../../components/organisms/OurMission/OurMission"));

const Advantage = lazy(() => import("../../components/organisms/Advantage/Advantage"));

const News = lazy(() => import("../../components/organisms/News/News"));

export const HomeView = ({ news }) => {
	return (
		<>
			<MainHomeSection />
			<Suspense fallback={<div>Loading...</div>}>
				<Functionality />
			</Suspense>
			<Suspense fallback={<div>Loading...</div>}>
				<OurMission />
			</Suspense>
			<Suspense fallback={<div>Loading...</div>}>
				<Advantage />
			</Suspense>
			<Back />
			<Suspense fallback={<div>Loading...</div>}>
				<News news={news} />
			</Suspense>
			<Contact />
		</>
	);
};
