import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';
import { CartMenuItem } from './CartItem';

/*

routes needed in navbar:

Employee view:
/users
/artists
/orders
/priceAdjustments
/paintings
/account
/gallery

*/


export function PhoneMenu({ user }) {
  if (user.userType === 'employee') {
    const emp = user.employee;
    return (
      <Menu.Menu position="right">

        <Dropdown item icon="bars">
          <Dropdown.Menu>
            {emp.canEditEmployees
              ? (
                <Link to="/users">
                  <Dropdown.Item
                    key="users"
                    icon="wrench"
                    text="Users"
                    value="users"
                  />
                </Link>
              ) : null}
            {emp.canEditInventory
              ? (
                <Link to="/paintings">
                  <Dropdown.Item
                    key="paintings"
                    icon="file image"
                    text="Paintings"
                    value="paintings"
                  />
                </Link>
              ) : null}

            {emp.canProcessOrders
              ? (
                <Link to="/orders">
                  <Dropdown.Item
                    key="orders"
                    icon="box"
                    text="Orders"
                    value="orders"
                  />
                </Link>
              ) : null}


            {emp.canDefinePriceAdjustments
              ? (
                <Link to="/priceAdjustments">
                  <Dropdown.Item
                    key="priceAdjustments"
                    icon="dollar sign"
                    text="Price Adjustments"
                    value="priceAdjustments"
                  />
                </Link>
              ) : null}
            <Dropdown.Divider />
            <SignOutButton />
          </Dropdown.Menu>


        </Dropdown>
      </Menu.Menu>
    );
  }
  if (user.userType === 'customer') {
    return (
      <>
        <Menu.Menu position="right">
          <CartMenuItem />
          <Dropdown item icon="bars">
            <Dropdown.Menu>
              <Dropdown.Item
                key="favorites"
                icon="paint brush"
                text="Favorite Artists"
                value="favorites"
              />
              <Dropdown.Item
                key="orders"
                icon="box"
                text="My Orders"
                value="orders"
              />

              <Dropdown.Item
                key="account"
                icon="edit"
                text="My Account"
                value="account"
              />
              <Dropdown.Divider />
              <SignOutButton />

            </Dropdown.Menu>
          </Dropdown>

        </Menu.Menu>
      </>
    );
  }

  if (user.userType === 'artist') {
    return (
      <Menu.Menu position="right">
        <Dropdown item icon="bars">
          <Dropdown.Menu>
            <Link to="/paintings">
              <Dropdown.Item
                key="paintings"
                icon="file image"
                text="My Paintings"
                value="paintings"
              />
            </Link>
            <Link to={`/artists/${user.artist.id}`}>
              <Dropdown.Item
                key="profile"
                icon="address card"
                text="My Profile"
                value="paintings"
              />
            </Link>
            <Link to="/account">

              <Dropdown.Item
                key="account"
                icon="edit"
                text="My Account"
                value="account"
              />
            </Link>
            <Dropdown.Divider />
            <SignOutButton />
          </Dropdown.Menu>
        </Dropdown>

      </Menu.Menu>
    );
  }
  // show the "not logged in" menu - TODO: login button
  return (
    <>
      <Menu.Menu position="right">
        <Dropdown item icon="shopping cart" />
      </Menu.Menu>
    </>
  );
}

function SignOutButton() {
  return (
    <Consumer>
      {({ logout }) => (
        <Dropdown.Item
          key="signout"
          icon="sign-out"
          text="Sign Out"
          value="signout"
          onClick={logout}
        />
      )
      }
    </Consumer>
  );
}


PhoneMenu.propTypes = {
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }),
};


PhoneMenu.defaultProps = {
  user: null,
};
