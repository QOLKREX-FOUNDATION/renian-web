import { ModalInput } from "../../atoms/inputs/Modalnput/ModalInput";

export const ModalInputComponent = ({
	name = "",
	property = "",
	type = "text",
	required = false,
	values = {},
	message = "Campo requerido",
	error = {},
}) => {
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
				required={required}
			/>

			{error[property] && (
				<small style={{ color: "red" }}>{error[property]?.message}</small>
			)}
		</div>
	);
};
