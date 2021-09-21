import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import { validateSMS } from "../../modules/api";

//GeneralUI
import { Button } from "../GeneralUI/Button/Button";
import buttonClasses from "../GeneralUI/Button/Button.module.scss";

import { H1 } from "../GeneralUI/H1/H1";

import { Input } from "../GeneralUI/Input/Input";

import formClasses from "./SmsForm.module.scss";


const delayToResend = 9000; // ms
const delayToResendSec = 9000 / 1000; //sec

function SmsForm(props) {
	const [enteredCode, setEnteredCode] = useState("");
	const [codeIsValid, setCodeIsValid] = useState(false);
	const [codeIsVerified, setCodeIsVerified] = useState(false);

	
	const [resendActive, setResendActive] = useState(false);
	const [timeToResend, setTimeToResend] = useState(delayToResendSec);



	const toggleHandler = () => {
		setResendActive(false);

		return setTimeout( () => {
			setResendActive(true);
		}, delayToResend );

	};

	const changeCodeHandler = (event) => {
		if (event.target.value.length <= 6) {
			setEnteredCode(event.target.value);
		}
	};

	const resendCodeHandler = () => {
		setTimeToResend(delayToResendSec);
		toggleHandler();
	};

	const submitCodeHandler = event => {
		event.preventDefault();
		validateSMS(props.sentPhoneNumber, +enteredCode)
			.then( () => {
				props.onSuccess(props.sentPhoneNumber);
				setCodeIsVerified(true);
			} );
	};


	useEffect(() => {
		let timerId = setInterval( () => {
			if (timeToResend <= 0) {
				clearInterval(timerId);
			}
			else {
				setTimeToResend( prevState => prevState - 1 );
			}
			
		}, 1000 );

		return () => {
			clearInterval(timerId);
		}
	}, [timeToResend]);



	useEffect(() => {
		const timerId = toggleHandler();

		return () => {
			clearTimeout(timerId);
		}
	}, []);


	useEffect(() => {
		setCodeIsValid(enteredCode.length >= 6);
	}, [enteredCode]);


	return (
		<>
			<Route path="/registration/validate-sms">
				{!props.sentPhoneNumber && <Redirect to="/registration" />}
				{codeIsVerified && <Redirect to="/" />}
			</Route>

			<H1>Step 2</H1>
			<form onSubmit={submitCodeHandler}>
				<Input
					type="number"
					id="sms-code"
					label="SMS code"
					value={enteredCode}
					onChange={changeCodeHandler}
				/>

				{!resendActive && (
					<div className={formClasses.resendWrap}>
						<span>Until resending: </span>
						<span>{timeToResend}</span>
					</div>
				)}

				<div className={formClasses.buttonWrap}>
					<Button
						type="submit"
						disabled={!codeIsValid}
						className={`${buttonClasses.primaryButton}${
							!codeIsValid ? " " + buttonClasses.disabled : ""
						}`}
					>
						Confirm
					</Button>
					<Button
						disabled={!resendActive}
						onClick={resendCodeHandler}
						className={`${buttonClasses.primaryButton}${
							!resendActive ? " " + buttonClasses.disabled : ""
						}`}
					>
						Send another code
					</Button>
				</div>
			</form>
		</>
	);
}

export { SmsForm }