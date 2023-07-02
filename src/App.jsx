import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
	return (
		<CitiesProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="product" element={<Product />} />
						<Route path="pricing" element={<Pricing />} />
						<Route path="login" element={<Login />} />
						<Route
							path="app"
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route
								index
								element={<Navigate to="cities" replace />}
							/>
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<Form />} />
						</Route>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</CitiesProvider>
	);
};

export default App;
