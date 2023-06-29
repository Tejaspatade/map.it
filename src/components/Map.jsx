import React, { useEffect, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Popup,
	Marker,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";

import styles from "./Map.module.css";

import Button from "./Button";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useUrlCoords } from "../hooks/useUrlCoords";

const Map = () => {
	// Consuming Context from CitiesProvider
	const { cities } = useCities();

	// React & Custom Hooks
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const [lat, lng] = useUrlCoords();
	const {
		isLoading: isLoadingLocation,
		position: geoLocation,
		getLocation,
	} = useGeolocation();

	// Updating Map Position state as a side-effect
	useEffect(() => {
		if (lat && lng) setMapPosition([lat, lng]);
	}, [lat, lng]);

	// Set map to focus onto user's current location as a side-effect
	useEffect(() => {
		if (geoLocation) setMapPosition([geoLocation.lat, geoLocation.lng]);
	}, [geoLocation]);

	return (
		<div className={styles.mapContainer}>
			{!geoLocation && (
				<Button type="position" onClick={getLocation}>
					{isLoadingLocation
						? "Loading..."
						: "Use Your Current Location"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={10}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>{city.cityName}</Popup>
					</Marker>
				))}
				<ChangeMapCenter position={mapPosition} />
				<ClickForForm />
			</MapContainer>
		</div>
	);
};

const ChangeMapCenter = ({ position }) => {
	// Leaflet Map Hook
	const map = useMap();

	// Update Map Center based on updated prop->position
	map.setView(position);

	return null;
};

const ClickForForm = () => {
	// Router-DOM Hooks
	const navigate = useNavigate();

	// Leaflet Hook
	useMapEvents({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});

	return null;
};

export default Map;
