import React from "react";
import { useContext } from "react";
import { createContext, useReducer, useEffect } from "react";

const CitiesContext = createContext();

// Localhost for json-server to fetch data
const BASE_URL = "http://localhost:8000";

// Using Reducer rather than State
const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "loading":
			return {
				...state,
				isLoading: true,
			};

		case "cities/loaded":
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};

		case "city/loaded":
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
			};

		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};

		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(
					(city) => city.id !== action.payload
				),
				currentCity: {},
			};

		case "rejected":
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			throw new Error("This is a wrong action. ");
	}
};

const CitiesProvider = ({ children }) => {
	// Reducer for State
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);

	// Fetching City List as a side-effect on mount
	useEffect(() => {
		// Async Function Defined
		const fetchCities = async () => {
			try {
				// Loading Starts
				dispatch({ type: "loading" });

				// Fetching Data
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();

				// Guard Clause
				if (!data) throw new Error("Data Fetch Unsuccessfull");

				// Dispatching Action to Reducer
				dispatch({ type: "cities/loaded", payload: data });
			} catch (err) {
				// Error Action Dispatched to Reducer
				dispatch({ type: "rejected", payload: err.message });
			}
		};

		// Invoking Async Function
		fetchCities();
	}, []);

	// Fetching city details
	const fetchCity = async (id) => {
		// Check if Current City is same as city needed to be fetched
		if (Number(id) === currentCity.id) return;

		try {
			// Loading Starts
			dispatch({ type: "loading" });

			// Fetching City Info
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();

			// Guard Clause
			if (!data) throw new Error("Data Fetch Unsuccessfull");

			// Dispatching Action to Reducer
			dispatch({ type: "city/loaded", payload: data });
		} catch (err) {
			// Error Action Dispatched to Reducer
			dispatch({ type: "rejected", payload: err.message });
		}
	};

	// Adding new city
	const postCity = async (newCity) => {
		try {
			// Loading Starts
			dispatch({ type: "loading" });

			// Sending New City
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			// Guard Clause
			if (!data) throw new Error("Data Post Unsuccessfull");

			// Adding to Reducer.. Not Ideal.. Must Use React Query
			dispatch({ type: "city/created", payload: data });
		} catch (err) {
			// Error Action Dispatched to Reducer
			dispatch({ type: "rejected", payload: err.message });
		}
	};

	// Delete City
	const deleteCity = async (id) => {
		try {
			// Loading Starts
			dispatch({ type: "loading" });

			// Deleting City
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});

			// Adding to State.. Not Ideal.. Must Use React Query
			dispatch({ type: "city/deleted", payload: id });
		} catch (err) {
			// Error Action Dispatched to Reducer
			dispatch({ type: "rejected", payload: err.message });
		}
	};

	return (
		<CitiesContext.Provider
			value={{
				cities,
				currentCity,
				isLoading,
				error,
				fetchCity,
				postCity,
				deleteCity,
			}}
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
