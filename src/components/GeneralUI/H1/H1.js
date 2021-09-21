import React from "react";
import classes from "./H1.module.scss";

function H1(props) {
	return <h1 className={classes.h1}>{props.children}</h1>
}

export { H1 };