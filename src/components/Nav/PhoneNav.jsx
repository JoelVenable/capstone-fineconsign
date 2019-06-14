import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';

export function PhoneMenu({ user }) {
  if (user.userType === 'employee') {
    const emp = user.employee;
    return (
      <Menu.Menu position="right">

        <Dropdown item icon="bars">
          <Dropdown.Menu>
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
            {emp.canEditInventory
              ? (
                <Link to="/artists">
                  <Dropdown.Item
                    key="artists"
                    icon="paint brush"
                    text="Artists"
                    value="artists"
                  />
                </Link>
              ) : null}
            {emp.canEditEmployees
              ? (
                <Link to="/employees">
                  <Dropdown.Item
                    key="employees"
                    icon="id card"
                    text="Employees"
                    value="employees"
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
            {emp.canEditCustomers
              ? (
                <Link to="/customers">
                  <Dropdown.Item
                    key="customers"
                    icon="users"
                    text="Customers"
                    value="customers"
                  />
                </Link>
              ) : null}
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
          <Dropdown item icon="shopping cart" />
        </Menu.Menu>
        <Menu.Menu position="right">
          <Dropdown item icon="bars">
            <Dropdown.Menu>
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
            <Dropdown.Item
              key="paintings"
              icon="file image"
              text="My Paintings"
              value="paintings"
            />
            <Dropdown.Item
              key="favorites"
              icon="paint brush"
              text="Favorite Artists"
              value="favorites"
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
    );
  }
  // else
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
/*


Icons:

"file image"  -- Paintings
"paint brush"   -- Artists
"id card" --     Employees
"box"  --  Orders
"users" -- Customers
"wrench"  -- Users
"dollar sign" -- Price Adjustments
 "sign-out"  -- Sign Out

"edit" -- My account


"shopping cart" -- Shopping Cart


Employee options:

Artists
Paintings
Employees
Orders
Customers
Users
Price Adjustments

Sign Out


Artist Options:

My Paintings
My Profile
My Account

Sign Out

Customer Options:
My Cart
---
My Orders
My Account
Favorite Artists

Sign out


*/
