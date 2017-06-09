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
		console.log(profile)
		return profile;
	};

	render(){
		return (
			<div className="profile">
				{ this.showLoggedIn().name }<br/>
				{ this.showLoggedIn().email }
				<img className="img-responsive" src={this.showLoggedIn().picture} alt="profile pic"/>
			</div>
		);
	}

};

export default Profile;