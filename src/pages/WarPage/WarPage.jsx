import React, { Component } from 'react';
import Memes from '../Memes/Memes';
import './WarPage.css';

class WarPage extends Component {
	constructor() {
		super();
		this.state = {
			war: null
		}
	}

	componentDidMount() {
		this.currentWar();
	}

	warUpdated = (war) => {
		this.setState({war});
	}

	currentWar = () => {
		return fetch('/api/wars/currentwar', {
			method: 'GET',
			headers: new Headers({ 'Content-Type': 'application/json' })
		})
			.then(res => res.json())
			.then(war => this.setState({ war }))
			.catch(err => {
				console.log('error getting current war', err)
			})
	}

	render() {
		return (
			<div className="memesContainer">
				<Memes war={this.state.war} warUpdated={this.warUpdated} auth={this.props.auth} />
			</div>
		);
	}
}

export default WarPage;