import React, { useState } from 'react';
import { Menu, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SignUp } from './SignUp';
import { Login } from './Login';

export function SelectLoginRegister({
  isOpen, handleClose, login, redirect, showError, showConfirm,
}) {
  const [tabPosition, setTabPosition] = useState('menuItem--0');
  // 0 = login
  // 1 = SignUp

  function handleChange(e) {
    setTabPosition(e.target.id);
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
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
      {(tabPosition === 'menuItem--1') ? (
        <SignUp
          showError={showError}
          showConfirm={showConfirm}
          login={login}
          redirect={redirect}
        />
      ) : (
        <Login login={login} redirect={redirect} />
      )}
    </Modal>
  );
}


SelectLoginRegister.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  showConfirm: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,

};
