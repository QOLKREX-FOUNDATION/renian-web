import { CentersView, Layout } from "../../components";

export default function CentersMain({ centers }) {
  return (
    <Layout
      title="Renian | Centros Afiliados"
      description="Consulta nuestros centros de atención y afiliados, para que atendamos tu mascota"
      url="centros"
    >
      <CentersView centers={centers} />
    </Layout>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async () => {
  const content = await fetch("https://admin.renian.pe/api/centers");
  console.log({ content });
  const centers = await content.json();

  return {
    props: { centers },
  };
};
