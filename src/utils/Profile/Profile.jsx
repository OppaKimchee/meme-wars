import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
	// Verify that there's a token in localStorage
	token = localStorage.getItem('accessToken');

	if (token) {
		this.showLoggedIn();
	}

	// Display the user's profile
	showLoggedIn() {
		var profile = JSON.parse(localStorage.getItem('profile'));
		return profile;
	};

	render(){
		return (
			<div>
				{ this.showLoggedIn().name }
				{ this.showLoggedIn().email }
				<img src={this.showLoggedIn().picture} alt="profile pic"/>
			</div>
		);
	}

};

export default Profile;