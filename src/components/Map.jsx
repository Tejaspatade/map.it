import React from "react";

import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const Map = () => {
	// Routing Hooks
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	//
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	return (
		<div
			className={styles.mapContainer}
			onClick={() => {
				navigate("form");
			}}
		>
			Map {lat} {lng}
		</div>
	);
};

export default Map;
