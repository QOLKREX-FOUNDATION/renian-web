import { CardsButton, Consult, Layout } from "../../components";

export default function ConsultMain() {
	return (
		<Layout
			title="Renian | Consulta de Mascota"
			description="Consulta la información de tu mascota en nuestro sistema"
			url="consulta"
		>
			<Consult />
		</Layout>
	);
}
