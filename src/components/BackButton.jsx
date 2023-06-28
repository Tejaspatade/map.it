import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

const BackButton = () => {
	// Router-DOM Hook
	const navigate = useNavigate();

	return (
		<Button
			type="back"
			onClick={(event) => {
				event.preventDefault();
				// Go back one page
				navigate(-1);
			}}
		>
			&larr; Back
		</Button>
	);
};

export default BackButton;
