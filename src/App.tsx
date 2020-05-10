import React from 'react';
import { inject, observer } from "mobx-react";

import { Router, Route, Switch, RouteProps } from 'react-router-dom';

import * as screens from "screens";
import routes from 'routes';
import history from "global/history";

import { Alert } from "antd";

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
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        component={route.route}
      />
    ));
  }

  render() {
    const {
      isAlertVisible,
      textAlert,
      typeAlert,
      authorized,
      setAuthorized,
      hideAlert
    } = this.props.authState;
    return (
      <>
        <Router history={history}>
          <div className={'appContainer'}>
            {isAlertVisible && (
              <Alert
                className={"alertContainer"}
                message={textAlert}
                type={typeAlert}
                closable
                onClose={() => {
                  setTimeout(() => {
                    hideAlert();
                  }, 1000);
                }}
              />
            )}

            <Switch>
              {this.getRoutes()}
              <Route path="*" component={screens.PageNotFound} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
