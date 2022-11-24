import {
  MainHomeSection,
  Functionality,
  OurMission,
  Advantage,
  News,
  Contact,
  Back,
} from "..";

export const HomeView = ({news}) => {
  return (
    <>
      <MainHomeSection />
      <Functionality />
      <OurMission />
      <Advantage />
      <Back />
      <News news={news} />
      <Contact />
    </>
  );
};
