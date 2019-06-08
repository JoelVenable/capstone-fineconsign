import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from './components/utility/ProtectedRoute';
import { Consumer } from './Context/ContextProvider';
import { routes, protectedRoutes } from './routes';


export class ApplicationViews extends PureComponent {
  makeProtectedRoutes = myRoutes => myRoutes.map(route => <ProtectedRoute {...route} key={route.path} />)

  makeClearRoutes = myRoutes => myRoutes.map(route => <Route {...route} key={route.path} />)

  render() {
    return (
      <>
        <Consumer>
          {user => (('id' in user) ? <div className="hello" /> : null)}
        </Consumer>

        {this.makeClearRoutes(routes)}
        {this.makeProtectedRoutes(protectedRoutes)}
      </>
    );
  }
}
