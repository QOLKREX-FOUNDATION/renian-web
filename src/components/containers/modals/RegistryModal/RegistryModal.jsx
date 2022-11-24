import { useState } from "react";
import { useForm } from "react-hook-form";
import Fade from "react-reveal/Fade";
import { adopterInit, petInit } from "../../../../utils/initRegister";
import { BannerRegister } from "../../../";
import { AdopterRegister } from "./AdopterRegister";
import { PetRegister } from "./PetRegister";
import classes from "./registry-modal.module.scss";
import { Buttons } from "./Buttons";
import { mailApi } from "../../../../../api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { PreloaderContext } from "../../../../contexts/Preloader/PreloaderContext";

export const RegistryModal = ({ setOpenRegistryModal, width = "80rem" }) => {
	// const [isRegister, setIsRegister] = useState();
	const { handlePreloader } = useContext(PreloaderContext);
	const [nextSection, setNextSection] = useState(false);

	const {
		register: adopterValues,
		handleSubmit: handleAdopter,
		watch: watchAdopter,
		setValue: setAdopter,
		formState: { errors: errorsAdopter },
		getValues: getAdopter,
		reset: adopterReset,
	} = useForm({
		defaultValues: adopterInit,
	});

	const {
		register: petValues,
		handleSubmit: handlePet,
		watch: watchPet,
		setValue: setPet,
		formState: { errors: errorsPet },
		getValues: getPet,
		reset: petReset,
	} = useForm({
		defaultValues: petInit,
	});

	const onSubmit = () => {
		handlePreloader(true);
		const adopter = getAdopter();
		const pet = getPet();
		const form = new FormData();

		form.append("adopter", JSON.stringify(adopter));
		form.append("pet", JSON.stringify(pet));
		form.append("frontal", adopter.frontal[0]);
		form.append("reverso", adopter.reverso[0]);
		form.append("image", pet.image[0]);

		mailApi
			.post("/", form)
			.then(({data}) => {
				if (data.ok) {
					toast.success("Enviado Correctamente, Te avisaremos por interno", {
						theme: "colored",
					});
					setOpenRegistryModal(false);
				} else {
					toast.error("No se pudo enviar correctamente, intento de nuevo", {
						theme: "colored",
					});
				}
				handlePreloader(false);
			})
			.catch((e) => {
				toast.error("No se pudo enviar correctamente, intento de nuevo", {
					theme: "colored",
				});
				handlePreloader(false);
			});
	};

	return (
		<>
			<div className={classes.modal}>
				<div className={classes.modal__container}>
					<Fade>
						<div className={classes.modal__diplayFlex}>
							<div
								className={classes.modal__background}
								onClick={() => setOpenRegistryModal(false)}
							></div>
							<div className={classes.modal__content} style={{ width }}>
								<BannerRegister classes={classes} />

								<div className={classes.modal__contentMain}>
									<div className={classes.modal__contentMainStepper}>
										<div>
											<span></span>
											<div>
												<div
													style={{
														background: nextSection ? "#fff" : "#bf002a",
														color: nextSection ? "#bababa" : "#fff",
														border: nextSection ? "1px solid #bababa" : "0",
													}}
												>
													1
												</div>
												<div
													style={{
														background: nextSection ? "#bf002a" : "#fff",
														color: nextSection ? "#fff" : "#bababa",
														border: nextSection ? "0" : "1px solid #bababa",
													}}
												>
													2
												</div>
											</div>
										</div>
									</div>

									{!nextSection && (
										<form onSubmit={handleAdopter(() => setNextSection(true))}>
											<div className={classes.modal__contentMainForm}>
												<AdopterRegister
													adopterValues={adopterValues}
													watchAdopter={watchAdopter}
													setAdopter={setAdopter}
													errorsAdopter={errorsAdopter}
												/>
											</div>
											<Buttons
												nextSection={nextSection}
												handleAdopter={handleAdopter}
												setNextSection={setNextSection}
												setOpenRegistryModal={setOpenRegistryModal}
											/>
										</form>
									)}

									{nextSection && (
										<form
											className={classes.modal__contentMainForm}
											onSubmit={handlePet(onSubmit)}
										>
											<PetRegister
												petValues={petValues}
												watchPet={watchPet}
												setPet={setPet}
												errorsPet={errorsPet}
											/>
											<Buttons
												nextSection={nextSection}
												handlePet={handlePet}
												setNextSection={setNextSection}
												setOpenRegistryModal={setOpenRegistryModal}
											/>
										</form>
									)}
								</div>
							</div>
						</div>
					</Fade>
				</div>
			</div>
		</>
		// </div>
	);
};
