import React from "react";

function Button(props) {
	return (
		<button
			type={props.type || "button"}
			disabled={props.disabled}
			className={props.className}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

export { Button };