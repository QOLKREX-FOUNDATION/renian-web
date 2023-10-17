import { lazy, Suspense } from "react";
import { Banner, CardsSection } from "../../";

const AboutSection = lazy(() => import("../../organisms/AboutSection/AboutSection"));

export const MainHomeSection = () => {
  return (
    <>
      <Banner />
      <CardsSection />
      <Suspense fallback={<div>Loading...</div>}>
        <AboutSection />
      </Suspense>
    </>
  );
};
