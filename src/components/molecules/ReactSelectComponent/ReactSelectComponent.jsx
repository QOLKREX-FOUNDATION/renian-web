import { ModalSelect } from "../../atoms/inputs/ModalSelect/ModalSelect";

export const ReactSelectComponent = ({
	name = "",
	property = "",
	required = false,
	options = [],
	value = null,
	values = {},
	message = "Campo requerido",
	watch = {},
	setValue = {},
	error = {},
	isMulti = false,
}) => {
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<ModalSelect
				name={name}
				value={
					value ? value : options.filter((v) => v.value === watch(property))
				}
				options={options}
				onChange={(target) => setValue(property, target.value)}
				isMulti={isMulti}
				required={required}
			/>
			<input
				type="hidden"
				{...values(property, {
					required: {
						value: required,
						message: message,
					},
				})}
			/>
			<div>
				{error[property] && (
					<small style={{ color: "red" }}>{error[property]?.message}</small>
				)}
			</div>
		</div>
	);
};
