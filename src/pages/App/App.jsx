import React, { Component } from 'react';
import WarPage from '../WarPage/WarPage';
import NavBar from '../../components/NavBar/NavBar';
import Chat from '../../components/Chat/Chat';
import Profile from '../../utils/Profile/Profile';
import { Route, Switch } from 'react-router-dom';
import ReactS3Uploader from 'react-s3-uploader';
import './App.css';

class App extends Component {

	onUploadFinish = () => {
		console.log("finished uploading!");
	}

	render(){
		return (
			<div>
				<header className='header-footer'>M E M E &nbsp;&nbsp; W A R S</header>
				<NavBar auth={this.props.auth} />
				<Chat auth={this.props.auth} />
				<ReactS3Uploader 
					signingUrl="/api/posts"
					signingUrlMethod="GET"
					accept="image/*"
					signingUrlHeaders={{"Access-Control-Allow-Origin": '*'}}
					uploadRequestHeaders={{"Access-Control-Allow-Origin": '*'}}
					server="http://localhost:3001"
					onFinish={this.onUploadFinish}
				/>
				<Switch>
					<Route exact path="/" render={(props) => <WarPage auth={this.props.auth} {...this.props} />} />
					<Route exact path="/profile" render={(props) => <Profile auth={this.props.auth} {...this.props} />} />
				</Switch>
			</div>
		);
	}
}

export default App;