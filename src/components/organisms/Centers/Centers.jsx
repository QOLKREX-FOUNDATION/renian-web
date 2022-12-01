import React from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { MainContainer } from "../../containers/MainContainer/MainContainer";
import classes from "./centers.module.scss";
import { useEffect } from "react";
import { useCenters } from "../../../hook/useCenters";
import { useMap } from "../../../hook/useMap";
import { dataCenters } from "./data";
import { useState } from "react";
import { useRef } from "react";

const containerStyle = {
	width: "100%",
	height: "500px",
};

const center = {
	lat: -12.0262674,
	lng: -77.1282086,
};

export const Centers = ({ centers }) => {
	const [markers, setMarkers] = useState([]);
	const [visible, setVisible] = useState([]);
	const ref = useRef();
	const {
		locations,
		paginate,
		setPaginate,
		lengthPaginate,
		search,
		onSearch,
		prev,
		next,
		handleLocation,
	} = useCenters(centers);

	const { onLoad, onUnmount, isLoaded } = useMap();

	useEffect(() => {
		handleLocation();
	}, [centers]);

	useEffect(() => {
		if (search) {
			setMarkers(locations);
			const temp = {};
			for (const iterator of centers) {
				temp[iterator.id] = false;
			}
			setVisible(temp);
		} else {
			setMarkers(centers);
			const temp = {};
			for (const iterator of centers) {
				temp[iterator.id] = false;
			}
			setVisible(temp);
		}
	}, [search]);

	return (
		<section className={classes.centers}>
			<MainContainer>
				<div className={classes.centers__container}>
					{isLoaded && (
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={center}
							zoom={11}
							onLoad={onLoad}
							onUnmount={onUnmount}
						>
							{/* Child components, such as markers, info windows, etc. */}

							{markers.map((center, index) => (
								<Marker
									key={center.id}
									position={{
										lat: parseFloat(center.latitude),
										lng: parseFloat(center.longitude),
									}}
									icon={"/img/icono-mapa-Renian.png"}
									onClick={() =>
										setVisible((v) => ({ ...v, [center.id]: !v[center.id] }))
									}
									animation={
										visible[center.id]
											? window.google.maps.Animation.BOUNCE
											: null
									}
								>
									<>
										{visible[center.id] && (
											<InfoWindow
												position={{
													lat: parseFloat(center.latitude ),
													lng: parseFloat(center.longitude  ),
												}}
												onCloseClick={() =>
													setVisible((v) => ({
														...v,
														[center.id]: !v[center.id],
													}))
												}
											>
												<div
												
													onClick={() =>
														setVisible((v) => ({
															...v,
															[center.id]: !v[center.id],
														}))
													}
												>
													<p>{center.name}</p>
												</div>
											</InfoWindow>
										)}
									</>
								</Marker>
							))}
						</GoogleMap>
					)}
				</div>

				<div className={classes.search}>
					Todas las veterinarias
					<br />
					<input
						className={classes.search__input}
						value={search}
						onChange={onSearch}
						placeholder="Ingrese su distrito, ciudad o provincia"
					/>
				</div>

				<div className={classes.container}>
					{locations.map((location) => (
						<div className={classes.container__direction} key={location.id}>
							<h2 className={classes.container__direction__h2}>
								Veterinaria {location.name}
							</h2>
							<div>
								<h3 className={classes.container__direction__h3}>
									Direccion : {location.direction}
								</h3>
								<p className={classes.container__direction__p}>
									KENBOR {location.name}
								</p>
							</div>
						</div>
					))}
				</div>
				<div>
					{search === "" && (
						<>
							<button className={classes.paginate} onClick={prev}>
								Prev
							</button>
							{lengthPaginate.length > 0 &&
								lengthPaginate?.map((a) => (
									<button
										key={a}
										className={`${classes.paginate} ${
											paginate === a ? classes.paginate__active : ""
										}`}
										onClick={() => {
											setPaginate(a);
											handleLocation();
										}}
									>
										{a}
									</button>
								))}

							<button className={classes.paginate} onClick={next}>
								Next
							</button>
						</>
					)}
				</div>
			</MainContainer>
		</section>
	);
};

// AIzaSyAwgp4SFCnuCZYipiF5YmIumo8jYxFj3_0
