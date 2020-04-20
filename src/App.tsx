import React from 'react';
import { Provider, inject, observer } from "mobx-react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteProps,
} from 'react-router-dom';

import stores from "stores";
import * as screens from "screens";
import routes from 'routes';

import './App.css';

interface AppProps {
  authState?: any;
}

@inject('authState')
@observer
class App extends React.PureComponent<AppProps> {
  getRoutes() {
    const { authorized } = this.props.authState;

    const actualRoutes = authorized ? routes.mainRoutes : routes.authRoutes;

    return actualRoutes.map(route => (
      <Route path={route.path} exact={route.exact} component={route.route} />
    ));
  }

  render() {
    const { authorized, setAuthorized } = this.props.authState;
    return (
      <>
        <a href="/test">test</a>
        <div onClick={setAuthorized}>authorize</div>
        <Router>
          <div className={'appContainer'}>
            <Switch>
              {this.getRoutes()}
              <Route component={screens.PageNotFound} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
