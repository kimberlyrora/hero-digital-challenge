import React from "react";
import "../styles/button.scss";

const Button = ({label, onClick, type, values, ariaLbl}) => {
	return (
		<button aria-label={ariaLbl} className={`button ${type}`} onClick={() => onClick(values)} tabIndex="0">
			{label}
		</button>
	)
};

export default Button;