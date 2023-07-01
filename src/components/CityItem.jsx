import React from "react";
import { Link } from "react-router-dom";

import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";

// Utility Functions
// Convert Flag Emoji to PNG for Windows since not supported
const flagemojiToPNG = (flag) => {
	if (flag) {
		let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
			.map((char) => String.fromCharCode(char - 127397).toLowerCase())
			.join("");
		return (
			<img
				src={`https://flagcdn.com/24x18/${countryCode}.png`}
				alt="flag"
			/>
		);
	} else return null;
};

// Formatting date passed in
const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

const CityItem = ({ city }) => {
	//
	const { currentCity, deleteCity } = useCities();

	// Derived State
	const { cityName, emoji, date, id, position } = city;

	// Event Handlers
	const handleClick = (e) => {
		// Avoid from event propagating up the DOM tree
		e.preventDefault();

		// Deleting city from API
		deleteCity(id);
	};

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${
					currentCity.id === id ? styles["cityItem--active"] : ""
				}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button className={styles.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
};

export default CityItem;
