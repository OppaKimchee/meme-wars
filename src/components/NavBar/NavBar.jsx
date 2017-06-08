import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
	const { isAuthenticated } = props.auth;
	return (
		<ul className="nav sidebar-nav">
			<li className="sidebar-brand">
				M E M E &nbsp;&nbsp; W A R S
			</li>
			<li className="li1">
				<Link to="/" > War Page </Link>
			</li>
			{
				!isAuthenticated() && (<li className="li2"><button className="btn btn-link" onClick={props.auth.login} style={{'color':'white'}}><i className="glyphicon glyphicon-log-in"> Log In</i></button></li>)
			}
			{
				isAuthenticated()
				&& (
					<div>
						<li className="li3">
							<Link to="/post" > Post a Meme </Link>
						</li>
						<li className="li4">
							<Link to="/profile" > Profile </Link>
						</li>
						<li className="li5">
							<button className="btn btn-link" onClick={props.auth.logout} style={{'color':'white'}}><i className="glyphicon glyphicon-log-out"> Log&nbsp;Out</i></button>
						</li>
					</div>
				)
			}
		</ul>
	);
};



export default NavBar;