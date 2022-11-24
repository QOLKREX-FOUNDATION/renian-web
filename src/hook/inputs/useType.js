import { useEffect, useMemo, useState } from "react";
import typeJson from "../../../public/json/data/selects/type.json";

const lang = { locale: "es-Es" };

export const useType = () => {
	const [types, setTypes] = useState([]);

	const handleTypes = useMemo(() => {
		const temp = [];
		for (let i = 0; i < typeJson.type.length; i++) {
			temp.push({
				label: typeJson.type[i][lang.locale],
				value: typeJson.type[i].value,
			});
		}

		return temp;
	}, [lang.locale]);

	useEffect(() => {
		setTypes(handleTypes);
	}, [lang.locale, handleTypes]);

	return {
		types,
	};
};
