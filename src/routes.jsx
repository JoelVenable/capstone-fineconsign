import React from 'react';
import { Users } from './components/Users/Users';
import { Gallery } from './components/Gallery/Gallery';
import { Customers } from './components/Customers/Customers';
import { Orders } from './components/Orders/Orders';
import { PriceAdjustments } from './components/PriceAdjustments/PriceAdjustments';
import { Stores } from './components/Stores/Stores';
import { Welcome } from './components/welcome/Welcome';
import { PaintingDetail } from './components/Paintings/PaintingDetail';
import { PaintingList } from './components/PaintingList/PaintingList';
import { Artists } from './components/Artists/Artists';
import { Employees } from './components/Employees/Employees';
import { checkEmployeeAccess, checkLoggedIn } from './modules/checkRoute';


export const checkProtectedRoutes = user => [
  {
    path: '/users',
    render: props => <Users {...props} />,
    isAuthorized: checkEmployeeAccess(user, 'canEditUsers'),
    exact: true,
  }, {
    path: '/artists',
    render: props => <Artists {...props} />,
    isAuthorized: checkEmployeeAccess(user, 'canEditInventory'),
    exact: true,
  }, {
    path: '/employees',
    render: props => <Employees {...props} />,
    isAuthorized: checkEmployeeAccess(user, 'canEditEmployees'),
    exact: true,
  }, {
    path: '/customers',
    render: props => <Customers {...props} />,
    isAuthorized: checkEmployeeAccess(user, 'canEditCustomers'),
    exact: true,
  }, {
    path: '/orders',
    render: props => <Orders {...props} />,
    isAuthorized: checkLoggedIn(user),
    exact: true,
  }, {
    path: '/priceAdjustments',
    render: props => <PriceAdjustments {...props} />,
    isAuthorized: checkEmployeeAccess(user, 'canDefinePriceAdjustments'),
    exact: true,
  }, {
    path: '/stores',
    render: props => <Stores {...props} />,
    isAuthorized: checkEmployeeAccess(user, 'canEditEmployees'),
    exact: true,

  }, {
    path: '/paintings',
    render: props => <PaintingList {...props} />,
    isAuthorized: checkLoggedIn(user),
    exact: true,
  },
];


export const routes = [
  {
    path: '/',
    render: props => <Welcome {...props} />,
    exact: true,
  }, {
    path: '/gallery',
    render: props => <Gallery {...props} />,
    exact: true,
  },
  {
    path: '/gallery/:paintingId(\\d+)',
    /* eslint-disable-next-line */
    render: props => <PaintingDetail {...props} id={parseInt(props.match.params.paintingId, 10)} />,
    exact: true,
  },
];
