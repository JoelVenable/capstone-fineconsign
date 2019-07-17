import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Context } from '../../ContextProvider';

export function SignoutDropdownItem() {
  const { logout } = useContext(Context);

  return (
    <Dropdown.Item
      key="signout"
      icon="sign-out"
      text="Sign Out"
      value="signout"
      onClick={logout}
    />
  );
}
