import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from './components/utility/ProtectedRoute';
import { UserConsumer } from './Context/UserContextProvider';
import { routes, protectedRoutes } from './routes';


export class ApplicationViews extends PureComponent {
  makeProtectedRoutes = myRoutes => myRoutes.map(route => <ProtectedRoute {...route} key={route.path} />)

  makeClearRoutes = myRoutes => myRoutes.map(route => <Route {...route} key={route.path} />)

  render() {
    return (
      <>
        <UserConsumer>
          {user => (('id' in user) ? <div className="hello" /> : null)}
        </UserConsumer>

        {this.makeClearRoutes(routes)}
        {this.makeProtectedRoutes(protectedRoutes)}
      </>
    );
  }
}
