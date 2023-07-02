import { createContext, useContext, useReducer } from "react";

// Cnotext
const AuthContext = createContext();

// Reducer
const initialState = {
	user: null,
	isAuthenticated: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, isAuthenticated: true };

		case "logout":
			return initialState;

		default:
			throw new Error("Invalid Action!!");
	}
};

const FAKE_USER = {
	name: "Jack",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = ({ children }) => {
	// Reducer for Centralised State
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	const login = (email, password) => {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: "login", payload: FAKE_USER });
	};

	const logout = () => {
		dispatch({ type: "logout" });
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom Hooks
const useAuth = () => {
	const values = useContext(AuthContext);

	// Context was used outside it's provider
	if (values === undefined)
		throw new Error("Context was used outside it's provider.");

	return values;
};

export { AuthProvider, useAuth };
