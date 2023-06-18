import React from "react";

import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

const CityList = ({ cities, isLoading }) => {
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
			{cities.map((city) => (
				<CityItem city={city} />
			))}
		</ul>
	);
};

export default CityList;
