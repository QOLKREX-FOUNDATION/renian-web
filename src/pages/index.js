import { HomeView } from "../components";
import { URL_RENIAN_NOTICES } from "../config/constants/endpoints";

export default function Home({news}) {
  return <HomeView news={news} />;
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  const content = await fetch(URL_RENIAN_NOTICES);
  const news = await content.json();

  return {
    props: {
      news
    }
  }
}
