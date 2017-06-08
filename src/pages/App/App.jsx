import React, { Component } from 'react';
import WarPage from '../WarPage/WarPage';
import NavBar from '../../components/NavBar/NavBar';
import Chat from '../../components/Chat/Chat';
import PostPage from '../PostPage/PostPage';
import Profile from '../../utils/Profile/Profile';
import { Route, Switch } from 'react-router-dom';
import $ from 'jquery';
import './App.css';

class App extends Component {

	componentDidMount() {
		var trigger = $('.hamburger'),
			overlay = $('.overlay'),
			isClosed = false;

		trigger.click(function () {
			hamburger_cross();
		});

		function hamburger_cross() {

			if (isClosed === true) {
				overlay.hide();
				trigger.removeClass('is-open');
				trigger.addClass('is-closed');
				isClosed = false;
			} else {
				overlay.show();
				trigger.removeClass('is-closed');
				trigger.addClass('is-open');
				isClosed = true;
			}
		}

		$('[data-toggle="offcanvas"]').click(function () {
			$('#wrapper').toggleClass('toggled');
		});
	}

	render() {
		return (
			<div id="wrapper">
				<div className="overlay"></div>
				<header className='header-footer'>M E M E &nbsp;&nbsp; W A R S</header>
				<div className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
					<ul className="nav sidebar-nav">
						<li className="sidebar-brand">
							M E M E &nbsp;&nbsp; W A R S
						</li>
						<NavBar auth={this.props.auth} />
						<Chat auth={this.props.auth} />
					</ul>
				</div>
				<div id="page-content-wrapper">
					<button type="button" className="hamburger is-closed" data-toggle="offcanvas">
						<span className="hamb-top"></span>
						<span className="hamb-middle"></span>
						<span className="hamb-bottom"></span>
					</button>
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-lg-offset-2">
								<div className="modal img-modal">
									<div className="modal-dialog modal-lg">
										<div className="modal-content">
											<div className="modal-body">
												<Switch>
													<Route exact path="/" render={(props) => <WarPage auth={this.props.auth} {...this.props} />} />
													<Route exact path="/profile" render={(props) => <Profile auth={this.props.auth} {...this.props} />} />
													<Route exact path="/post" render={(props) => <PostPage {...props} />} />
												</Switch>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;