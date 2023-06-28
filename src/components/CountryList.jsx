import React from "react";

import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

const CountryList = () => {
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

	const countries = cities.reduce((array, city, i) => {
		if (!array.map((el) => el.country).includes(city.country))
			return [
				...array,
				{ country: city.country, emoji: city.emoji, id: i },
			];
		else return array;
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.id} />
			))}
		</ul>
	);
};

export default CountryList;
