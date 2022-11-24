import { useEffect, useState } from "react";
import {
	ModalInputComponent,
	ReactSelectComponent,
	ModalFile,
	ModalCheckbox,
} from "../../../";
import { useCountry, usePerson, useType } from "../../../../hook/inputs/";
import { useDocuments } from "../../../../hook/inputs/useDocuments";
import { useUbigeo } from "../../../../hook/useUbigeo";
import classes from "./registry-modal.module.scss";

export const AdopterRegister = ({
	adopterValues,
	watchAdopter,
	setAdopter,
	errorsAdopter,
}) => {
	const { countries } = useCountry();
	const { persons } = usePerson();
	const { types } = useType();
	const { documents, handleDocuments } = useDocuments();

	const [haveAddress, setHaveAddress] = useState();
	const [shareInformation, setShareInformation] = useState();

	const {
		departments,
		provinces,
		districts,
		handleDepartaments,
		handleProvinces,
		handleDistricts,
	} = useUbigeo();

	useEffect(() => {
		if (watchAdopter("country") == "")
			setAdopter("country", localStorage.getItem("countryCode") ?? "PE");
	}, [countries]);

	useEffect(() => {
		handleDepartaments();
	}, []);

	useEffect(() => {
		handleProvinces(watchAdopter("department"));
	}, [watchAdopter("department")]);

	useEffect(() => {
		handleDistricts(watchAdopter("province"));
	}, [watchAdopter("province")]);

	useEffect(() => {
		handleDocuments(
			setAdopter,
			watchAdopter("country"),
			watchAdopter("person")
		);
	}, [watchAdopter("country")]);
	
	
	return (
		<>
			<div
				className={`${classes.modal__contentMainFormSection} ${classes.modal__contentMainFormIdentification}`}
			>
				<h3>identificación</h3>
				<div>
					<ReactSelectComponent
						name="pais"
						property="country"
						options={countries}
						values={adopterValues}
						watch={watchAdopter}
						setValue={setAdopter}
						error={errorsAdopter}
						required
					/>

					<ReactSelectComponent
						name="tipo persona"
						property="person"
						options={persons}
						values={adopterValues}
						watch={watchAdopter}
						setValue={setAdopter}
						error={errorsAdopter}
						required
					/>

					<ReactSelectComponent
						name="tipo documento"
						property="document"
						options={documents}
						values={adopterValues}
						watch={watchAdopter}
						setValue={setAdopter}
						error={errorsAdopter}
						required
					/>

					<ModalInputComponent
						name="numero documento"
						type="number"
						property="documentNumber"
						values={adopterValues}
						error={errorsAdopter}
						required
					/>

					<ReactSelectComponent
						name="tipo adoptante"
						property="type"
						options={types}
						values={adopterValues}
						watch={watchAdopter}
						setValue={setAdopter}
						error={errorsAdopter}
						required
					/>
				</div>
			</div>
			<div
				className={`${classes.modal__contentMainFormReveal} ${classes.modal__contentMainFormAddress}`}
			>
				<div>
					<ModalCheckbox
						onClick={() => setHaveAddress(!haveAddress)}
						show={haveAddress}
					/>
					<p>¿Tienes una dirección pública de Ethereum?</p>
				</div>
				{haveAddress && (
					<div>
						<ModalInputComponent
							name="Dirección Pública Etherium (Public Address)"
							property="address"
							values={adopterValues}
							error={errorsAdopter}
							required={haveAddress}
						/>
					</div>
				)}
			</div>
			<div
				className={`${classes.modal__contentMainFormSection} ${classes.modal__contentMainFormPersonal}`}
			>
				<h3>información personal</h3>
				<div>
					<ModalInputComponent
						name="nombre"
						property="name"
						values={adopterValues}
						error={errorsAdopter}
						required
					/>

					<ModalInputComponent
						name="segundo nombre"
						property="secondName"
						values={adopterValues}
						error={errorsAdopter}
					/>

					<ModalInputComponent
						name="apellido"
						property="lastName"
						values={adopterValues}
						error={errorsAdopter}
						required
					/>

					<ModalInputComponent
						name="segundo apellido"
						property="mLastName"
						values={adopterValues}
						error={errorsAdopter}
					/>

					<ModalInputComponent
						name="cumpleaños"
						type="date"
						property="date"
						values={adopterValues}
						error={errorsAdopter}
						required
					/>

					<ReactSelectComponent
						name="Sexo"
						property="gender"
						options={[
							{ label: "HOMBRE", value: "MAN" },
							{ label: "MUJER", value: "WOMAN" },
						]}
						values={adopterValues}
						watch={watchAdopter}
						setValue={setAdopter}
						error={errorsAdopter}
						required
					/>

					<ModalInputComponent
						name="celular"
						property="phone"
						values={adopterValues}
						error={errorsAdopter}
						required
					/>

					<ModalInputComponent
						name="email"
						property="email"
						type="email"
						values={adopterValues}
						error={errorsAdopter}
						required
					/>
				</div>
			</div>
			<div
				className={`${classes.modal__contentMainFormSection} ${classes.modal__contentMainFormUbigeo}`}
			>
				<h3>ubigeo</h3>
				<div>
					{watchAdopter("country") === "PE" && (
						<>
							<ReactSelectComponent
								name="departamento"
								property="department"
								options={departments}
								values={adopterValues}
								watch={watchAdopter}
								setValue={setAdopter}
								error={errorsAdopter}
								required
							/>
							<ReactSelectComponent
								name="provincia"
								property="province"
								options={provinces}
								values={adopterValues}
								watch={watchAdopter}
								setValue={setAdopter}
								error={errorsAdopter}
								required
							/>
							<ReactSelectComponent
								name="distrito"
								property="district"
								options={districts}
								values={adopterValues}
								watch={watchAdopter}
								setValue={setAdopter}
								error={errorsAdopter}
								required
							/>
						</>
					)}
					<ModalInputComponent
						name="dirección"
						property="direction"
						values={adopterValues}
						error={errorsAdopter}
						required
					/>
				</div>
			</div>
			<div className={classes.modal__contentMainFormAgree}>
				<div>
					<ModalCheckbox
						onClick={() => {
							setShareInformation(!shareInformation);
							setAdopter("status", !shareInformation);
						}}
						show={shareInformation}
					/>
					<p>
						Acepto compartir mi información personal en búsquedas en la
						plataforma
					</p>
				</div>
			</div>
			<div
				className={`${classes.modal__contentMainFormSection} ${classes.modal__contentMainFormDocument}`}
			>
				<h4>
					Ingresar ajunto del documento de identidad que ingreso anteriormente:
				</h4>
				<div style={{marginBottom:"4rem"}}>
					<div>
						<h5>documento de identidad (Front):</h5>
						<div>
							<ModalFile
								name="frontal"
								values={adopterValues}
								watch={watchAdopter}
								property="frontal"
								error={errorsAdopter}
								required
							/>
						</div>
					</div>
					<div>
						<h5>documento de identidad (Reverso):</h5>
						<div>
							<ModalFile
								name="reverso"
								values={adopterValues}
								watch={watchAdopter}
								property="reverso"
								error={errorsAdopter}
								required
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
