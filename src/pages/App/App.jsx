import React, { Component } from 'react';
import WarPage from '../WarPage/WarPage';
import NavBar from '../../components/NavBar/NavBar';
import Chat from '../../components/Chat/Chat';
import PostPage from '../PostPage/PostPage';
import Profile from '../../utils/Profile/Profile';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {

	render() {
		return (
			<div>
				<header className='header-footer'>M E M E &nbsp;&nbsp; W A R S</header>
				<NavBar auth={this.props.auth} />
				<Chat auth={this.props.auth} />
				<Switch>
					<Route exact path="/" render={(props) => <WarPage auth={this.props.auth} {...this.props} />} />
					<Route exact path="/profile" render={(props) => <Profile auth={this.props.auth} {...this.props} />} />
					<Route exact path="/post" render={(props) => <PostPage {...props} />} />
				</Switch>
			</div>
		);
	}
}

export default App;