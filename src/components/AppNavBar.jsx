import React from "react";

import styles from "./AppNavBar.module.css";
import { NavLink } from "react-router-dom";

const AppNavBar = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink to="cities">Cities</NavLink>
				</li>
				<li>
					<NavLink to="countries">Countries</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default AppNavBar;
