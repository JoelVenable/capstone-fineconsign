import React, { useState } from 'react';
import {
  Tabs, Tab, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { SignUp } from './auth/SignUp';
import { Login } from './auth/Login';
import { style } from './style';

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = { children: PropTypes.node.isRequired };


export function SelectLoginRegister() {
  function handleChange(e, newPosition) {
    setTabPosition(newPosition);
  }

  const [tabPosition, setTabPosition] = useState(0);

  return (
    <div style={style.loginDiv}>
      <Tabs onChange={handleChange} variant="fullWidth" value={tabPosition} style={{ marginBottom: '1rem' }}>
        <Tab label={<TabContainer>Login</TabContainer>} disableRipple />
        <Tab label={<TabContainer>Register</TabContainer>} disableRipple />
      </Tabs>
      {tabPosition ? <SignUp /> : <Login />}
    </div>
  );
}
