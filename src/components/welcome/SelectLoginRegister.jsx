import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { SignUp } from './auth/SignUp';
import { Login } from './auth/Login';

export function SelectLoginRegister() {
  const [tabPosition, setTabPosition] = useState('menuItem--0');
  // 0 = login
  // 1 = SignUp

  function handleChange(e) {
    setTabPosition(e.target.id);
  }

  return (
    <div className="loginRegisterBox">
      <Menu className="loginRegisterMenu">
        <Menu.Item
          className="loginRegisterMenu-item"
          name="Login"
          active={tabPosition === 'menuItem--0'}
          onClick={handleChange}
          id="menuItem--0"
        >
          LOGIN
        </Menu.Item>
        <Menu.Item
          className="loginRegisterMenu-item"
          name="Register"
          active={tabPosition === 'menuItem--1'}
          onClick={handleChange}
          id="menuItem--1"
        >
          REGISTER
        </Menu.Item>
      </Menu>
      {(tabPosition === 'menuItem--1') ? <SignUp /> : <Login />}
    </div>
  );
}
