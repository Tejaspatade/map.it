import React from "react";

import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

const CountryList = ({ cities, isLoading }) => {
	// Conditional Rendering
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message
				message={"Start Tracking Your Travels By Clicking on the map"}
			/>
		);

	const countries = cities.reduce((acc, curr) => [], []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.id} />
			))}
		</ul>
	);
};

export default CountryList;
