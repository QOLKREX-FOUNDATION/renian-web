import classes from "./modal-file.module.scss";

export const ModalFile = ({
	name = "",
	values,
	property,
	watch = {},
	required = false,
	error,
	message = "Campo requerido",
	accept="image/*"
}) => {
	return (
		<>
			<label className={classes.file}>
				<input
					type="file"
					accept={accept}
					{...values(property, {
						required: {
							value: required,
							message: message,
						},
					})}
				/>
				<lord-icon
					src="https://cdn.lordicon.com/qierxeeb.json"
					trigger="hover"
					colors="primary:#3a3347,secondary:#646e78,quaternary:#bf002a,quinary:#bf002a,senary:#ebe6ef"
				></lord-icon>{" "}
				{name}
			</label>

			{typeof watch(property) ==="object" &&  !!watch(property)[0]?.name && (
				<div style={{ color: "green", textAlign: "center" }}>
					<small>{watch(property)[0]?.name} - Imagen Cargada</small>
				</div>
			)}

			{error[property] && (
				<div style={{ color: "red", textAlign: "center" }}>
					<small>{error[property]?.message}</small>
				</div>
			)}
		</>
	);
};
