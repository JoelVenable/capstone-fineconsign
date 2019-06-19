/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
//  Eslint warns of prop-types for history and match, however this route file
//  expects to be iterated over from ApplicationViews which provides the routing props.

import React from 'react';
import { Redirect } from 'react-router-dom';
import { Users } from './components/Users/Users';
import { Gallery } from './components/Gallery/Gallery';
import { Orders } from './components/Orders/Orders';
import { PriceAdjustments } from './components/PriceAdjustments/PriceAdjustments';
import { Stores } from './components/Stores/Stores';
import { PaintingDetail } from './components/Paintings/PaintingDetail';
import { PaintingList } from './components/PaintingList/PaintingList';
import { Artists } from './components/Artists/Artists';
import {
  checkEmployeeAccess, checkLoggedIn, checkNotCustomer, canEditArtistPermissions,
} from './modules/checkRoute';
import { Account } from './components/Account/Account';
import { Consumer } from './ContextProvider';
import { ArtistProfile } from './components/Artists/ArtistProfile';
import { EditPainting } from './components/PaintingList/EditPainting';
import { EditArtist } from './components/Artists/EditArtist';
import { Cart } from './components/Cart/Cart';


export const checkProtectedRoutes = user => [
  {
    path: '/users',
    render: props => <Users {...props} />,
    isAuthorized: checkEmployeeAccess(user, 'canEditUsers'),
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
    isAuthorized: checkNotCustomer(user),
    exact: true,
  }, {
    path: '/paintings/:paintingId(\\d+)/edit',
    render: ({ history, match }) => (
      <Consumer>
        {({
          paintings, storageRef, artists, edit, showError,
        }) => {
          // conditions to check:
          // isLoggedIn?  (already checked by 'checkNotCustomer')
          // isArtist?  If so, is it your painting or someone else's?
          // iSEmployee?  If so, do you have edit permissions?

          const id = parseInt(match.params.paintingId, 10);
          let painting = paintings.find(item => item.id === id);
          if (painting) {
            if (user.userType === 'artist') {
              if (user.artist.id !== painting.artistId) {
                painting = null;
                showError('This is not your painting!');
              }
            } else if (!user.employee.canEditInventory) {
              showError('You do not have permission to edit paintings.'
                + 'Please talk to your supervisor.');
              painting = null;
            }

            return painting ? (
              <EditPainting
                painting={painting}
                showError={showError}
                edit={edit}
                id={id}
                user={user}
                storageRef={storageRef}
                history={history}
                artists={artists}
              />
            ) : null;
          } return null;
        }}
      </Consumer>
    ),
    isAuthorized: checkNotCustomer(user),
    exact: true,
  }, {
    path: '/account',
    render: props => <Consumer>{context => <Account {...context} {...props} />}</Consumer>,
    isAuthorized: checkLoggedIn(user),
    exact: true,
  },
  {
    path: '/paintings/:paintingId(\\d+)',
    render: (props) => {
      const id = parseInt(props.match.params.paintingId, 10);
      return <PaintingDetail {...props} id={id} />;
    },
    isAuthorized: true,
    exact: true,
  }, {
    path: '/artists/:artistId(\\d+)/edit',
    render: ({ history, match }) => (
      <Consumer>
        {({
          storageRef, artists, edit, showError,
        }) => {
          // conditions to check:
          // isLoggedIn?  (already checked by 'checkNotCustomer')
          // isArtist?  If so, is it your profile or someone else's?
          // iSEmployee?  If so, do you have edit permissions?

          const id = parseInt(match.params.artistId, 10);
          let artist = artists.find(item => item.id === id);
          if (artist) {
            if (user.userType === 'artist') {
              if (user.artist.id !== artist.id) {
                artist = null;
                showError('This is not your profile!', history.goBack);
              }
            } else if (!user.employee.canEditCustomers) {
              showError('You do not have permission to edit artists.'
                + 'Please talk to your supervisor.', history.goBack);
              artist = null;
            }

            return artist ? (
              <EditArtist
                artist={artist}
                showError={showError}
                edit={edit}
                id={id}
                user={user}
                storageRef={storageRef}
                history={history}
              />
            ) : null;
          } return null;
        }}
      </Consumer>
    ),
    //  Auth:  Either an employee with 'canEditCustomers' permissions or the Artist editing his/her own profile
    isAuthorized: canEditArtistPermissions(user),
    exact: true,
  },
];


export const routes = user => [
  {
    path: '/artists',
    render: props => <Artists {...props} />,
    exact: true,
  },
  {
    path: '/artists/:artistId(\\d+)',
    render: props => <ArtistProfile {...props} id={parseInt(props.match.params.artistId, 10)} />,
    exact: true,
  },
  {
    path: '/gallery',
    render: props => <Gallery {...props} />,
    exact: true,
  },
  {
    path: '/cart',
    render: () => <Consumer>{context => <Cart {...context} />}</Consumer>,
    exact: true,
  },
  {
    path: '/gallery/:paintingId(\\d+)',
    render: (props) => {
      const id = parseInt(props.match.params.paintingId, 10);
      if (user) {
        if (user.userType !== 'customer') return <Redirect to={`/paintings/${id}`} />;
      }
      return <PaintingDetail {...props} id={id} />;
    },
    exact: true,
  },
];
