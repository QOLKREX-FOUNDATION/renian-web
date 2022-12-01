import { ModalSelect } from "../../atoms/inputs/ModalSelect/ModalSelect";

export const ReactSelectComponent = ({
	name = "",
	property = "",
	required = false,
	options = [],
	values = {},
	message = "Campo requerido",
	watch = {},
	value =  options.filter((v) => v.value === watch(property)),
	setValue = {},
	error = {},
	onChange = (target) => setValue(property, target.value),
	isMulti = false,
}) => {
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<ModalSelect
				name={name}
				value={value}
				options={options}
				onChange={onChange}
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
