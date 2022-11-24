import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Tooltip } from "react-tippy";
import {
	ModalInputComponent,
	ReactSelectComponent,
	ModalFile,
	ModalCheckbox,
	ModalButton,
	ModalChipInputComponent,
} from "../../../";
import classes from "./registry-modal.module.scss";
import { useSpecie, useCountry, useColours } from "../../../../hook/inputs";
import { optionsSterilized } from "../../../../utils/sterilized";
import { amountBigReverse, getAmountsIn } from "../../../../utils";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";

export const PetRegister = ({ petValues, watchPet, setPet, errorsPet }) => {
	const { web3 } = useContext(Web3Context);
	const [isFiat, setIsFiat] = useState(true);
	const [isCrypto, setIsCrypto] = useState(false);
	const [haveChip, setHaveChip] = useState();
	const [priceU, setPriceU] = useState("0");
	const [priceF, setPriceF] = useState(0);

	const { species, races } = useSpecie(watchPet("type"));
	const { countries } = useCountry();
	const { colours } = useColours();

	// const onSetFiat = () => {
	// 	setIsFiat(true);
	// 	setIsCrypto(false);
	// };
	// const onSetCrypto = () => {
	// 	setIsFiat(false);
	// 	setIsCrypto(true);
	// };

	// const publicAddress = "0x4415B2Bfc4445b33C17c1A0b0D10cC18e9F928D0";
	// const contractCopy = () => {
	// 	navigator.clipboard.writeText(publicAddress);
	// };

	// useEffect(() => {
	// 	isCrypto && setPet("payable", "");
	// }, [isCrypto]);

	// useEffect(() => {
	// 	isFiat && setPet("tx", "");
	// }, [isFiat]);

	// useEffect(() => {
	// 	setPriceU(haveChip ? "16" : "8");
	// }, [haveChip]);

	// useEffect(() => {
	// 	getAmountsIn(web3.networkWar, "FIRU", "USDC", priceU)
	// 		.then((resolve) => {
	// 			if (resolve?.value[0] > 0) {
	// 				setPriceF(amountBigReverse(resolve?.value[0], 8));
	// 			}
	// 		})
	// 		.catch((e) => console.log(e));
	// }, [priceU]);

	return (
		<>
			{/* <div className={classes.modal__contentMainFormPayment}>
				<h3>Modalidades de pago</h3>
				<div>
					<div
						className={classes.modal__contentMainFormPaymentCard}
						onClick={onSetFiat}
						style={{
							borderColor: isFiat ? "#bf002a" : "hsl(0, 0%, 80%)",
							filter: isFiat ? "saturate(1)" : "saturate(0.3)",
							transform: isFiat ? "scale(1)" : "scale(0.97)",
							color: isFiat ? "#bf002a" : "#606060",
						}}
					>
						<div>
							<Image
								src="/img/payment-fiat.png"
								layout="responsive"
								width={50}
								height={50}
								href="fiat"
								alt="Fiat"
							/>
						</div>
						<h5>Fiat</h5>
					</div>

					<div
						className={classes.modal__contentMainFormPaymentCard}
						onClick={onSetCrypto}
						style={{
							borderColor: isCrypto ? "#bf002a" : "hsl(0, 0%, 80%)",
							filter: isCrypto ? "saturate(1)" : "saturate(0.3)",
							transform: isCrypto ? "scale(1)" : "scale(0.97)",
							color: isCrypto ? "#bf002a" : "#606060",
						}}
					>
						<div>
							<Image
								src="/img/payment-crypto.png"
								layout="responsive"
								width={50}
								height={50}
								href="crypto"
								alt="Crypto"
							/>
						</div>
						<h5>Crypto</h5>
					</div>
				</div>

				<div>
					{!isFiat && !isCrypto && <p>Seleccione una modalidad de pago...</p>}
					{isFiat && (
						<div className={classes.modal__contentMainFormPaymentFiat}>
							<ModalFile
								name="comprobante de pago"
								values={petValues}
								watch={watchPet}
								property="payable"
								error={errorsPet}
								required={isFiat}
							/>
							<a
								href={
									haveChip
										? "https://pagolink.niubiz.com.pe/pagoseguro/QOLKREX/1763722"
										: "https://pagolink.niubiz.com.pe/pagoseguro/QOLKREX/1722175"
								}
								target="_blank"
								rel="noreferrer noopener"
								style={{
									textDecoration: "none",
								}}
							>
								<ModalButton name={`hacer deposito $${priceU}.00`} />
							</a>
						</div>
					)}
					{isCrypto && (
						<div className={classes.modal__contentMainFormPaymentCrypto}>
							<h5>
								<span>tx (rio de la luna): </span>(8.00 usdc) - (
								{priceF.toFixed(2)} firu)
							</h5>
							<Tooltip
								title="Click para copiar el address al portapapeles"
								position="bottom"
								animation="scale"
							>
								<p onClick={contractCopy}>{publicAddress}</p>
							</Tooltip>
							<ModalInputComponent
								name="Ingrese aqui su hash de transacción..."
								property="tx"
								values={petValues}
								error={errorsPet}
								required={isCrypto}
							/>
						</div>
					)}
				</div>
			</div> */}

			<div className={`${classes.modal__contentMainFormReveal}`}>
				<div>
					<ModalCheckbox
						onClick={() => setHaveChip(!haveChip)}
						show={haveChip}
					/>
					<p>¿La mascota tiene chip de identificación?</p>
				</div>
				{haveChip && (
					<div>
						<ModalChipInputComponent
							name="código de microchip"
							property="chip"
							type="number"
							values={petValues}
							setPet={setPet}
							error={errorsPet}
							required={haveChip}
							watchPet={watchPet}
							update={false}
						/>
					</div>
				)}
			</div>
			<div
				className={`${classes.modal__contentMainFormSection} ${classes.modal__contentMainFormChip}`}
			>
				<h3>identificación</h3>
				<div>
					<ModalInputComponent
						name="nombre"
						property="name"
						values={petValues}
						error={errorsPet}
						required
					/>
					<ReactSelectComponent
						name="País"
						property="country"
						options={countries}
						values={petValues}
						watch={watchPet}
						setValue={setPet}
						error={errorsPet}
						required
					/>

					<ReactSelectComponent
						name="Animal"
						property="type"
						options={species}
						values={petValues}
						watch={watchPet}
						setValue={setPet}
						error={errorsPet}
						required
					/>
					<ReactSelectComponent
						name="Sexo"
						property="gender"
						options={[
							{ label: "MACHO", value: "MALE" },
							{ label: "HEMBRA", value: "FEMALE" },
						]}
						values={petValues}
						watch={watchPet}
						setValue={setPet}
						error={errorsPet}
						required
					/>
					<ReactSelectComponent
						name="raza"
						property="race"
						options={races}
						values={petValues}
						watch={watchPet}
						setValue={setPet}
						error={errorsPet}
						required
					/>

					<ReactSelectComponent
						name="color (max. 3)"
						property="colour"
						options={colours}
						value={colours.filter((color) =>
							watchPet("colour").split(",").includes(color.value)
						)}
						onChange={(target) => {
							if (target.length < 4) {
								const arr = target.map((t) => t.value);
								setPet("colour", arr.join(","));
							}
						}}
						values={petValues}
						watch={watchPet}
						setValue={setPet}
						error={errorsPet}
						isMulti
						required
					/>
					<ModalInputComponent
						name="fecha de nacimiento"
						property="date"
						type="date"
						values={petValues}
						error={errorsPet}
						required
					/>

					<ModalInputComponent
						name="fecha de adopción"
						type="date"
						property="dateAdoption"
						values={petValues}
						error={errorsPet}
						required
					/>

					<ReactSelectComponent
						name="esterilizado"
						property="sterilized"
						options={optionsSterilized}
						values={petValues}
						watch={watchPet}
						setValue={setPet}
						error={errorsPet}
						required
					/>
				</div>
			</div>

			<div className={classes.modal__contentMainFormSection}>
				<h3>genealogía (opcional)</h3>
				<div>
					<ModalChipInputComponent
						name="Microchip del padre"
						property="chipFather"
						type="number"
						values={petValues}
						setPet={setPet}
						error={errorsPet}
						watchPet={watchPet}
						update={true}
					/>

					<ModalChipInputComponent
						name="Microchip de la madre"
						property="chipMother"
						type="number"
						values={petValues}
						setPet={setPet}
						error={errorsPet}
						watchPet={watchPet}
						update={true}
					/>
				</div>
			</div>

			<div className={`${classes.modal__contentMainFormCapture}`}>
				<h3>imagen de mascota</h3>
				<div>
					<div>
						<p>Recomendado: 350px x 467px</p>
						<ModalFile
							name="Foto de la Mascota"
							values={petValues}
							watch={watchPet}
							property="image"
							error={errorsPet}
							required
						/>
					</div>
				</div>
			</div>
		</>
	);
};
