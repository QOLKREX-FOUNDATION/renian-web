import { PreloaderProvider } from "./contexts/Preloader/PreloaderProvider";
import { WarProvider } from "./contexts/War/WarContext";
import { Web3Provider } from "./contexts/Web3/Web3Provider";

const Providers = ({ children }) => {
	return (
		<WarProvider>
			<Web3Provider>
				<PreloaderProvider>{children}</PreloaderProvider>
			</Web3Provider>
		</WarProvider>
	);
};

export default Providers;
