import "../styles/main.scss";
import Providers from "../Providers";
import { Index } from "../Index";
// var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

// mapboxgl.accessToken =
//   "pk.eyJ1IjoibXBlYXJkZXYiLCJhIjoiY2xhMmVkb3ZyMDVmODNwcGRhNnhoMnB2cCJ9.3yyrc4ZcaN1XAIHPWGa0XQ";

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
