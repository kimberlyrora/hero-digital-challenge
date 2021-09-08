import React from "react";
import "../styles/alert.scss";

const Alert = (props) => {
	const {msg, type, onClose} = props.modalProps;
	
	return (
		<div className={`alert-content ${type}`}>
			<p className="alert-content-msg">{msg}</p>
			<span className="close" onClick={onClose}>&times;</span>
		</div>
	)
};

export default Alert;