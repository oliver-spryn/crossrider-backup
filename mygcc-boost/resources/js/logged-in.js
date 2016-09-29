	var loggedIn = true;

//If the username or password input fields exist, then the user is not logged in
	if (!$('div#userWelcome').length) {
		loggedIn = false;
	}