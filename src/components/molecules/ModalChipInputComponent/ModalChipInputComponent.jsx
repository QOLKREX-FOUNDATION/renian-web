import { useContext, useEffect } from "react";
import { Web3Context } from "../../../contexts/Web3/Web3Context";
import { useChip } from "../../../hook/inputs";
import { ErrorMessage } from "../../atoms/ErrorMessage/ErrorMessage";
import { ModalInput } from "../../atoms/inputs/Modalnput/ModalInput";

export const ModalChipInputComponent = ({
	name = "",
	property = "",
	type = "text",
	required = false,
	values = {},
	message = "Campo requerido",
	error = {},
	watchPet = {},
	setPet = {},
	update = false,
}) => {
	const { web3 } = useContext(Web3Context);
	const { banderaPet, getSearch, handleChip } = useChip();
	const handleSearch = () => {
		if (update) {
			// getSearch(watchPet(property), web3.authToken, petReset);
			handleChip(watchPet(property), web3.authToken);
		} else {
			handleChip(watchPet(property), web3.authToken);
		}
	};

	const onKeyup = (e) => {
		e.preventDefault();
		if (e.keyCode === 13 && update) {
			getSearch(watchPet(property), web3.authToken, petReset);
		}
	};

	const setSearch = (valueScan) => setPet(property, valueScan);

	// const getSearchScan = (valueScan) => getSearch(valueScan,  web3.authToken, petReset);

	useEffect(() => {
		!update && watchPet(property) != "" && handleSearch();
	}, []);

	return (
		<div>
			<ModalInput
				name={name}
				type={type}
				formInput={{
					...values(property, {
						required: {
							value: required,
							message: message,
						},
					}),
				}}
				onBlur={{ onBlur: handleSearch }}
				required={required}
			/>

			<ErrorMessage
				bandera={ update ? !banderaPet: banderaPet}
				value={watchPet(property)}
				name={name}
				setValue={setPet}
				property={property}
				text={
					update
						? `${name} no esta registrado`
						: `${name} pertenece a otro animal`
				}
			/>

			{error[property] && (
				<small style={{ color: "red" }}>{error[property]?.message}</small>
			)}
		</div>
	);
};
