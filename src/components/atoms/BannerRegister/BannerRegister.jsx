import Image from "next/image";

export const BannerRegister = ({ classes }) => {
	return (
		<div>
			<div className={classes?.modal__contentIcon}>
				<div>
					<Image
						src="/img/cards/image_02.png"
						layout="responsive"
						width={50}
						height={50}
						href="image"
						alt="Banner Renian"
					/>
				</div>
			</div>

			<div>
				<h1>
					solicitud de <span>registro</span>
				</h1>
				<div className={classes?.modal__contentPrice}>
					<h3>A solo</h3>
					<h1>
						<span>s/</span>60
					</h1>
				</div>
				<div className={classes?.modal__contentInclude}>
					<h4>Incluye:</h4>
					<ul>
						<li>Microchip de identificación</li>
						<li>Registro en el Sistema de RENIAN</li>
						<li>Carnet de identificación</li>
						<li>Consulta veterinaria</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
