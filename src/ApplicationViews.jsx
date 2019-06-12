import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/utility/ProtectedRoute';
import { Consumer } from './ContextProvider';
import { routes, protectedRoutes } from './routes';
import { Navbar } from './components/Navbar';


export class ApplicationViews extends PureComponent {
  makeProtectedRoutes = myRoutes => myRoutes.map(route => <ProtectedRoute {...route} key={route.path} />)

  makeClearRoutes = myRoutes => myRoutes.map(route => <Route {...route} key={route.path} />)

  render() {
    return (
      <>
        <Route path="/:subpath" component={Navbar} />

        {this.makeClearRoutes(routes)}
        {this.makeProtectedRoutes(protectedRoutes)}
      </>
    );
  }
}
