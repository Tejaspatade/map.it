import React, { useEffect } from "react";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	// Consuming Context from FakeAuthProvider
	const { isAuthenticated } = useAuth();

	// Router-DOM Hooks
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) navigate("/");
	}, [isAuthenticated, navigate]);

	return isAuthenticated ? children : null;
};

export default ProtectedRoute;
