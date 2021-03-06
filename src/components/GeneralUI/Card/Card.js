import React from "react";

function Card(props) {
	return (
		<div className={props.className}>{props.children}</div>
	);
}

export { Card };