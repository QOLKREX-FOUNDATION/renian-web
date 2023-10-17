import { FormRenianProvider } from "./contexts/FormRenian";
import { PreloaderProvider } from "./contexts/Preloader/PreloaderProvider";
import { WarProvider } from "./contexts/War/WarContext";
import { Web3Provider } from "./contexts/Web3/Web3Provider";

const Providers = ({ children }) => {
	return (
		<FormRenianProvider>
			<WarProvider>
				<Web3Provider>
					<PreloaderProvider>{children}</PreloaderProvider>
				</Web3Provider>
			</WarProvider>
		</FormRenianProvider>
	);
};

export default Providers;
