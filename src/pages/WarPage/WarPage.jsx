import React, { Component } from 'react';

class WarPage extends Component {

	findPosts = () => {
		return fetch('/api/posts', {
			method: 'GET',
			headers: new Headers({ 'Content-Type': 'application/json' })
		})
			.then(res => res.json())
			.then(posts => posts);
	};

	createWar = (meme1, meme2) => {
		return fetch('/api/wars/war', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(meme1, meme2)
		})
			.then(res => {
				return res.json();
			})
			.then(war => war);
	};

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

	/* 
War.find({}).distinct('meme1').distinct('meme2')
.select('meme1 meme2')
.exec().then(wars => {
	Post({}).where('_id').nin()
}) */

	render() {
		this.currentWar()
		return (
			<div className="container">

			</div>
		);
	}
}

export default WarPage;