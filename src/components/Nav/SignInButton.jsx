import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Context } from '../../ContextProvider';

export function SignInButton() {
  const { showLogin } = useContext(Context);
  return (
    <Menu.Menu position="right">
      <Menu.Item
        icon="sign-in"
        onClick={(e) => {
          e.preventDefault();
          showLogin();
        }}
      />
    </Menu.Menu>
  );
}
