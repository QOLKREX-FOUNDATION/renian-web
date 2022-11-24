import { useContext } from "react";
import { useState } from "react";
import { PreloaderContext } from "../../contexts/Preloader/PreloaderContext";
import { getRecordPet } from "../../utils/war/pets";
import { formatDataPet } from "./formatDataPet";

export const useChip = () => {
	const { handlePreloader } = useContext(PreloaderContext);
	const [banderaPet, setBanderaPet] = useState(false);

	const handleChip = (chip, token) => {
		handlePreloader(true);
		getRecordPet(`chip=${chip}`, token)
			.then((r) => {
				r.pet ? setBanderaPet(true) : setBanderaPet(false);
				handlePreloader(false);
			})
			.catch((e) => {
				setBanderaPet(false);
				handlePreloader(false);
			});
	};

	const getSearch = (chip = "", token = "", setPet) => {
		handlePreloader(true);
		getRecordPet(`chip=${chip}`, token)
			.then((resolve) => {
				resolve.pet = formatDataPet(resolve.pet);
				setPet(resolve.pet);
				setBanderaPet(true);
				handlePreloader(false);
			})
			.catch((e) => {
				console.log(e);
				setPet({
					...petInit,
					chip: value != "" ? value : petValues.chip,
				});
				setBanderaPet(false);
				handlePreloader(false);
			});
	};

	return {
		banderaPet,
		getSearch,
		handleChip,
	};
};
