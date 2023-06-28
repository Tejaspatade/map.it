import React from "react";

import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

const CityList = () => {
	// Consuming Context from CitiesProvider with its custom hooks
	const { cities, isLoading } = useCities();

	// Conditional Rendering
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message
				message={"Start Tracking Your Travels By Clicking on the map"}
			/>
		);

	return (
		<ul className={styles.cityList}>
			{cities.map((city, i) => (
				<CityItem city={city} key={i} />
			))}
		</ul>
	);
};

export default CityList;
