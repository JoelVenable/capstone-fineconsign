import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Context } from '../../ContextProvider';

export function SignoutMenuItem() {
  const { logout } = useContext(Context);
  return (
    <Menu.Item
      key="signout"
      icon="sign-out"
      text="Sign Out"
      value="signout"
      onClick={logout}
    />
  );
}
