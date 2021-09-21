import React, { useState, useEffect } from "react";

//GeneralUI
import { Button } from "../GeneralUI/Button/Button";
import buttonClasses from "../GeneralUI/Button/Button.module.scss";

import { H1 } from "../GeneralUI/H1/H1";

import { Input } from "../GeneralUI/Input/Input";

//api
import { sendSMS } from "../../modules/api";

function NumberForm(props) {
	const [enteredNumber, setEnteredNumber] = useState("");
	const [numberIsValid, setNumberIsValid] = useState(false);

	const changePhoneNumberHandler = (event) => {
		setEnteredNumber(event.target.value);
	};

	const submitNumberHandler = event => {
		event.preventDefault();
		sendSMS(enteredNumber)
			.then( (phoneNumber) => props.onSendCode(true, phoneNumber) )
			.catch( () => {
				setEnteredNumber("");
				props.onSendCode(false, null)
			} );
	};

	useEffect(() => {
		const timerId = setTimeout( () => {
			setNumberIsValid( /^[0-9+()-]+$/.test(enteredNumber) );
		}, 400);
		

		return () => {
			clearTimeout(timerId);
		}
	}, [enteredNumber]);

	return (
		<>
			<H1>Step 1</H1>
			<form onSubmit={submitNumberHandler}>
				<Input
					id="phone-number"
					label="Phone number"
					value={enteredNumber}
					onChange={changePhoneNumberHandler}
				/>
				<Button
					type="submit"
					disabled={!numberIsValid}
					className={`${buttonClasses.primaryButton}${
						!numberIsValid ? " " + buttonClasses.disabled : ""
					}`}
				>
					Send SMS
				</Button>
			</form>
		</>
	);
}

export { NumberForm }