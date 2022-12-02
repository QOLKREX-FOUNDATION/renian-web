import { FaqView, Layout } from "../../components";

export default function FaqMain() {
	return (
		<Layout
			title="Renian | Preguntas Frecuentes"
			description="Preguntas Frecuentes sobre Renian, Es un sistema electrónico que permite la identificación de por vida de la mascota."
			url="preguntas-frecuentes"
		>
			<FaqView />
		</Layout>
	);
}
