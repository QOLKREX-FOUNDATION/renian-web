import classes from "./modal-input.module.scss";

export const ModalInput = ({
  name = "",
  type = "text",
  placeholder = "",
  formInput={},
  onBlur={},
  required = false,
}) => {
  return (
    <div className={classes.input}>
      <div>
        <h4>{name}</h4>
        {required && <span>(requerido)</span>}
      </div>
      <input {...formInput} {...onBlur} type={type} placeholder={placeholder} />
    </div>
  );
};
