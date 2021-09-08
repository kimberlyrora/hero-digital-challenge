import React, { useState } from "react";
import "../styles/input.scss";

const Input = (props) => {
	const {name, label, values, setValues, autocomplete} = props;
	const [error, setError] = useState("");
	const [value, setValue] = useState("");
	
	const onChange = (e) => {
		if(props.regex){
			const isValid = new RegExp(props.regex).test(e.currentTarget.value);
			isValid ? setError(null) : setError(props.validationMsg);
		}
		setValue(e.currentTarget.value)
		setValues({
			...values,
			[name]: e.currentTarget.value
		});
	};
	
	const onBlur = () => {
		if(props.required && !value.length){
			setError(`${label} is required`);
		} else if(props.required && value.length){
			setError(null);
		}
	};
	
	return (
		<div className="input-container">
			{<p className="input-msg-error">{error}</p>}
			<label>{label}{props.required && "*"}</label>
			<input 
			className={`input ${error && "validation" }`} 
			onChange={onChange}
			onBlur={onBlur}
			autoComplete={autocomplete}
			>
			</input>
		</div>
	)
};

export default Input;