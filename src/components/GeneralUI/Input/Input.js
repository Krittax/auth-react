import React from "react";

import classes from "./Input.module.scss";

function Input(props) {
	return (
		<div className={classes.input}>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				id={props.id}
				type={props.type || "text"}
				onChange={props.onChange}
				value={props.value}
			/>
		</div>
	);
}

export { Input };
