import { useEffect, useState } from "react";

export const ErrorMessage = ({ bandera=false, value, name, setValue, text = "", property }) => {
	const [error, setError] = useState("");
	

	useEffect(() => {
		bandera && setError(value);
	}, [bandera]);

	useEffect(() => {
		if(bandera){
			setValue(property , "");
		} 
	}, [bandera]);

	return (
		<small className="text-red-400 text-xs">
			{bandera && `${error} - ${text}`}
		</small>
	);
};
