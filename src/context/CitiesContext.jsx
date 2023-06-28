import React from "react";
import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const CitiesContext = createContext();

// Localhost for json-server to fetch data
const BASE_URL = "http://localhost:8000";

const CitiesProvider = ({ children }) => {
	// State
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	// Fetching City List as a side-effect on mount
	useEffect(() => {
		setIsLoading(true);
		fetch(`${BASE_URL}/cities`)
			.then((res) => res.json())
			.then((data) => setCities(data))
			.catch((err) => console.error(err.message))
			.finally(setIsLoading(false));
	}, []);

	const fetchCity = async (id) => {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();

			if (!data) throw new Error("Data Fetch Unsuccessfull");

			setCurrentCity(data);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<CitiesContext.Provider
			value={{ cities, isLoading, fetchCity, currentCity }}
		>
			{children}
		</CitiesContext.Provider>
	);
};

// Custom Hook
const useCities = () => {
	const value = useContext(CitiesContext);

	// Error Handling
	if (value === undefined)
		throw new Error("CitiesContext was used outside CitiesProvider");

	// Else return value
	return value;
};

export { CitiesProvider, useCities };