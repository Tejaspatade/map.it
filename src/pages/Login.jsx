import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useAuth } from "../context/FakeAuthContext";

const Login = () => {
	// Consuming Context from AuthProvider
	const { login, isAuthenticated } = useAuth();

	// Router-DOM Hooks
	const navigate = useNavigate();

	// React Hooks(PRE-FILLED FOR DEV PURPOSES)
	const [email, setEmail] = useState("jack@example.com");
	const [password, setPassword] = useState("qwerty");

	// Checking if user has logged in as a side-effect
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/app", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	// Handler Function
	const handleSubmit = (e) => {
		e.preventDefault();

		if (email && password) login(email, password);
	};

	return (
		<main className={styles.login}>
			<NavBar />
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type="primary">Login</Button>
				</div>
			</form>
		</main>
	);
};

export default Login;
