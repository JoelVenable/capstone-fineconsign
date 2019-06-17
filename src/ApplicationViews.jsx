import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { Container, Sticky } from 'semantic-ui-react';
import { ProtectedRoute } from './components/utility/ProtectedRoute';
import { routes, checkProtectedRoutes } from './routes';
import { Navbar } from './components/Navbar';
import { Consumer } from './ContextProvider';
import { Welcome } from './components/welcome/Welcome';


export class ApplicationViews extends PureComponent {
  makeProtectedRoutes = myRoutes => myRoutes.map(route => <ProtectedRoute {...route} key={route.path} />)

  makeClearRoutes = myRoutes => myRoutes.map(route => <Route {...route} key={route.path} />)

  render() {
    return (
      <>
        <Route path="/:subpath" render={props => <Sticky><Navbar {...props} /></Sticky>} />

        <Route exact path="/" render={props => <Welcome {...props} />} />
        <Container style={{ marginTop: '1rem' }}>
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
