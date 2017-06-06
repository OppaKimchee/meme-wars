import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
	const { isAuthenticated } = props.auth;
	return(
		<div>
			<Link to="/" > War Page </Link><br />
			{
        !isAuthenticated() && (<button onClick={props.auth.login} > Log In </button>)
      }
      {
				isAuthenticated() 
				&& (
					<div>
						<button onClick={props.auth.logout} > Log Out </button>
						<Link to="/profile" > Profile </Link><br />
					</div>
					)
      }
		</div>
	);
};



export default NavBar;