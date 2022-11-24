import { ModalButton } from "../../../atoms/buttons/ModalButton/ModalButton";
import classes from "./registry-modal.module.scss";

export const Buttons = ({
	nextSection,
	setNextSection,
	setOpenRegistryModal,
}) => {
	return (
		<div className={classes.modal__contentMainButtons}>
			<div>
				<ModalButton
					name="cancelar"
					background="#cccccc"
					onClick={() => setOpenRegistryModal(false)}
				/>
				<ModalButton
					name="atras"
					disabled={nextSection ? false : true}
					onClick={nextSection ? () => setNextSection(false) : () => false}
				/>
				<ModalButton
					type="submit"
					name={nextSection ? "enviar" : "siguiente"}
				/>
			</div>
		</div>
	);
};
