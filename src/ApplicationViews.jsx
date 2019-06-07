import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { Welcome } from './components/welcome/Welcome';
import { ProtectedRoute } from './components/utility/ProtectedRoute';
import { Users } from './components/Users/Users';
import { Appraisals } from './components/Appraisals/Appraisals';
import { Approvals } from './components/Approvals/Approvals';
import { Gallery } from './components/Gallery/Gallery';
import { Customers } from './components/Customers/Customers';
import { Orders } from './components/Orders/Orders';
import { PriceAdjustments } from './components/PriceAdjustments/PriceAdjustments';
import { Stores } from './components/Stores/Stores';
import { UserConsumer } from './Context/UserContextProvider';


export class ApplicationViews extends PureComponent {
  makeProtectedRoutes = routes => routes.map(route => <ProtectedRoute {...route} />)

  makeClearRoutes = routes => routes.map(route => <Route {...route} />)

  render() {
    return (
      <>
        <UserConsumer>
          {user => (('id' in user) ? <div className="hello" /> : null)}
        </UserConsumer>

        {this.makeClearRoutes(this.routes)}
        {this.makeProtectedRoutes(this.protectedRoutes)}
      </>
    );
  }


  protectedRoutes = [
    {
      path: '/users',
      render: props => <Users {...props} />,
      isAuthorized: true,
      exact: true,
    },
    {
      path: '/appraisals',
      render: props => <Appraisals {...props} />,
      isAuthorized: true,
      exact: true,
    },
    {
      path: '/approvals',
      render: props => <Approvals {...props} />,
      isAuthorized: true,
      exact: true,
    }, {
      path: '/customers',
      render: props => <Customers {...props} />,
      isAuthorized: true,
      exact: true,
    }, {
      path: '/orders',
      render: props => <Orders {...props} />,
      isAuthorized: true,
      exact: true,
    }, {
      path: '/priceAdjustments',
      render: props => <PriceAdjustments {...props} />,
      isAuthorized: true,
      exact: true,
    }, {
      path: '/stores',
      render: props => <Stores {...props} />,
      isAuthorized: true,
      exact: true,
    },
  ]

  routes = [
    {
      path: '/',
      render: props => <Welcome {...props} />,
      exact: true,
    },
    {
      path: '/gallery',
      render: props => <Gallery {...props} />,
      exact: true,
    },
  ]
}
