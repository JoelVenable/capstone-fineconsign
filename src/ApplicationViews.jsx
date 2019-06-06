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

export class ApplicationViews extends PureComponent {
  render() {
    return (
      <>
        <Route
          exact
          path="/"
          render={props => (
            <Welcome {...props} />
          )}
        />
        <Route
          exact
          path="/gallery"
          render={props => (
            <Gallery {...props} />
          )}
        />
        <ProtectedRoute isAuthorized exact path="/users" render={props => <Users {...props} />} />
        <ProtectedRoute isAuthorized exact path="/appraisals" render={props => <Appraisals {...props} />} />
        <ProtectedRoute isAuthorized exact path="/approvals" render={props => <Approvals {...props} />} />
        <ProtectedRoute isAuthorized exact path="/customers" render={props => <Customers {...props} />} />
        <ProtectedRoute isAuthorized exact path="/orders" render={props => <Orders {...props} />} />
        <ProtectedRoute isAuthorized exact path="/priceAdjustments" render={props => <PriceAdjustments {...props} />} />
        <ProtectedRoute isAuthorized exact path="/stores" render={props => <Stores {...props} />} />

      </>
    );
  }
}
