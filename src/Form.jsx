import React, { useState } from "react";

import Input from "./components/Input";
import Button from "./components/Button";
import Select from "./components/Select";
import Checkbox from "./components/Checkbox";
import Alert from "./components/Alert";

import { REGEX } from "./utils";

import "./styles/form.scss";

const { EMAIL } = REGEX;

const getFieldComponent = ({type, values, setValues, props}) => {
	switch (type) {
		case "input":
			return <Input key={props.id} {...props} values={values} setValues={setValues}/>
		case "select":
			return <Select key={props.id} {...props} values={values} setValues={setValues}/>
		case "checkbox":
			return <Checkbox key={props.id} {...props} values={values} setValues={setValues} />
		default:
			break;
	}
};

const formFields = [
	{
		"id": 1,
		"name": "first-name",
		"label": "First name",
		"component": "input",
		"required": true,
		"autocomplete": "given-name",
		"aria-label":"Your first name",
	},
	{
		"id": 2,
		"name": "last-name",
		"label": "Last name",
		"component": "input",
		"required": true,
		"autocomplete": "family-name",
		"aria-label":"Your last name",
	},
	{
		"id": 3,
		"name": "email",
		"label": "Email Adress",
		"component": "input",
		"regex": EMAIL,
		"required": true,
		"validationMsg": "Invalid email address.",
		"autocomplete": "email",
		"aria-label":"Your email",
	},
	{
		"id": 4,
		"name": "organization",
		"label": "Organization",
		"component": "input",
		"autocomplete": "organization",
		"aria-label":"Your organization",
	},
	{
		"id": 5,
		"name": "residence",
		"label": "eu-resident",
		"component": "select",
		"required": true,
		"items": [
			{
				id: 1,
				description: "Yes"
		   	},
		   {
			   id: 2,
			   description: "No"
		   },
		   	// to test scroll
			//{
			//	id: 1,
			//	description: "Option 1"
			//},
			//{
			//	id: 2,
			//	description: "Option 2"
			//},
			//{
			//	id: 3,
			//	description: "Option 3"
			//},
			//{
			//	id: 4,
			//	description: "Option 4"
			//},
			//{
			//	id: 5,
			//	description: "Option 5"
			//},
			//{
			//	id: 6,
			//	description: "Option 6"
			//},
		]
	},
	{
		"id": 6,
		"name": "check-advances",
		"label": "Advances",
		"component": "checkbox",
		"ariaLbl": "advances checkbox",
	},
	{
		"id": 7,
		"name": "check-alerts",
		"label": "Alerts",
		"component": "checkbox",
		"ariaLbl": "alerts checkbox",
	},
	{
		"id": 8,
		"name": "check-communications",
		"label": "Other communications",
		"component": "checkbox",
		"ariaLbl": "communications checkbox",
	}
];

const validateFields = (values) => {
	
	const checksVal = () => {
		const validation = formFields
		.filter(field => field.component === "checkbox")
		.some(f => values[f.name] === true);
		return validation;
	};

	if(Object.values(values).length > 4 && 
		formFields
		.filter(field => field.required === true)
		.every(f => values[f.name].length > 0) && checksVal()){
		return true
	}
	return false;
};

function onReset(setValues){
	setValues({});	
};

function onSubmit(values, setModalProps){	
	if(validateFields(values)){
		let dataEncoded = {};
		for(const key in values){
			dataEncoded[key] = encodeURIComponent(values[key]);
		};
		const request = {
			data: dataEncoded,
			success: { 
				"status": "success", 
				"message": "Thank you. You are now subscribed." 
			}, 
			error: { 
				"status": "error", 
				"message": "Invalid Subscription request." 
			}
		}
		const getResponse = async () => {
			const response = await fetch("http://localhost:3000/users", {
				method: 'POST', 
				headers: {
				'Content-Type': 'application/json'
				},
				body: JSON.stringify(request)
			});
			return await response.json();
		}
		getResponse()
		.then(res => {
			if(res.success){
				setModalProps({
					msg: res.success.message,
					type: "success",
				});		
				window.scrollTo(0, 0);
			} else {
				setModalProps({
					msg: res.success.message,
					type: "success",
				});			
				window.scrollTo(0, 0);
			}
		})
		.catch(err => {
			setModalProps({
				msg: err,
				type: "error",
			});
			window.scrollTo(0, 0);
		})
	}
	return false;
};

const Form = ({title}) => {
	const [values, setValues] = useState({
		"check-advances": false,
		"check-alerts": false,
		"check-communications": false,
		"residence": "",
		"first-name": "",
		"last-name": "",
		"email":"",
		"organization": "",
	});
	const [modalProps, setModalProps] = useState(null);
	
	const onClose = () => {
		setModalProps({
			msg: "",
			type: "",
		});
	};
	
	return (
		<div className="form-container">
			{modalProps?.msg &&
			<Alert modalProps={modalProps} onClose={onClose} />
			}
			<h1>{title}</h1>
			<p className="form-container-inst">*Indicates Required Field</p>
			<form className="form-element" aria-labelledby="Sign up for email updates form">
				{
					formFields.map(field => {
						return getFieldComponent({type: field.component, props: field, values, setValues});
					})
				}
			</form>
			<div className="container-btns">
				<Button 
					values={values}
					label="Submit"
					type="primary"
					name="btn-submit"
					onClick={() => onSubmit(values, setModalProps)}
					setValues={setValues}
					ariaLbl="Submit"
				/>
				<Button 
					values={values}
					label="Reset"
					type="secondary"
					name="btn-reset"
					onClick={onReset}
					setValues={setValues}
					ariaLbl="Reset"
				/>
			</div>
		</div>
	)
};

export default Form;