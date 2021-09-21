const sendSMS = (phoneNumber) => {
	return new Promise( (resolve, reject) => {
		const phoneNumberIsCorrect = /^[0-9+()-]+$/.test(phoneNumber);
		setTimeout( () => {
			phoneNumberIsCorrect ? resolve(+phoneNumber) : reject();
		}, 1000 )
	} );
};

const validateSMS = (phoneNumber, smsCode) => {
	//side check
	return new Promise( resolve => {
		setTimeout( () => {
			resolve(); // if code is verified
		}, 1500 );
	} );
};

export { sendSMS, validateSMS };