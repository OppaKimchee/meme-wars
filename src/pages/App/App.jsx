import React, { Component } from 'react';
import WarPage from '../WarPage/WarPage';
import NavBar from '../../components/NavBar/NavBar';
import Chat from '../../components/Chat/Chat';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			pics: null
		};
	}

	render(){
		return (
			<div>
				<header className='header-footer'>M E M E &nbsp;&nbsp; W A R S</header>
				<NavBar auth={this.props.auth} />
				<Chat />
				<Route exact path="/" render={(props) => <WarPage auth={props.auth} {...props} />} />
			</div>
		);
	}
}

export default App;