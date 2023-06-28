import { useParams } from "react-router-dom";
import { useEffect } from "react";

import styles from "./City.module.css";
import { useCities } from "../context/CitiesContext";
import Spinner from "./Spinner";

// Utility Functions
// Convert Flag Emoji to PNG for Windows since not supported
const flagemojiToPNG = (flag) => {
	let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
		.map((char) => String.fromCharCode(char - 127397).toLowerCase())
		.join("");
	return (
		<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
	);
};

// Formatting date passed in
const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

function City() {
	// Router-DOM Hook
	const { id } = useParams();

	// Consuming Context from CitiesProvider
	const { fetchCity, currentCity, isLoading } = useCities();

	// Fetching the current city id data from server as a side-effect
	useEffect(() => {
		fetchCity(id);
	}, [id]);

	// Derived State
	const { cityName, date, notes, emoji } = currentCity;

	// Conditional Rendering
	if (isLoading) return <Spinner />;

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{flagemojiToPNG(emoji)}</span> {cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer"
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			{/* <div>
				<ButtonBack />
			</div> */}
		</div>
	);
}

export default City;
