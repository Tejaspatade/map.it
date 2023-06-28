import React, { useEffect, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Popup,
	Marker,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./Map.module.css";
import { useCities } from "../context/CitiesContext";

const Map = () => {
	// Consuming Context from CitiesProvider
	const { cities } = useCities();

	// Router-DOM Hooks
	const [searchParams] = useSearchParams();

	// Hooks
	const [mapPosition, setMapPosition] = useState([40, 0]);

	// Derived state
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	// Updating Map Position state as a side-effect
	useEffect(() => {
		if (lat && lng) setMapPosition([lat, lng]);
	}, [lat, lng]);

	return (
		<div
			className={styles.mapContainer}
			// onClick={() => {
			// 	navigate("form");
			// }}
		>
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
