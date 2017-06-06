import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from '../../pages/App/App';
import Callback from '../Callback/Callback';
import Auth from '../Auth/Auth';
import history from '../history/history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
	if (/access_token|id_token|error/.test(nextState.location.hash)) {
		auth.handleAuthentication();
	}
};

export const makeMainRoutes = () => {
	return (
      <BrowserRouter history={history} component={App}>
        <div>
          <App auth={auth} />
          <Route exact path="/callback" render={(props) => {
						handleAuthentication(props);
						return <Callback {...props} />;
						}}/>
        </div>
      </BrowserRouter>
	);
};