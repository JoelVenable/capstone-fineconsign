import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';
import { CartMenuItem } from './CartItem';
import { SignInButton } from './SignInButton';

/*

routes needed in navbar:

Employee view:
/users
/artists
/orders
/paintings
/account
/gallery

*/


export function PhoneMenu({ user, history }) {
  function handleClick(_e, { value }) {
    // setactiveLink(value);
    history.push(value);
  }
  if (user) {
    if (user.userType === 'employee') {
      const emp = user.employee;
      return (
        <Menu.Menu position="right">

          <Dropdown item icon="bars">
            <Dropdown.Menu>
              {emp.canEditEmployees
                ? (
                  <Dropdown.Item
                    key="users"
                    onClick={handleClick}
                    icon="wrench"
                    text="Users"
                    value="/users"
                  />
                ) : null}
              {emp.canEditInventory
                ? (
                  <Dropdown.Item
                    key="paintings"
                    onClick={handleClick}
                    icon="file image"
                    text="Paintings"
                    value="/paintings"
                  />
                ) : null}

              {emp.canProcessOrders
                ? (
                  <Dropdown.Item
                    key="orders"
                    onClick={handleClick}

                    icon="box"
                    text="Orders"
                    value="/orders"
                  />
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
            <CartMenuItem handleClick={handleClick} />
            <Dropdown item icon="bars">
              <Dropdown.Menu>
                <Dropdown.Item
                  key="favorites"
                  onClick={handleClick}

                  icon="paint brush"
                  text="Artists"
                  value="/artists"
                />
                <Dropdown.Item
                  key="orders"
                  onClick={handleClick}
                  icon="box"
                  text="My Orders"
                  value="/orders"
                />

                <Dropdown.Item
                  key="account"
                  onClick={handleClick}
                  icon="edit"
                  text="My Account"
                  value="/account"
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
                onClick={handleClick}
                icon="file image"
                text="My Paintings"
                value="/paintings"
              />
              <Dropdown.Item
                key="profile"
                onClick={handleClick}

                icon="address card"
                text="My Profile"
                value="/paintings"
              />

              <Dropdown.Item
                key="account"
                icon="edit"
                onClick={handleClick}
                text="My Account"
                value="/account"
              />
              <Dropdown.Divider />
              <SignOutButton />
            </Dropdown.Menu>
          </Dropdown>

        </Menu.Menu>
      );
    }
  }
  // else show login button
  return <SignInButton />;
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


PhoneMenu.defaultProps = {
  user: null,
};
