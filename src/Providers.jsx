import { PreloaderProvider } from "./contexts/Preloader/PreloaderProvider";
import { Web3Provider } from "./contexts/Web3/Web3Provider";

const Providers = ({ children }) => {
	return (
		<Web3Provider>
			<PreloaderProvider>{children}</PreloaderProvider>
		</Web3Provider>
	);
};

export default Providers;
