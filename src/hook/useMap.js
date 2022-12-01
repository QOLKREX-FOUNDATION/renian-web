import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";

export const useMap = () => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyABWr3qiJrBO66xI7wVxJ8FmtL59VyRnaY",
	});

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		// const bounds = new window.google.maps.LatLngBounds(center);
		// map.fitBounds(bounds);
		map.setZoom(12);

		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);


    return {
        map, 
        setMap,
        onLoad,
        onUnmount,
        isLoaded
    }
};
