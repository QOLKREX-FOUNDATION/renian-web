import "../styles/main.scss";
import Providers from "../Providers";
import { Index } from "../Index";


function MyApp({ Component, pageProps }) {
	return (
		<Providers>
			<Index>
				<Component {...pageProps} />
			</Index>
		</Providers>
	);
}

export default MyApp;
