import React, { Component } from 'react';
import WarPage from '../WarPage/WarPage';
import NavBar from '../../components/NavBar/NavBar';
import Chat from '../../components/Chat/Chat';
import Profile from '../../utils/Profile/Profile';
import { Route, Switch } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import './App.css';

class App extends Component {

	onDrop = (files) => {
		let file = files[0];
		
		fetch('/memes', {
			method: 'GET',
			filename: file.name,
			filetype: file.type
		})
		.then((res) => {
			res.json();
		})
		.then((res) => console.log(res));
	}

	render(){
		return (
			<div>
				<header className='header-footer'>M E M E &nbsp;&nbsp; W A R S</header>
				<NavBar auth={this.props.auth} />
				<Chat auth={this.props.auth} />
				<Dropzone onDrop={this.onDrop} size={150} />
				<Switch>
					<Route exact path="/" render={(props) => <WarPage auth={this.props.auth} {...this.props} />} />
					<Route exact path="/profile" render={(props) => <Profile auth={this.props.auth} {...this.props} />} />
				</Switch>
			</div>
		);
	}
}

export default App;