import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';

export function ComputerMenu({ user, history }) {
  // const [activeLink, setactiveLink] = useState(null);
  function handleClick(_e, { value }) {
    // setactiveLink(value);
    history.push(value);
  }
  if (user) {
    const { employee } = user;
    switch (user.userType) {
      case 'employee':
        return (
          <Menu.Menu position="right" size="mini">
            {employee.canEditUsers
              ? (
                <Menu.Item
                  key="users"
                  onClick={handleClick}
                  icon="wrench"
                  text="Users"
                  value="/users"
                />
              ) : null}
            {employee.canEditInventory
              ? (
                <Menu.Item
                  key="paintings"
                  icon="file image"
                  onClick={handleClick}
                  name="Paintings"
                  value="/paintings"
                />
              ) : null}
            {employee.canProcessOrders
              ? (
                <Menu.Item
                  key="orders"
                  onClick={handleClick}
                  icon="box"
                  name="Orders"
                  value="/orders"
                />
              ) : null}


            {employee.canDefinePriceAdjustments
              ? (
                <Menu.Item
                  key="priceAdjustments"
                  onClick={handleClick}
                  icon="dollar sign"
                  name="Price Adjustments"
                  value="/priceAdjustments"
                />
              ) : null}
            <SignOutButton />


          </Menu.Menu>
        );
      case 'customer':
        return (

          <Menu.Menu position="right">
            <Menu.Item
              key="favorites"
              onClick={handleClick}
              icon="paint brush"
              name="Favorite Artists"
              value="/artists"
            />
            <Menu.Item
              key="account"
              onClick={handleClick}
              icon="edit"
              name="My Account"
              value="/account"
            />
            <Menu.Item
              key="cart"
              onClick={handleClick}
              icon="shopping cart"
              name="My Cart"
              value="/cart"
            />

            <SignOutButton />
          </Menu.Menu>
        );
      default: // 'artist' case
        return (
          <Menu.Menu position="right">
            <Menu.Item
              key="paintings"
              onClick={handleClick}
              icon="file image"
              name="My Paintings"
              value="/paintings"
            />
            <Menu.Item
              key="account"
              onClick={handleClick}
              icon="edit"
              name="My Account"
              value="/account"
            />
            <SignOutButton />

          </Menu.Menu>
        );
    }
  }

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


ComputerMenu.propTypes = {
  user: PropTypes.shape({
    userType: PropTypes.oneOf(['employee', 'artist', 'customer']).isRequired,
    employee: PropTypes.shape({
      canEditIventory: PropTypes.bool,
      canDefinePriceAdjustments: PropTypes.bool,
      canProcessOrders: PropTypes.bool,
      canEditCustomers: PropTypes.bool,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


ComputerMenu.defaultProps = {
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
