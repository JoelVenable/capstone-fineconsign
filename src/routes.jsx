import React from 'react';
import { Users } from './components/Users/Users';
import { Appraisals } from './components/Appraisals/Appraisals';
import { Approvals } from './components/Approvals/Approvals';
import { Gallery } from './components/Gallery/Gallery';
import { Customers } from './components/Customers/Customers';
import { Orders } from './components/Orders/Orders';
import { PriceAdjustments } from './components/PriceAdjustments/PriceAdjustments';
import { Stores } from './components/Stores/Stores';
import { Welcome } from './components/welcome/Welcome';
import { PaintingDetail } from './components/Paintings/PaintingDetail';


export const protectedRoutes = [
  {
    path: '/users',
    render: props => <Users {...props} />,
    isAuthorized: true,
    exact: true,
  }, {
    path: '/appraisals',
    render: props => <Appraisals {...props} />,
    isAuthorized: true,
    exact: true,
  }, {
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
];

export const routes = [
  {
    path: '/',
    render: props => <Welcome {...props} />,
    exact: true,
  }, {
    path: '/paintings',
    render: props => <Gallery {...props} />,
    exact: true,
  },
  {
    path: '/paintings/:paintingId(\\d+)',
    render: props => <PaintingDetail {...props} id={parseInt(props.match.params.paintingId)} />,
    exact: true,
  },
];
