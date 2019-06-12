import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { ProtectedRoute } from './components/utility/ProtectedRoute';
import { routes, checkProtectedRoutes } from './routes';
import { Navbar } from './components/Navbar';
import { Consumer } from './ContextProvider';

export class ApplicationViews extends PureComponent {
  makeProtectedRoutes = myRoutes => myRoutes.map(route => <ProtectedRoute {...route} key={route.path} />)

  makeClearRoutes = myRoutes => myRoutes.map(route => <Route {...route} key={route.path} />)

  render() {
    return (
      <>
        <Route path="/:subpath" component={Navbar} />
        <Container style={{ overflowY: 'auto' }}>
          <Consumer>
            {({ user }) => (
              <>
                {this.makeClearRoutes(routes)}
                {this.makeProtectedRoutes(checkProtectedRoutes(user))}
              </>
            )}
          </Consumer>
        </Container>
      </>
    );
  }
}
