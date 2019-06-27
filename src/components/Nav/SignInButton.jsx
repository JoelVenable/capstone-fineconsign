import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';


export function SignInButton() {
  return (
    <Consumer>
      {({ showLogin }) => (
        <Menu.Menu position="right">
          <Menu.Item
            icon="sign-in"
            onClick={(e) => {
              e.preventDefault();
              showLogin();
            }}
          />
        </Menu.Menu>
      )}
    </Consumer>
  );
}
