import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";

const BASE_URL = "http://localhost:8000";

const App = () => {
	// State
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Fetching City List as a sie-effect on mount
	useEffect(() => {
		setIsLoading(true);
		fetch(`${BASE_URL}/cities`)
			.then((res) => res.json())
			.then((data) => setCities(data))
			.catch((err) => console.error(err.message))
			.finally(setIsLoading(false));
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					<Route
						index
						element={
							<CityList cities={cities} isLoading={isLoading} />
						}
					/>
					<Route
						path="cities"
						element={
							<CityList cities={cities} isLoading={isLoading} />
						}
					/>
					<Route path="cities/:id" element={<City />} />
					<Route
						path="countries"
						element={
							<CountryList
								cities={cities}
								isLoading={isLoading}
							/>
						}
					/>
					<Route path="form" element={<p>Form</p>} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
