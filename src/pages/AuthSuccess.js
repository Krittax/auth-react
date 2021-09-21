import React from "react";

//GeneralUI
import { Card } from "../components/GeneralUI/Card/Card";
import cardClasses from "../components/GeneralUI/Card/Card.module.scss";

import { Container } from "../components/GeneralUI/Container/Container";
import { H1 } from "../components/GeneralUI/H1/H1";

function AuthSuccess(props) {
	return (
		<Container>
			<Card className={cardClasses.authCard}>
				<H1>Authenticated</H1>
				<span>{props.phoneNumber}</span>
			</Card>
		</Container>
	);
}

export { AuthSuccess };