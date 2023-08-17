import { useCallback, useContext, useEffect, useState } from "react";
import { WarContext } from "../../contexts/War/WarContext";
const lang = { locale: "es-Es" };

export const useSpecie = (type) => {
	const { speciesData, racesData } = useContext(WarContext);

	const [species, setSpecies] = useState([]);
	const [races, setRaces] = useState([]);

	const handleSpecies = useCallback(() => {
		const animals = [];
		for (let i = 0; i < speciesData?.length; i++) {
			animals.push({
				label:
					lang.locale === "es-Es"
						? speciesData[i]["nameSpanish"]
						: speciesData[i]["nameEnglish"],
				value: speciesData[i]["name"],
			});
		}
		return animals;
	}, []);

	const handleRaces = useCallback((type) => {
		const races = [];
		const racesFilter = racesData.filter((race) => race.animal === type);
		try {
			for (let i = 0; i < racesFilter?.length; i++) {
				races.push({
					label:
						lang.locale === "es-Es"
							? racesFilter[i]["nameSpanish"]
							: racesFilter[i]["nameEnglish"],
					value: racesFilter[i]["nameEnglish"],
				});
			}
			return races;
		} catch (error) {
			console.log(error);
			return races;
		}
	}, []);

	useEffect(() => {
		setSpecies(handleSpecies());
	}, [handleSpecies]);

	useEffect(() => {
		setRaces(handleRaces(type));
	}, [type, handleRaces]);

	return {
		species,
		races,
	};
};
