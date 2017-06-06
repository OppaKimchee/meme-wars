import Auth0Lock from 'auth0-lock';
import history from '../history/history';

export default class Auth {

	lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN, {
		oidcConformant: true,
		autoclose: true,
		auth: {
			redirectUrl: process.env.REACT_APP_AUTH0_CALLBACK_URL,
			responseType: 'token id_token',
			audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
			params: {
				scope: 'openid profile email'
			}
		},
		additionalSignUpFields: [
		{
			name: "first_name",
			placeholder: "Enter your first name"
		},
		{
			name: "last_name",
			placeholder: "Enter your last name"
		}
		]
	});

	userProfile;

	constructor() {
		this.handleAuthentication();
		// binds functions to keep this context
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
	}

	login() {
		// Call the show method to display the widget.
		this.lock.show();
	}

	handleAuthentication() {
		// Add callback Lock's `authenticated` event
		this.lock.on('authenticated', this.setSession.bind(this));
		// Add callback for Lock's `authorization_error` event
		this.lock.on('authorization_error', (err) => {
			console.log(err);
			alert(`Error: ${err.error}. Check the console for further details.`);
			history.replace('/');
		});
	}

	setSession(authResult) {
		if (authResult && authResult.accessToken && authResult.idToken) {
			// Set the time that the access token will expire at
			let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
			// Use the token in authResult to getUserInfo() and save it to localStorage
			this.lock.getUserInfo(authResult.accessToken, function (error, profile) {
				if (error) {
					return console.log(error);
				}
				localStorage.setItem('profile', JSON.stringify(profile));
			});
			localStorage.setItem('access_token', authResult.accessToken);
			localStorage.setItem('id_token', authResult.idToken);
			localStorage.setItem('expires_at', expiresAt);
			// navigate to the home route
			history.replace('/');
		}
	}

	logout() {
		// Clear access token and ID token from local storage
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');
		// navigate to the home route
		history.replace('/');
	}

	isAuthenticated() {
		// Check whether the current time is past the 
		// access token's expiry time
		let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		return new Date().getTime() < expiresAt;
	}
}