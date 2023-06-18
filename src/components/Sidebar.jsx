import React from "react";

import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNavBar from "./AppNavBar";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNavBar />
			<Outlet />
			<footer className={styles.footer}>
				<p className={styles.copyright}>&copy; Copyright By Tejas</p>
			</footer>
		</div>
	);
};

export default Sidebar;
