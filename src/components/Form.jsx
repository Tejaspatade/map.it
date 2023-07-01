import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useUrlCoords } from "../hooks/useUrlCoords";
import { useCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

// Utility Function
function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

// Convert Flag Emoji to PNG for Windows since it's not supported
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

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
	// Router-DOM Hooks
	const navigator = useNavigate();

	// React & Custom Hooks
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState("");
	const [geocodingError, setGeocodingError] = useState("");
	const [date, setDate] = useState(new Date());
	const [lat, lng] = useUrlCoords();
	const [isLoadingGeoCode, setIsLoadingGeoCode] = useState(false);

	// Consume Context from CitiesProvider
	const { postCity, isLoading } = useCities();

	// Fetch all info about the location clicked using reverse geocoding as a side-effect
	useEffect(() => {
		// Guard Clause
		if (!lat && !lng) return;

		// Asynchronous function to fetch city data
		const reverseGeoCode = async () => {
			try {
				// Setting Defaults
				setIsLoadingGeoCode(true);
				setGeocodingError("");

				// Fetching Data
				const res = await fetch(
					`${BASE_URL}?latitude=${lat}&longitude=${lng}`
				);
				const data = await res.json();

				// Validating Data
				if (!data.countryCode)
					throw new Error(
						"That doesn't seem like a right location. Please try again!!"
					);

				// Set States Otherwise
				setCityName(data.city || data.locality || "");
				setCountry(data.countryName);
				setEmoji(convertToEmoji(data.countryCode));
			} catch (e) {
				setGeocodingError(e.message);
			} finally {
				setIsLoadingGeoCode(false);
			}
		};

		// Invoke async function
		reverseGeoCode();
	}, [lat, lng]);

	// Event Handlers
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Guard Clause
		if (!country || !date) return;

		// Create New City
		const newCity = {
			country,
			cityName,
			date,
			notes,
			emoji,
			position: { lat, lng },
		};

		// Post Request to API to store the city data
		await postCity(newCity);

		// Redirect User to app/cities
		navigator("/app");
	};

	// Conditional Renders
	if (!lat && !lng)
		return <Message message="Start by clicking somewhere on the map." />;

	if (isLoadingGeoCode) return <Spinner />;

	if (geocodingError) return <Message message={geocodingError} />;

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					onChange={(date) => setDate(date)}
					selected={date}
					dateFormat="dd/MM/yyyy"
					id="date"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">
					Notes about your trip to {cityName}
				</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
