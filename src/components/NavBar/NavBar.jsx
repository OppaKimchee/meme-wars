import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
	const { isAuthenticated } = props.auth;
	return (
		<div>
			<li>
				<Link to="/" > War Page </Link><br />
			</li>
			{
				!isAuthenticated() && (<li><button className="btn btn-default" onClick={props.auth.login} ><i className="glyphicon glyphicon-log-in"></i></button></li>)
			}
			{
				isAuthenticated()
				&& (
					<div>
						<li>
							<Link to="/post" > Post a Meme </Link><br />
						</li>
						<li>
							<Link to="/profile" > Profile </Link><br />
						</li>
						<li>
							<button className="btn btn-default" onClick={props.auth.logout} ><i className="glyphicon glyphicon-log-out"></i></button>
						</li>
					</div>
				)
			}
		</div>
	);
};



export default NavBar;