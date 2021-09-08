import React, {useState} from "react";
import "../styles/checkbox.scss";

const Checkbox = ({name, label, values, id, setValues, ariaLbl}) => {
	const [checked, setChecked] = useState(false);
	
	const onChange = () => {
		setChecked(!checked);
		setValues({
			...values,
			[name]: !checked
		});
	};
	
	return (
		<label id={name} className="checkbox-container" htmlFor={`${name}${id}`} aria-labelledby={ariaLbl}>
			<p className="checkbox-label">{label}</p>
			<input id={`${name}${id}`} type="checkbox" checked={checked} onChange={onChange} aria-checked="false" tabIndex="0">
			</input>
			<span className="checkmark"></span>
		</label>
	)
};

export default Checkbox;