import React, { useState } from "react";
import "../styles/select.scss";

const Select = (props) => {
	const {name, label, values, setValues, items} = props;
	const [showList, setShowList] = useState(false);
	const [error, setError] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	
	const onClickArrow = () => {
		setShowList(!showList);
	};
	
	const onSelectOption = (item) => {
		setValues({
			...values,
			[name]: item.description
		});
		setSelectedOption(item.description);
		onClickArrow();
	};
	
	const onBlur = () => {
		if(!selectedOption.length){
			setError(`${label} is required`);
		}	
	};
	
	return (
		<div className="select" onBlur={onBlur}>
			{<p className="select-input-msg-error">{error}</p>}
			<label>{label}{props.required && "*"}</label>
			<div className="select-container">
				<div className="select-input">
					<p className="select-placeholder">{selectedOption || "- SELECT ONE -"}</p>
					<div className="container-icon" onClick={onClickArrow}>
						<svg className={showList ? "rotate-icon" : ""} width="7px" height="5px" viewBox="0 0 5 9" version="1.1" >
							<g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								<g id="expand-arrow-right" fill="#626262" fillRule="nonzero">
									<path d="M2.85212718,6.85350097 C2.84612718,6.85850097 2.84912718,6.86750097 2.84412718,6.87250097 C2.74412718,6.97150097 2.61512718,7.01650097 2.48712718,7.01450097 C2.35812718,7.01650097 2.22912718,6.96950097 2.13112718,6.86950097 C2.12612718,6.86450097 2.12812718,6.85650097 2.12412718,6.85050097 L-1.85587282,2.84650097 C-2.04887282,2.65250097 -2.04787282,2.33750097 -1.85387282,2.14450097 C-1.65987282,1.95150097 -1.34487282,1.95150097 -1.15187282,2.14650097 L2.49212718,5.81250097 L6.15812718,2.16750097 C6.35212718,1.97450097 6.66612718,1.97650097 6.85912718,2.17050097 C7.05212718,2.36450097 7.05212718,2.68050097 6.85712718,2.87250097 L2.85212718,6.85350097 Z" id="Path" transform="translate(2.501814, 4.507282) rotate(-90.000000) translate(-2.501814, -4.507282) "></path>
								</g>
							</g>
						</svg>
					</div>
				</div>
				{showList &&
					<ul className="select-list">
						{items.map(item => {
							return <li key={item.id} className={item.description === selectedOption ?"option-selected" : ""} value={item.description} onClick={() => onSelectOption(item)}>{item.description}</li>
						})}
					</ul>
				}
				</div>
			</div>
	)
};

export default Select;