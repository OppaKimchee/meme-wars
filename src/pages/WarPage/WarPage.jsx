import React, { Component } from 'react';

class WarPage extends Component {
	constructor() {
		super();
		this.state = {
			war: null
		}
	}

	currentWar = () => {
		return fetch('/api/wars/currentwar', {
			method: 'GET',
			headers: new Headers({ 'Content-Type': 'application/json' })
		})
			.then(res => res.json())
			.then(war => console.log(war))
			.catch(err => {
				console.log('error getting current war', err)
			})
	}

	render() {
		this.currentWar()
		return (
			<div className="container">

			</div>
		);
	}
}

export default WarPage;