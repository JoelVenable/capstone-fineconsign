import React, { useState } from 'react';
import {
  Tabs, Tab, Typography, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { networkInterfaces } from 'os';
import { SignUp } from './auth/SignUp';
import { Login } from './auth/Login';


function TabContainer({ value, children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = { children: PropTypes.node.isRequired };


export function SelectLoginRegister(props) {
  function handleChange(e, newPosition) {
    setTabPosition(newPosition);
  }

  const [tabPosition, setTabPosition] = useState(0);

  return (
    <div>
      <Tabs onChange={handleChange} variant="fullWidth" value={tabPosition}>
        <Tab label={<TabContainer>Login</TabContainer>} disableRipple />
        <Tab label={<TabContainer>Register</TabContainer>} disableRipple />
      </Tabs>
      {tabPosition ? <SignUp /> : <Login />}
    </div>
  );
}
