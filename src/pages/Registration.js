import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";


import { NumberForm } from "../components/NumberForm/NumberForm";

import { SmsForm } from "../components/SmsForm/SmsForm";

//GeneralUI
import { Container } from "../components/GeneralUI/Container/Container";

import { Card } from "../components/GeneralUI/Card/Card";
import cardClasses from "../components/GeneralUI/Card/Card.module.scss";



function Registration(props) {
	const [smsIsSent, setSmsIsSent] = useState(false);
	const [submittedPhoneNum, setSubmittedPhoneNum] = useState(null);

	const smsHandler = (result, phone) => {
		setSubmittedPhoneNum(phone);
		setSmsIsSent(result);
	};


	return (
		<Container>
			<Card className={cardClasses.registrationCard}>
				<Route path="/registration" exact>
					{smsIsSent ? (
						<Redirect to="/registration/validate-sms" />
					) : (
						<NumberForm onSendCode={smsHandler} />
					)}
				</Route>
				<Route path="/registration/validate-sms">
					<SmsForm onSuccess={props.onCompleteRegistration} sentPhoneNumber={submittedPhoneNum} />
				</Route>
			</Card>
		</Container>
	);
}

export { Registration };