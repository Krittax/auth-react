import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//Pages
import { Registration } from "./pages/Registration";
import { AuthSuccess } from "./pages/AuthSuccess";

import classes from "./App.module.scss";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [confirmedPhoneNumber, setConfirmedPhoneNumber] = useState(null);

	const completeRegistrationHandler = (phoneNumber) => {
		setIsAuth(true);
		setConfirmedPhoneNumber(phoneNumber);	
	};



	return (
		<div className={classes.wrapper}>
			<Switch>
				<Route path="/" exact>
					{!isAuth ? (
						<Redirect to="/registration" />
					) : (
						<AuthSuccess phoneNumber={confirmedPhoneNumber} />
					)}
				</Route>
				<Route path="/registration">
					<Registration
						onCompleteRegistration={completeRegistrationHandler}
						phoneNumber={confirmedPhoneNumber}
					/>
				</Route>
			</Switch>
		</div>
	);
}

export default App;
