import Image from "next/image";
import { useEffect } from "react";
import classes from "./data-content.module.scss";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { usePetState } from "../../../../hook/consult/usePetState";
import { statusColor, statusSelect, sterilizedSelect } from "../status";
import { useColours, useCountry, useSpecie } from "../../../../hook/inputs";
import { formatDate, stringToDate } from "../../../../utils/date";
import { Vaccines } from "./Vaccines/Vaccines";
import { useState } from "react";
import { DefaultButton } from "../../../atoms/buttons/DefaultButton/DefaultButton";
import { URL_RENIAN } from "../../../../config/constants/endpoints";

const marcas = {
	1: "virbac",
	2: "vencomax",
	3: "zoetis",
	4: "nobivac",
};

export const ContentMongoPet = ({ dataPet }) => {
	const { obtainPetState, petState, colorState } = usePetState(dataPet);
	const { races } = useSpecie(dataPet.pet?.type);
	const { countries } = useCountry();
	const { colours } = useColours();
	const [openVaccines, setOpenVaccines] = useState(false);
	const [vaccines, setVaccines] = useState([]);

	useEffect(() => {
		obtainPetState();
	}, [petState]);

	useEffect(() => {
		if (dataPet.type === "RENIAN") {
			const temp = [];
			const marca = "";
			dataPet?.vaccines.map((vaccine) => {
				const illness = [];
				if (vaccine.parvovirus > 0) {
					// illness.push(marcas[vaccine.parvovirus]);
					illness.push("Parvovirus")
				}
				if (vaccine.distemper > 0) {
					// illness.push(marcas[vaccine.distemper]);
					illness.push("Distemper")
				}
				if (vaccine.hepatitis > 0) {
					// illness.push(marcas[vaccine.hepatitis]);
					illness.push("Hepatitis")
				}
				if (vaccine.leptospira > 0) {
					// illness.push(marcas[vaccine.leptospira]);
					illness.push("Leptospira")
				}
				if (vaccine.parainfluenza > 0) {
					// illness.push(marcas[vaccine.parainfluenza]);
					illness.push("Parainfluenza")
				}
				if (vaccine.rabia > 0) {
					// illness.push(marcas[vaccine.rabia]);
					illness.push("Rabia")
				}
				if (vaccine.rinotraqueitis > 0) {
					// illness.push(marcas[vaccine.rinotraqueitis]);
					illness.push("Rinotraqueitis")
				}
				if (vaccine.panleucopenia > 0) {
					// illness.push(marcas[vaccine.panleucopenia]);
					illness.push("Panleucopenia")
				}
				if (vaccine.calicivirus > 0) {
					// illness.push(marcas[vaccine.calicivirus]);
					illness.push("Calicivirus")
				}
				temp.push({
					type: vaccine.tipo_visita === "vacuna" ? "VACCINES" : "DEWORMING",
					product: vaccine.clase_desp ? vaccine.clase_desp : marca,
					observation: vaccine.vacuna_observaciones,
					date: vaccine.vac_fecha_puesta,
					next: vaccine.vac_fecha_expiracion,
					image: vaccine.vacu_comprobante,
					illness: illness,
				});
			});

			console.log(temp);
			setVaccines({
				name: dataPet.pet.usuario_empresa,
				date: stringToDate(dataPet.pet.usuario_empresa_sector),
				chipDate: dataPet.pet.usuario_registrado,
				vaccines: temp,
			});
		} else {
			setVaccines(dataPet.pet);
		}
	}, [dataPet?.vaccines]);

	const [src, setSrc] = useState(
		dataPet.pet.chip
			? `https://firu.alejandroaguilar.dev/public/images/image/${dataPet?.pet.chip}.jpg`
			: `${URL_RENIAN}/petimg/${dataPet?.pet.usuario_foto}`
	);

	return (
		<>
			<div className={classes.content}>
				<div className={classes.contentBg}></div>
				<div>
					<div>
						<div className={classes.contentImg}>
							{dataPet.pet?.name != undefined && <h1>{dataPet.pet?.name}</h1>}
							{dataPet.pet?.usuario_empresa != undefined && (
								<h1>{dataPet.pet?.usuario_empresa}</h1>
							)}
							<div>
								<div>
									{dataPet?.pet.chip ? (
										<Image
											src={src}
											layout="responsive"
											width={60}
											height={70}
											href="image-dog"
											alt="image-dog"
										/>
									) : (
										<Image
											src={src}
											layout="responsive"
											width={60}
											height={70}
											href="image-dog"
											alt="image-dog"
											onError={() => setSrc("/img/img-nofound.png")}
										/>
									)}
								</div>
								{petState && (
									<div className={classes.contentImgStatus}>
										<Tooltip
											position="bottom"
											theme="light"
											animation="scale"
											open
											html={
												<div className={classes.contentImgStatusTooltip}>
													Estado:{" "}
													<span style={{ color: colorState }}>{petState}</span>
												</div>
											}
										>
											<div style={{ background: colorState }}></div>
										</Tooltip>
									</div>
								)}
							</div>

							{dataPet.type == "RENIAN" && (
								<div className={classes.contentImgUpdate}>
									<lord-icon
										src="https://cdn.lordicon.com/hgpfwhzk.json"
										colors="primary:#ffae00,secondary:#ffae00"
										trigger="loop"
									></lord-icon>
									<p>Esta mascota debe actualizar sus datos.</p>
								</div>
							)}
						</div>
					</div>

					<div className={classes.contentInfo}>
						<div className={classes.contentInfo__cards}>
							<div>
								<div className={classes.contentInfo__cardsText}>
									<h4>Microchip:</h4>
									{dataPet.pet?.chip != undefined && (
										<span>{dataPet.pet?.chip}</span>
									)}
									{dataPet.pet?.usuario_cargo != undefined && (
										<span>{dataPet.pet?.usuario_cargo}</span>
									)}
								</div>

								<div className={classes.contentInfo__cardsImg}>
									<div>
										<Image
											src="/img/chip-consult.png"
											layout="responsive"
											width={50}
											height={50}
											href="chip-image"
											alt="chip-image"
										/>
									</div>
								</div>
							</div>

							<div>
								<div className={classes.contentInfo__cardsText}>
									<h4>Registrado por:</h4>
									{dataPet.pet?.userAddress != undefined && (
										<span>{`${dataPet.pet?.userAddress.substring(
											0,
											10
										)}...`}</span>
									)}
									{!dataPet.pet?.userAddress && <span>No definido</span>}
								</div>

								<div className={classes.contentInfo__cardsImg}>
									<div>
										<Image
											src="/img/registry-consult.png"
											layout="responsive"
											width={50}
											height={50}
											href="chip-image"
											alt="Chip Image"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className={classes.contentInfo__general}>
							<div className={classes.contentInfo__generalTable}>
								<div>
									<h5>Propietario:</h5>
									{dataPet.pet?.adopterName &&
										dataPet.pet?.adopterLastName != undefined && (
											<span>
												{dataPet.pet?.adopterName}{" "}
												{dataPet.pet?.adopterLastName}
											</span>
										)}
									{dataPet.pet?.usuario_nombre &&
										dataPet.pet?.usuario_apellidos != undefined && (
											<span>
												{dataPet.pet?.usuario_nombre}{" "}
												{dataPet.pet?.usuario_apellidos}
											</span>
										)}
								</div>

								<div>
									<h5>Raza:</h5>
									{dataPet.pet?.race != undefined && (
										<span>
											{" "}
											{races.map(
												(race) => race.value === dataPet.pet?.race && race.label
											)}
										</span>
									)}
									{dataPet.pet?.usuario_telefax != undefined && (
										<span>{dataPet.pet?.usuario_telefax}</span>
									)}
								</div>

								<div>
									<h5>Nacimiento:</h5>
									{dataPet.pet?.date != undefined && (
										<span>{formatDate(dataPet.pet?.date)}</span>
									)}
									{dataPet.pet?.usuario_empresa_sector != undefined && (
										<span>{dataPet.pet?.usuario_empresa_sector}</span>
									)}
								</div>

								<div>
									<h5>Fecha de adopcion:</h5>
									{dataPet.pet?.date != undefined && (
										<span>{formatDate(dataPet.pet?.dateAdoption)}</span>
									)}
									{dataPet.pet?.usuario_registrado != undefined && (
										<span>{formatDate(dataPet.pet?.usuario_empresa_sector)}</span>
									)}
								</div>

								<div>
									<h5>Pais:</h5>
									{dataPet.pet?.country != undefined && (
										<span>
											{" "}
											{countries.map(
												(values) =>
													values.value == dataPet.pet?.country && values.label
											)}
										</span>
									)}
									{dataPet.pet?.usuario_ciudad != undefined && (
										<span>{dataPet.pet?.usuario_ciudad}</span>
									)}
								</div>

								<div>
									<h5>Sexo:</h5>
									{dataPet.pet?.gender != undefined && (
										<span>
											{dataPet.pet?.gender === "MALE" && "MACHO"}{" "}
											{dataPet.pet?.gender === "FEMALE" && "HEMBRA"}
										</span>
									)}
									{dataPet.pet?.usuario_url != undefined && (
										<span>{dataPet.pet?.usuario_url}</span>
									)}
								</div>

								<div>
									<h5>Color:</h5>
									{dataPet.pet?.colour != undefined && (
										<span>
											{dataPet.pet.colour
												.split(",")
												.map((colour) =>
													colours.map(
														(values) =>
															values.value == colour && (
																<span key={values.value}>{values.label}. </span>
															)
													)
												)}
										</span>
									)}
									{dataPet.pet?.usuario_interes != undefined && (
										<span>{dataPet.pet?.usuario_interes}</span>
									)}
								</div>

								<div>
									<h5>Esterilizado:</h5>
									{dataPet.pet?.sterilized != undefined && (
										<span>{sterilizedSelect[dataPet.pet?.sterilized]}</span>
									)}
									{dataPet.pet?.usuario_esteril != undefined && (
										<span>
											{dataPet.pet?.usuario_esteril == "ESTERILIZADO"
												? "SI"
												: "NO"}
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.button}>
				<DefaultButton
					name={openVaccines ? "Ocultar Vacunas" : "Ver Vacunas"}
					background={"rgb(255, 191, 0)"}
					onClick={() => setOpenVaccines(!openVaccines)}
				/>
			</div>
			{openVaccines && <Vaccines pets={vaccines} type={dataPet.type} />}
		</>
	);
};

export const ContentWeb3Pet = ({ pet, status }) => {
	const { races } = useSpecie(pet.type);
	const { countries } = useCountry();
	const { colours } = useColours();
	const { openVaccines, setOpenVaccines } = useState(false);

	return (
		<>
			<div className={classes.content}>
				<div className={classes.contentBg}></div>
				<div>
					<div>
						<div className={classes.contentImg}>
							<h1>{pet?.name}</h1>
							<div>
								<div>
									<img
										src={`https://ipfs.io/ipfs/${pet?.image}`}
										alt="image-dog"
									/>
								</div>
								<div className={classes.contentImgStatus}>
									<Tooltip
										position="bottom"
										theme="light"
										animation="scale"
										open
										html={
											<div className={classes.contentImgStatusTooltip}>
												Estado:{" "}
												<span style={{ color: statusColor(status) }}>
													{statusSelect["es-Es"][status]}
												</span>
											</div>
										}
									>
										<div style={{ background: statusColor(status) }}></div>
									</Tooltip>
								</div>
							</div>
						</div>
					</div>

					<div className={classes.contentInfo}>
						<div className={classes.contentInfo__cards}>
							<div>
								<div className={classes.contentInfo__cardsText}>
									<h4>Microchip:</h4>
									<span>{pet?.chip}</span>
								</div>

								<div className={classes.contentInfo__cardsImg}>
									<div>
										<Image
											src="/img/chip-consult.png"
											layout="responsive"
											width={50}
											height={50}
											href="chip-image"
											alt="Chip Image"
										/>
									</div>
								</div>
							</div>

							<div>
								<div className={classes.contentInfo__cardsText}>
									<h4>Registrado por:</h4>
									<span>{`${pet?.userAddress.substring(0, 10)}...`}</span>
								</div>
								<div className={classes.contentInfo__cardsImg}>
									<div>
										<Image
											src="/img/registry-consult.png"
											layout="responsive"
											width={50}
											height={50}
											href="chip-image"
											alt="registry  Consult"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className={classes.contentInfo__general}>
							<div className={classes.contentInfo__generalTable}>
								<div>
									<h5>Propietario:</h5>
									<span>
										{pet?.adopterName} {pet?.adopterLastName}
									</span>
								</div>

								<div>
									<h5>Raza:</h5>
									<span>
										{races.map(
											(race) => race.value === pet?.race && race.label
										)}
									</span>
								</div>

								<div>
									<h5>Nacimiento:</h5>
									<span>{formatDate(pet?.date)}</span>
								</div>

								<div>
									<h5>Fecha de adopcion:</h5>
									<span>{formatDate(pet?.dateAdoption)}</span>
								</div>

								<div>
									<h5>Pais:</h5>
									<span>
										{countries.map(
											(values) => values.value == pet.country && values.label
										)}
									</span>
								</div>

								<div>
									<h5>Sexo:</h5>
									<span>
										{pet?.gender === "MALE" && "MACHO"}{" "}
										{pet?.gender === "FEMALE" && "HEMBRA"}
									</span>
								</div>

								<div>
									<h5>Color:</h5>
									<span>
										{pet.colour
											.split(",")
											.map((colour) =>
												colours.map(
													(values) =>
														values.value == colour && (
															<span key={values.value}>{values.label}. </span>
														)
												)
											)}
									</span>
								</div>

								<div>
									<h5>Esterilizado:</h5>
									<span>{sterilizedSelect[pet?.sterilized]}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Vaccines pets={pet} />
		</>
	);
};
